// Un exemple de fichier main.js
// on y définit la configuration du jeu, les méthodes preload, create et update


// configuration du jeu
var config = {
    type: Phaser.AUTO, // Phaser utilisera WebGL si possible, 
                       // sinon ce sera Canvas
    width: 800, // largeur de la fenêtre du jeu
    height: 600,//  hauteur de la fenêtre du jeu
    physics: { // loi physique du jeu
        default: 'arcade', // le moteur physique par défaut
        arcade: { // configuration du moteur physique
            gravity: { y: 0 } // gravité du jeu
        } 
    },
    scene: { // configuration de la scène
        preload: preload, // méthode de préchargement des ressources
        create: create, // méthode de création des objets
        update: update // méthode de mise à jour du jeu
    }
};

var game = new Phaser.Game(config); // création de l'objet jeu

function preload () // méthode de préchargement des ressources
{
    // cette méthode est appelée une seule fois au début du jeu
    console.log("preload"); // affichage d'un message dans la console
}

function create () // méthode de création des objets
{
    // cette méthode est appelée une seule fois au début du jeu (après preload)
    console.log("create"); // affichage d'un message dans la console
}

function update () // méthode de mise à jour du jeu
{
    // cette méthode est appelée à chaque image (60 fois par seconde)
    console.log("update"); // affichage d'un message dans la console
}