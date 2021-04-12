class Client {
    constructor(nom, prenom, motDePasse, civilite, status) {
        this.nom = nom;
        this.prenom = prenom;
        this.motDePasse = motDePasse;
        this.civilite = civilite;
        this.status = status;
    }
}

let clients = [];

function displayClient() {

    let nom = document.getElementById('name').value;
    let prenom = document.getElementById('firstname').value;
    let motDePasse = document.getElementById('password').value;
    let civ = document.getElementById('civility').value;
    let status = document.getElementById('status').value;
    let message;

    let tailleNom = nom.length;
    let taillePrenom = prenom.length;

    // Par défaut, les infos seront affichées en rouge
    document.getElementById('labelFinal').style.color = 'red';

    // Si les conditions sont remplies, on peut créer un nouveau Client
    if ( (tailleNom >= 5)  && (taillePrenom >= 5) && (motDePasse.length > 0) ) {
        client = new Client(nom, prenom, motDePasse, civ, status);
        console.log(client);

        clients.push(client);
        alert("Nouveau client " + nom + " " + prenom + ". Il y a " + clients.length + " clients enregistrés !");

        message = "Bonjour " + civ + " " + prenom + " " + nom
        document.getElementById('labelFinal').style.color = 'green';
    }
    // Nom et prenom trop court
    else if ( (tailleNom < 5)  && (taillePrenom < 5) ){
        message = "Le nom et le prénom sont trop court !";
        document.getElementById('name').value = "";
        document.getElementById('firstname').value = "";
    }
    // Nom trop court
    else if  (tailleNom < 5){
        message = "Le nom est trop court !";
        document.getElementById('name').value = "";
    }
    // Prenom trop court
    else {
        message = "Le prenom est trop court !";
        document.getElementById('firstname').value = "";
    }
    
    // Affichage du message final
    document.getElementById('labelFinal').innerHTML = message;
    alert(message);

}