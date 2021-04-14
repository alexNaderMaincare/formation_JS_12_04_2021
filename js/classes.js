// Class used to work on Clients
class Client {
    constructor(id, name, firstName, age, password, civility, status) {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.age = age;
        this.password = password;
        this.civility = civility;
        this.status = status;
    }
    
    serializeClient() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            firstName: this.firstName,
            age: parseInt(this.age),
            password: this.password,
            civility: this.civility,
            status: this.status,
        })
    }

    deserialize(obj) {
        let x = JSON.parse(JSON.stringify(obj));

        return new Client(x['id'],
                          x['name'],
                          x['firstName'],
                          x['age'],
                          x['password'],
                          x['civility'],
                          x['status']);
    }

    // Format age
    formatAge(cell) {
        cell.innerHTML = this.age +  " ans";
        cell.style.textAlign ="center";
    }

    // Format civility
    formatCivility(cell) {
        cell.style.textAlign ="center";
        if (this.civility == "Mr") {
            cell.innerHTML = "Monsieur";
        }
        else if (this.civility == "Mme") {
            cell.innerHTML = "Madame";
        }
        else {
            cell.innerHTML = "Mademoiselle";
        }
    }    
    
    // Format status
    formatStatus(cell) {
        cell.style.textAlign ="center";
        if (this.status == true) {
            cell.innerHTML = "Actif";
        }
        else {
            cell.innerHTML = "Inactif";
        }
    }
}


// Class used to work on orders
class Order {
    constructor(id, number, price, status, clientId) {
        this.id = id;
        this.number = number;
        this.price = price;
        this.status = status;
        this.clientId = clientId;
    }
    
    serializeOrder() {
        return JSON.stringify({
            id: parseInt(this.id),
            number: parseInt(this.number),
            price: parseFloat(this.price),
            status: parseInt(this.status),
            clientId: this.clientId,
        })
    }

    deserialize(obj) {
        let x = JSON.parse(JSON.stringify(obj));

        return new Order(x['id'],
                         x['number'],
                         x['price'],
                         x['status'],
                         x['clientId']);
    }

    // Format price
    formatPrice(cell) {
        cell.innerHTML = this.price +  " $";
    }

    // Format price to TTC (* 0.20)
    formatPriceTTC(cell) {
        let ttc = Number.parseFloat(this.price * 0.20).toPrecision(5);
        //cell.innerHTML = (this.price * 0.20) +  " $";
        cell.innerHTML = ttc +  " $";
    }

    // Transforms status from int to string (+ style)
    updateStatus(cell) {

        cell.style.textAlign ="right";

        if (this.status == 1) {
            cell.innerHTML = "Payé";
            cell.style.color = "green";
        }
        else if(this.status == 2) {
            cell.innerHTML = "En attente de paiement";
            cell.style.color = "orange";
        }
        else if(this.status == 3) {
            cell.innerHTML = "Non payé";
            cell.style.color = "red";
        }
        else {
            cell.innerHTML = "Status inconnu";
            cell.style.color = "black";
        }
    }
}


class User {
    constructor(id, username, password, role) {
        this.id       = id;
        this.username = username;
        this.password = password;
        this.role     = role;
    }    
    
    serialize() {
        return JSON.stringify({
            id: parseInt(this.id),
            username: this.username,
            password: this.password,
            role: this.role
        })
    }

    deserialize(obj) {
        let x = JSON.parse(JSON.stringify(obj));

        return new User(x['id'],
                        x['username'],
                        x['password'],
                        x['role']);
    }
}