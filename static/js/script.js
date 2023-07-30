const form = document.getElementById('formulaire')
const nom = document.getElementById('nom')
const espece = document.getElementById('espece')
const race = document.getElementById('race')
const age = document.getElementById('age')
const description = document.getElementById('description')
const courriel = document.getElementById('courriel')
const adresse = document.getElementById('adresse')
const ville = document.getElementById('ville')
const cp = document.getElementById('cp')
let nomValide = false;
let especeValide = false;
let raceValide = false;
let ageValide = false;
let descriptionValide = false;
let courrielValide = false;
let adresseValide = false;
let villeValide = false;
let cpValide = false;
const courrielPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const cpPattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
const alphabetiquePattern = /^[\p{L}]+( [\p{L}]+)*$/u;

// Soumet le formulaire
form.addEventListener('submit', e => {
    e.preventDefault();
    estFormulaireVide();
    if (estFormulaireValide()) {
        afficherResultat();
    }
});

function contientVirgule(input) {
    return input.includes(',')
}

function estFormulaireVide() {
    if (nom.value.trim() === '') {
        afficherErreur(nom);
    }
    if (espece.value.trim() === '') {
        afficherErreur(espece);
    }
    if (race.value.trim() === '') {
        afficherErreur(race);
    }
    if (age.value.trim() === '') {
        afficherErreur(age);
    }
    if (description.value.trim() === '') {
        afficherErreur(description);
    }
    if (courriel.value.trim() === '') {
        afficherErreur(courriel);
    }
    if (adresse.value.trim() === '') {
        afficherErreur(adresse);
    }
    if (ville.value.trim() === '') {
        afficherErreur(ville);
    }
    if (cp.value.trim() === '') {
        afficherErreur(cp);
    }
}

function estFormulaireValide() {
    return nomValide && especeValide && raceValide && ageValide && descriptionValide &&
            courrielValide && adresseValide && villeValide && cpValide;
}

function afficherResultat() {
    form.style.display = "none";
    form.submit();
}

// Validation du nom
nom.addEventListener('input', () => {
    const nomSaisi = nom.value.trim();
    if (nomSaisi === "") {
        retirerStyleValidation(nom);
    } else if (!alphabetiquePattern.test(nomSaisi)  || contientVirgule(nomSaisi) || nomSaisi.length < 3 || nomSaisi.length > 20) {
        afficherErreur(nom)
        nomValide = false;
        nom.focus();
    } else {
        afficherSucces(nom)
        nomValide = true;
    }
});

// Validation de l'espèce
espece.addEventListener('input', () => {
    const especeSaisi = espece.value.trim();
    if (especeSaisi === "") {
        retirerStyleValidation(espece);
    } else if (!alphabetiquePattern.test(especeSaisi)  || contientVirgule(especeSaisi)) {
        afficherErreur(espece)
        nomValide = false;
        espece.focus();
    } else {
        afficherSucces(espece)
        especeValide = true;
    }
});

// Validation de la race
race.addEventListener('input', () => {
    const raceSaisi = race.value.trim();
    if (raceSaisi === "") {
        retirerStyleValidation(race);
    } else if (!alphabetiquePattern.test(raceSaisi) || contientVirgule(raceSaisi)) {
        afficherErreur(race)
        raceValide = false;
        race.focus();
    } else {
        afficherSucces(race)
        raceValide = true;
    }
});

// Validation de l'âge
age.addEventListener('input', () => {
    const ageSaisi = age.value.trim();
    if (ageSaisi === "") {
        retirerStyleValidation(age);
    } else if (isNaN(ageSaisi) || contientVirgule(ageSaisi) || ageSaisi < 0 || ageSaisi > 30) {
        afficherErreur(age)
        Valide = false;
        age.focus();
    } else {
        afficherSucces(age)
        ageValide = true;
    }
});

// Validation de la description
description.addEventListener('input', () => {
    const descriptionSaisi = description.value.trim();
    if (descriptionSaisi === "") {
        retirerStyleValidation(description);
    } else if (contientVirgule(descriptionSaisi)) {
        afficherErreur(description)
        descriptionValide = false;
        description.focus();
    } else {
        afficherSucces(description)
        descriptionValide = true;
    }
});

// Validation de l'adresse courriel
courriel.addEventListener('input', () => {
    const courrielSaisi = courriel.value.trim();
    if (courrielSaisi === "") {
        retirerStyleValidation(courriel);
    } else if (!courrielPattern.test(courrielSaisi)) {
        afficherErreur(courriel)
        courrielValide = false;
        courriel.focus();
    } else {
        afficherSucces(courriel)
        courrielValide = true;
    }
});

// Validation de l'adresse civique
adresse.addEventListener('input', () => {
    const adresseSaisi = adresse.value.trim();
    if (adresseSaisi === "") {
        retirerStyleValidation(adresse);
    } else if (contientVirgule(adresseSaisi)) {
        afficherErreur(adresse)
        adresseValide = false;
        adresse.focus();
    } else {
        afficherSucces(adresse)
        adresseValide = true;
    }
});

// Validation de la ville
ville.addEventListener('input', () => {
    const villeSaisi = ville.value.trim();
    if (villeSaisi === "") {
        retirerStyleValidation(ville);
    } else if (!alphabetiquePattern.test(villeSaisi) || contientVirgule(villeSaisi)) {
        afficherErreur(ville)
        villeValide = false;
        ville.focus();
    } else {
        afficherSucces(ville)
        villeValide = true;
    }
});

// Validation du code postal
cp.addEventListener('input', () => {
    const cpSaisi = cp.value.trim();
    if (cpSaisi === "") {
        retirerStyleValidation(cp);
    } else if (!cpPattern.test(cpSaisi)) {
        afficherErreur(cp)
        cpValide = false;
        cp.focus();
    } else {
        afficherSucces(cp)
        cpValide = true;
    }
});



// Affiche les styles d'erreur
function afficherErreur(input) {
    formulaireValide = false;
    const contenuFormulaire = input.parentElement.parentElement;
    contenuFormulaire.className = 'contenu-formulaire erreur';
}

// Affiche les styles de succès
function afficherSucces(input) {
    const contenuFormulaire = input.parentElement.parentElement;
    contenuFormulaire.className = 'contenu-formulaire succes';
}

// Retire les styles de validation
function retirerStyleValidation(input) {
    const contenuFormulaire = input.parentElement.parentElement;
    contenuFormulaire.className = 'contenu-formulaire';
}