// Exemple
$(document).ready(function() {
    $("p").first().css("color", "blue");
    $("p").last().css("color", "brown");

    $("#getTest").click(function() {
        $("p").last().css("color", "red");

        // Implement request
        $.ajax({
            url: 'http://localhost:3000/clients',
            type: 'GET',
            dataType: 'json'
        })

        // Request success
        .done(function(data){
            console.log(data);
            console.log("Success ! Data: " + JSON.stringify(data));
            console.log(data['message']);
            console.log(data['message']['bulldog'][2]);
        })
    })


})

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
    document.getElementById('paragraphe').style.textDecorationColor = 'red';
    console.log(tableau);
}

class Info {
    constructor (param1, paramX) {
        this.info1 = param1;
        this.info2 = paramX;
    }
}

let informationA = new Info("Jean", "Valjean");
let informationB = new Info("Javier", "Pastore");

let tableau = [];
tableau.push(informationA);
tableau.push(informationB);

let informationC = new Info("Pierrot", "Dorian");
tableau.push(informationC);