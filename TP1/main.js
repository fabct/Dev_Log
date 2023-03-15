//------- creation de l'interface utilisateur ------//
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//------- Creation de la lecture des fichiers json -------//
const fs = require('fs');
let data;

function readJsonFile() {
    let fichier = fs.readFileSync('users.json');
    data = JSON.parse(fichier);
}

//------------ Interface d'affichage en fonction d'un choix --------//

function displayList() {
    rl.question("Que voulez vous selectionner ? \n-Pour avoir la liste des pays et le compteur des utilisateurs à coté par ordre décroissant tapez 1 \n-Pour avoir la liste des sociétés et le compteur des utilisateurs à côté par ordre décroissant tapez 2 \n-Pour quitter taoez sur 3\n", function(input) {
      if (input == 1) {
        const country = countByProperty(data, 'country');
        const sort = sortDescending(country);
        displayResults(sort);
        rl.close();
        displayList();
      }
      if (input == 2) {
        const society = countByProperty(data, 'company');
        const sort = sortDescending(society);
        displayResults(sort);
        rl.close();
        displayList();
      } else {
        rl.close();
      }
    });
    
}

function displayResults(list) {
    list.forEach(([name, count]) => {
      console.log(`${name} - ${count}`);
    });
}

function sortDescending(data) {
    return Object.entries(data).sort((a, b) => b[1] - a[1]);
}
  
function countByProperty(data, property) {
    return data.reduce((group, user) => {
      group[user[property]] = (group[user[property]] || 0) + 1;
      return group;
    }, {});
}
    


function main() {
    readJsonFile();
    displayList();
}

main();



//https://docs.google.com/presentation/d/11-3YYzlgSbyJAL2YG8VLc6IuSgjFbotLRXs3rnfcKA0/edit#slide=id.p cours js kevin