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

let clients = [new Client('Breton', 'Thierry', 5, 'abcd', 'Monsieur', true),
               new Client('Rolland', 'Jeannot', 15, 'abcd', 'Monsieur', true)];

function displayClient() {

    // Get values from HTML
    let nom = document.getElementById('name').value;
    let prenom = document.getElementById('firstname').value;
    let age = document.getElementById('age').value;
    let motDePasse = document.getElementById('password').value;
    let civ = document.getElementById('civility').value;
    let status = document.getElementById('status').value;

    // By default, the label is in red
    document.getElementById('labelCreationClient').style.color = 'red';

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
    
    document.getElementById('labelCreationClient').style.color = 'red';

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
            document.getElementById('labelCreationClient').innerHTML = message;
            document.getElementById('labelCreationClient').style.color = 'green';

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

    
    document.getElementById('labelCreationClient').innerHTML = message;

}

// Create a new client
function createClient(nom, prenom, age, motDePasse, civ, status) {
    client = new Client(nom, prenom, parseInt(age), motDePasse, civ, status);
    console.log(client);

    clients.push(client);
    alert("Nouveau client " + nom + " " + prenom + ". Il y a " + clients.length + " clients enregistrés !");

    message = "Bonjour " + civ + " " + prenom + " " + nom
    document.getElementById('labelCreationClient').style.color = 'green';
}


// Print client parameters in error
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

// Search for client information
// Average age
// Name search
function searchClientInformation() {
    let information = document.getElementById('information').value;
    let name = document.getElementById('searchInfo').value;

    console.log("Information souhaitée: " + information);

    document.getElementById('labelRechercheInfos').style.color = 'red';

    if (information == "average") {
        console.log("On souhaite connaître la moyenne d'âge !");
        message = getAverageAge();
    } else if (information == "searchClient") {
        console.log("On souhaite rechercher un client!");
        message = getClientInformation(name);
    }

    document.getElementById('labelRechercheInfos').innerHTML = message;
}

// Calculates average age
function getAverageAge() {

    let message;
    
    if (clients.length > 0 ) {
        let averageAge = 0;

        for (let i = 0; i < clients.length; i++) {
            averageAge += clients[i].age;
        }
        
        averageAge /=  clients.length;

        message = "Moyenne age des clients = " + averageAge;
        document.getElementById('labelRechercheInfos').style.color = 'green';
    } 
    else {
        message = "Aucun client n'est renseigné !";
    }

    return message;
}

// Search for a client that fits the name given
function getClientInformation(name) {

    let message;

    console.log("On recherche un client du nom de " + name);

    if (clients.length > 0 ) {
        let clientFound = false;

        for (let i = 0; i < clients.length; i++) {
            console.log("clients[i].nom " + clients[i].nom);
            if (clients[i].nom == name) {
                console.log("Client trouvé à l'index " + i);
                clientFound = true;
                message = "Client trouvé: " 
                            + clients[i].civilite 
                            + " " + clients[i].nom.toUpperCase()
                            + " " + clients[i].prenom
                            + " (" + clients[i].age + " ans)";
                document.getElementById('labelRechercheInfos').style.color = 'green';
                break;
            }
        }

        if (!clientFound) {
            message = "Le client du nom de " +  name + " n'a pas été trouvé";
        }
    }
    else {
        message = "Aucun client n'est renseigné !";
    }

    return message;
}