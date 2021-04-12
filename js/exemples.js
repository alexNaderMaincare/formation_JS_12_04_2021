// Exemple

// Variables
let var1 = 12;
let var2 = 3;
let var3 = false;

const result = var1 + var2;

// Alertes
alert("Bievenue sur la page de formulaire");

function send() {
    console.log(document.getElementById('paragraphe'));
    console.log(document.getElementById('paragraphe').innerHTML);
    document.getElementById('paragraphe').style.textDecoration = 'underline';
    document.getElementById('paragraphe').style.textDecorationColor = 'blue';
}

// Logs
/*if (typeof(var3) == "boolean") {
    console.log("Le résultat est " + result);
}

for(let i=0; i<3; i++) {
    console.log("i equals => ", i);
}


// Appels de méthodes
isPositive(result);
isPositive("toto");
isPositive(0);

// Méthodes
function isPositive(value) {
    if (typeof(value) == "number") {
        if (value > 0) {
            console.log("Le résultat est positif");
        }
        else if (value < 0) {
            console.log("Le résultat est négatif");
        }
        else {
            console.log("Le résultat est nul");
        }
    }
    else {
        console.log("Le paramètre d'entrée n'est pas un nombre !!!");
    }
}*/