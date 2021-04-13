class Client {
    constructor(nom, prenom, age, motDePasse, civilite, status) {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.motDePasse = motDePasse;
        this.civilite = civilite;
        this.status = status;
    }
}

let clients = [];

function displayClient() {

    // Get values from HTML
    let nom = document.getElementById('name').value;
    let prenom = document.getElementById('firstname').value;
    let age = document.getElementById('age').value;
    let motDePasse = document.getElementById('password').value;
    let civ = document.getElementById('civility').value;
    let status = document.getElementById('status').value;

    // By default, the label is in red
    document.getElementById('labelFinal').style.color = 'red';

    // Call method to check parameters
    checkParametresClient(nom, prenom, age, motDePasse, civ, status);

}

function checkParametresClient(nom, prenom, age, motDePasse, civ, status)  {

    // Create a client if conditions are good
    // name and firstname  char min
    // password not empty and 6 char max
    // age is given
    let message;
    let errorParam;
    
    document.getElementById('labelFinal').style.color = 'red';

    console.log("in checkParametresClient");
    console.log("nom.length: " + nom.length);
    console.log("prenom.length: " + prenom.length);
    console.log("motDePassse.length: " + motDePasse.length);
    console.log("age.length: " + age.length);
    console.log("in checkParametresClient");

    if (    (nom.length >= 5)
        &&  (prenom.length >= 5)
        &&  (motDePasse.length > 0)  
        &&  (motDePasse.length <= 6)
        &&  (age.length > 0) ){
            // Create a client
            createClient(nom, prenom, age, motDePasse, civ, status);
            

            // Update message and label 
            message = "Felicitations, l'ajout du client à fonctionné !";
            document.getElementById('labelFinal').innerHTML = message;
            document.getElementById('labelFinal').style.color = 'green';

            // Clear values    
            document.getElementById('name').value = "";
            document.getElementById('firstname').value = "";
            document.getElementById('age').value = "";
            document.getElementById('password').value = "";
            document.getElementById('civility').value = "";
            document.getElementById('status').value = "";
        }
    else {
            // Call method to get error parameters
            message = checkErrorParams(nom, prenom, age, motDePasse);
    }

    
    document.getElementById('labelFinal').innerHTML = message;

}

function createClient(nom, prenom, age, motDePasse, civ, status) {
    client = new Client(nom, prenom, age, motDePasse, civ, status);
    console.log(client);

    clients.push(client);
    alert("Nouveau client " + nom + " " + prenom + ". Il y a " + clients.length + " clients enregistrés !");

    message = "Bonjour " + civ + " " + prenom + " " + nom
    document.getElementById('labelFinal').style.color = 'green';
}

function checkErrorParams(nom, prenom, age, motDePasse) {

    let message = "Erreur sur les champs suivants: ";

    if (nom.length < 5) {
        console.log("Nom incorrect");
        message += " nom";
    }

    if (prenom.length < 5) {
        console.log("Prenom incorrect");
        message += ", prenom";
    }

    if (motDePasse.length == 0 || motDePasse.length > 6) {
        console.log("Mot de passe incorrect");
        message += ", mot de passe";
    }

    if (age.length == 0) {
        console.log("Age incorrect");
        message += ", age";
    }

    return message;
}