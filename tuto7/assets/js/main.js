// Un exemple de fichier main.js
// on va créer une animation qui permet de déplacer le logo avec les touches du clavier
// on va utiliser les touches fléchées pour déplacer le logo

// configuration du jeu
var config = {
    type: Phaser.AUTO, // Phaser utilisera WebGL si possible, sinon ce sera Canvas
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

// on doit utiliser des variables globales pour pouvoir les utiliser dans les différentes méthodes

var cursor; // variable pour les touches du clavier

var logo; // variable pour le logo

function preload () // méthode de préchargement des ressources
{    

    // on charge les images (le ciel et le logo)
    this.load.image('sky', 'assets/img/skies/space3.png');
    this.load.image('logo', 'assets/img/sprites/phaser3-logo.png');
    

}

function create () // méthode de création des objets
{
    
    this.add.image(400, 300, 'sky'); // ajout de l'image du ciel    

    logo = this.physics.add.image(400, 300, 'logo'); // ajout de l'image du logo

    cursor = this.input.keyboard.createCursorKeys();

}

function update() // méthode de mise à jour du jeu
{
    // on déplace le logo en fonction des touches du clavier
    if (cursor.left.isDown) // si la touche de gauche est enfoncée
    {
        logo.setVelocityX(-160); // on déplace le logo vers la gauche
    }
    else if (cursor.right.isDown) // si la touche de droite est enfoncée
    {
        logo.setVelocityX(160); // on déplace le logo vers la droite
    }
    else // si aucune touche n'est enfoncée
    {
        logo.setVelocityX(0); // on arrête le logo
    }

    if (cursor.up.isDown) // si la touche du haut est enfoncée
    {
        logo.setVelocityY(-160); // on déplace le logo vers le haut
    }
    else if (cursor.down.isDown) // si la touche du bas est enfoncée
    {
        logo.setVelocityY(160); // on déplace le logo vers le bas
    }
    else // si aucune touche n'est enfoncée
    {
        logo.setVelocityY(0); // on arrête le logo
    }
}