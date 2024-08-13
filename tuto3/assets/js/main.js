// Un exemple de fichier main.js
// On va créer une animation simple avec Phaser
// 2 logos qui se déplacent avec un comportement différent et rebondissent sur les bords de la fenêtre
// chaque logo emet des particules rouges

// configuration du jeu
var config = {
    type: Phaser.AUTO, // Phaser utilisera WebGL si possible, sinon ce sera Canvas
    width: 800, // largeur de la fenêtre du jeu
    height: 600,//  hauteur de la fenêtre du jeu
    physics: { // loi physique du jeu
        default: 'arcade', // le moteur physique par défaut
        arcade: { // configuration du moteur physique
            gravity: { y: 100 } // gravité du jeu
        }
    },
    scene: { // configuration de la scène
        preload: preload, // méthode de préchargement des ressources
        create: create // méthode de création des objets
    }
};

var game = new Phaser.Game(config); // création de l'objet jeu

function preload () // méthode de préchargement des ressources
{
    // on charge les images (le ciel, le logo et la particule rouge)
    this.load.image('sky', 'assets/img/skies/space3.png');
    this.load.image('logo', 'assets/img/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/img/particles/red.png');

}

function create () // méthode de création des objets
{
    // on va créer 2 logos qui vont se déplacer à leur rythme.


    this.add.image(400, 300, 'sky'); // ajout de l'image du ciel

    // on va doubler les particules

    var particles = this.add.particles(0, 0, 'red', { // création de l'émetteur de particules
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var particles2 = this.add.particles(0, 0, 'red', { // création de l'émetteur de particules
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    // on va doubler les logos

    var logo = this.physics.add.image(400, 100, 'logo'); // ajout de l'image du logo

    logo.setVelocity(100, 100); // définir la vitesse du logo
    logo.setBounce(1, 1); // définir le rebond du logo
    logo.setCollideWorldBounds(true); // définir la collision du logo avec les bords du monde

    var logo2 = this.physics.add.image(200, 50, 'logo'); // adding the logo image (un endroit différent)

    logo2.setVelocity(100, 100); // définir la vitesse du logo
    logo2.setBounce(1, 1); // définir le rebond du logo
    logo2.setCollideWorldBounds(true); // définir la collision du logo avec les bords du monde

    particles.startFollow(logo); // les particules suivent le logo

    particles2.startFollow(logo2); // les particules suivent le logo
}