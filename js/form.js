class Client {
    constructor(name, firstName, age, password, civility, status) {
        this.name = name;
        this.firstName = firstName;
        this.age = age;
        this.password = password;
        this.civility = civility;
        this.status = status;
    }
}

let clients = [new Client('Breton', 'Thierry', 5, 'abcd', 'Monsieur', true),
               new Client('Rolland', 'Jeannot', 15, 'abcd', 'Monsieur', true)];

function displayClient() {

    // Get values from HTML
    let name = document.getElementById('name').value;
    let firstName = document.getElementById('firstname').value;
    let age = document.getElementById('age').value;
    let password = document.getElementById('password').value;
    let civility = document.getElementById('civility').value;
    let status = document.getElementById('status').value;

    // By default, the label is in red
    document.getElementById('labelCreationClient').style.color = 'red';

    // Call method to check parameters
    checkParametersClient(name, firstName, age, password, civility, status);

}

function checkParametersClient(name, firstName, age, password, civility, status)  {

    // Create a client if conditions are good
    // name and firstname  char min
    // password not empty and 6 char max
    // age is given
    let message;
    
    document.getElementById('labelCreationClient').style.color = 'red';

    console.log("in checkParametresClient");
    console.log("name.length: " + name.length);
    console.log("firstname.length: " + firstName.length);
    console.log("password.length: " + password.length);
    console.log("age.length: " + age.length);
    console.log("in checkParametresClient");

    if (    (name.length >= 5)
        &&  (firstName.length >= 5)
        &&  (password.length > 0)  
        &&  (password.length <= 6)
        &&  (age.length > 0) ){
            // Create a client
            createClient(name, firstName, age, password, civility, status);
            

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
            message = checkErrorParams(name, firstName, age, password);
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
function checkErrorParams(name, firstName, age, password) {

    let message = "Erreur sur les champs suivants: ";

    if (name.length < 5) {
        console.log("Nom incorrect");
        message += " nom";
    }

    if (firstName.length < 5) {
        console.log("Prenom incorrect");
        message += ", prenom";
    }

    if (password.length == 0 || password.length > 6) {
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
            console.log("clients[i].name " + clients[i].name);
            if (clients[i].name == name) {
                console.log("Client trouvé à l'index " + i);
                clientFound = true;
                message = "Client trouvé: " 
                            + clients[i].civility 
                            + " " + clients[i].name.toUpperCase()
                            + " " + clients[i].firstName
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