class Client {
    constructor(name, firstName, age, password, civility, status) {
        this.id;
        this.name = name;
        this.firstName = firstName;
        this.age = age;
        this.password = password;
        this.civility = civility;
        this.status = status;
    }
}

function serializeClient(client) {
    return JSON.stringify({
        name: client.name,
        firstName: client.firstName,
        age: parseInt(client.age),
        password: client.password,
        civility: client.civilite,
        status: client.status,
    })
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
    let status = document.getElementById('status').checked;

    console.log(status);

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
function createClient(name, firstName, age, motDePasse, civ, status) {
    let newClient = new Client(name, firstName, parseInt(age), motDePasse, civ, status);
    clients.push(newClient);

    /*clients.push(client);
    alert("Nouveau client " + nom + " " + prenom + ". Il y a " + clients.length + " clients enregistrés !");

    message = "Bonjour " + civ + " " + prenom + " " + nom
    document.getElementById('labelCreationClient').style.color = 'green';*/

    // Implement request
    $.ajax({
        url: 'http://localhost:3000/clients',
        type: 'POST',
        dataType: 'JSON',
        contentType: "application/json",
        data: serializeClient(newClient),
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));
    })

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
    let message = "";

    document.getElementById('labelRechercheInfos').style.color = 'red';

    if (information == "average") {
        console.log("On souhaite connaître la moyenne d'âge !");
        //message = getAverageAge();
        getAverageAgeDb();
    } else if (information == "searchClient") {
        console.log("On souhaite rechercher un client!");
        //message = getClientInformation(name);
        getClientInformationDb(name);
    } else if (information == "rechercheDb") {
        console.log("On souhaite rechercher en database!");
        searchInDatabase();

    }

    document.getElementById('labelRechercheInfos').innerHTML = message;
}

// Calculates average age
function getAverageAge() {

    let message;
    
    if (clients.length > 0 ) {
        let averageAge = 0;

        for (i in clients) {
            averageAge += parseInt(clients[i].age);
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

        for (i in clients) {
            console.log("clients[i].name " + clients[i].name);
            if (clients[i].name.toUpperCase == name.toUpperCase) {
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

function searchInDatabase() {
    // JQuery

    let message = "";

    // Implement request
    $.ajax({
        url: `http://localhost:3000/clients`,
        type: 'GET',
        dataType: 'JSON'
    })

    // Request success
    .done(function(data){
        message = "Les clients sont : <br>";

        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        // Get info from db
        for(client of data) {
            message += "Nom: " + client.name + ", prenom: " + client.firstName + "<br>";
        }

        // Update HTML
        $("#labelRechercheInfos").css("color","green");
        $("#labelRechercheInfos").html(message);
    })
}

// Calculates average age
function getAverageAgeDb() {

    let message = "";
    let averageAge = 0;
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

        if (data) {
            // Get info from db
            for(client of data) {
                console.log("Age : " + client.age);
                averageAge += parseInt(client.age);
            }
    
            message = "Moyenne d'âge: " + averageAge/(data.length);
        }
        else {
            message = "Aucune donnée en base !";
        }

        // Update HTML
        $("#labelRechercheInfos").css("color","green");
        $("#labelRechercheInfos").html(message);

    })
}

// Search for a client that fits the name given
function getClientInformationDb(name) {

    let message = "";
    let nameVar = name;
    // Implement request
    $.ajax({
        url: `http://localhost:3000/clients?nom=${nameVar}`,
        type: 'GET',
        dataType: 'json'
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        if (data) {
            console.log(data[0]['name']);
            message = data[0]['civilite'] 
                         + " " + data[0]['name'] 
                         + " " + data[0]['firstName']
                         + " (" + data[0]['age'] + " ans)";
            $("#labelRechercheInfos").css("color","green");
        }
        else {
            message = "Désolé, le client n'est pas répertorié";
        }

        $("#labelRechercheInfos").html(message);

    })

}