function displayClient() {

    let nom = document.getElementById('name').value;
    let prenom = document.getElementById('firstname').value;
    let civ = document.getElementById('civility').value;
    let message;

    let tailleNom = nom.length;
    let taillePrenom = prenom.length;

    document.getElementById('labelFinal').style.color = 'red';

    if ( (tailleNom >= 5)  && (taillePrenom >= 5) ) {
        message = "Bonjour " + civ + " " + prenom + " " + nom
        document.getElementById('labelFinal').style.color = 'green';
    }
    else if ( (tailleNom < 5)  && (taillePrenom < 5) ){
        message = "Le nom et le prénom sont trop court !";
    }
    else if  (tailleNom < 5){
        message = "Le nom est trop court !";
    }
    else {
        message = "Le prenom est trop court !";
    }
    
    document.getElementById('labelFinal').innerHTML = message;
    alert(message);

}