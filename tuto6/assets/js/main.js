// Un exemple de fichier main.js
// on va utiliser le concept de boucle
// on va reproduire x fois un logo dans la fenêtre

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

    // on charge les images (le ciel et le logo)
    this.load.image('sky', 'assets/img/skies/space3.png');
    this.load.image('logo', 'assets/img/sprites/phaser3-logo.png');
    

}

function create () // méthode de création des objets
{
    
    this.add.image(400, 300, 'sky'); // ajout de l'image du ciel    

    // on va créer 4 logos sur une ligne
    // on utilise une boucle de répétition
    for (var i = 0; i < 4; i++)
    {
        // position du logo en fonction de i
        // i = 0 -> x = 100
        // i = 1 -> x = 300
        // i = 2 -> x = 500
        // i = 3 -> x = 700
    
        var x = 100 + i * 200;
        var y = 10;
        var logo = this.physics.add.image(x, y, 'logo');
        logo.setScale(0.3, 0.3);
    }


}
