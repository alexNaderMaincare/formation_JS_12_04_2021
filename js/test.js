function updateTitle() {
    let info1 = new Client("", "nader", "alexandre", 15, "eeeee", "Monsieur", true);

    console.log(info1);

    document.getElementById('myTest').innerHTML = info1.password;
}