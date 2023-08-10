# Copyright 2023 Issam Khalladi
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask
from flask import render_template
from flask import g
from .database import Database
import random
from flask import request
from flask import abort
from flask import redirect


app = Flask(__name__, static_url_path="", static_folder="static")


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()


@app.route('/')
def index():
    db = get_db()
    animals = db.get_animaux()
    random_animals = random.sample(animals, 5)
    return render_template(
        'index.html',
        title='Accueil',
        animals=random_animals)


@app.route('/adoption')
def adoption():
    return render_template('adoption.html', title='Adoption')


@app.route('/apropos')
def apropos():
    return render_template('apropos.html', title='À Propos')


@app.route('/recherche')
def recherche():
    db = get_db()
    animals = db.get_animaux()
    search_query = request.args.get('query')
    filter_animals_search = []
    for animal in animals:
        if (search_query.isdigit() and int(search_query) == animal['age']):
            filter_animals_search.append(animal)
        elif (
            search_query.lower() in animal['nom'].lower() or
            search_query.lower() in animal['espece'].lower() or
            search_query.lower() in animal['race'].lower() or
            search_query.lower() in animal['description'].lower() or
            search_query.lower() in animal['courriel'].lower() or
            search_query.lower() in animal['adresse'].lower() or
            search_query.lower() in animal['ville'].lower() or
            search_query.lower() in animal['cp'].lower()
        ):
            filter_animals_search.append(animal)
    if not filter_animals_search:
        abort(404)
    return render_template(
        'recherche.html',
        title=search_query,
        animals=filter_animals_search)


@app.route('/page-animal/<animal_espece>/<animal_id>')
def page_animal(animal_id, animal_espece):
    db = get_db()
    animal_id = db.get_animal(animal_id)
    animal_espece = db.get_animal(animal_espece)
    return render_template(
        'page-animal.html',
        title="Page d'Animal",
        animal=animal_id)


@app.route('/soumission', methods=['POST'])
def soumission():
    db = get_db()
    nom = request.form['nom']
    espece = request.form['espece']
    race = request.form['race']
    age = request.form['age']
    description = request.form['description']
    courriel = request.form['courriel']
    adresse = request.form['adresse']
    ville = request.form['ville']
    cp = request.form['cp']
    form_invalid = False

    if not nom.strip() or "," in nom or len(nom) < 3 or len(nom) > 20:
        form_invalid = True
    if not espece.strip() or "," in espece:
        form_invalid = True
    if not race.strip() or "," in race:
        form_invalid = True
    if not age.strip() or not age.isdigit() or "," in age or int(
            age) < 0 or int(age) > 30:
        form_invalid = True
    if not description.strip() or "," in description:
        form_invalid = True
    if not courriel.strip() or "," in courriel:
        form_invalid = True
    if not adresse.strip() or "," in adresse:
        form_invalid = True
    if not ville.strip() or "," in ville:
        form_invalid = True
    if not cp.strip() or "," in cp:
        form_invalid = True

    if form_invalid:
        abort(400)
    else:
        db.add_animal(
            nom,
            espece,
            race,
            age,
            description,
            courriel,
            adresse,
            ville,
            cp)

    return redirect('/confirmation')


@app.route('/confirmation')
def confirmation():
    return render_template('confirmation.html', title='Confirmée')


@app.errorhandler(400)
def bad_request(e):
    return render_template('400.html', title='Mauvaise Requête'), 400


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html', title='Page Introuvable'), 404
