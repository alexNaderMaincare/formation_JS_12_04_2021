// Exemple
function loadDataFromDb() {
    console.log("Enter loadDataFromDb");

    // First get client data (name, firstName)
    // Implement request
    $.ajax({
        url: `http://localhost:3000/clients`,
        type: 'GET',
        dataType: 'JSON'
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        // Get info from db
        for(client of data) {
            //message += "Nom: " + client.name + ", prenom: " + client.firstName + "<br>";
            
            console.log("Client name: " + client.name + ", firstName: " + client.firstName);

            let tabHtml = document.getElementById('tabClients');
            let row = tabHtml.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = client.name;
            cell2.innerHTML = client.firstName;
        }
    })

    // Second get orders data (name, firstName)
    // Implement request
    $.ajax({
        url: `http://localhost:3000/commandes`,
        type: 'GET',
        dataType: 'JSON'
    })

    // Request success
    .done(function(data){
        console.log(data);
        console.log("Success ! Data: " + JSON.stringify(data));

        // Get info from db
        for(commande of data) {
            //message += "Nom: " + client.name + ", prenom: " + client.firstName + "<br>";
            
            console.log("Order nb: " + commande.number + ", state: " + commande.status);

            let tabHtml = document.getElementById('tabCommandes');
            let row = tabHtml.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = commande.number;

            updateStatus(cell2, commande.status);
        }
    })
}

function updateStatus(cell, orderState) {
    console.log("Order state: " + orderState);

    cell.style.textAlign ="right";

    if (orderState == 1) {
        cell.innerHTML = "Payé";
        cell.style.color = "green";
    }
    else if(orderState == 2) {
        cell.innerHTML = "En attente de paiement";
        cell.style.color = "orange";
    }
    else if(orderState == 3) {
        cell.innerHTML = "Non payé";
        cell.style.color = "red";
    }
    else {
        cell.innerHTML = "Status inconnu";
        cell.style.color = "black";
    }
}