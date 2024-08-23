// configuration du jeu
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// Variables globales
let player; // joueur
let cursors; // contrôles
let obstacles; // obstacles
let bonuses; // bonus


// fonction de préchargement
function preload() {
    this.load.image('background', 'assets/img/background.png');
    this.load.image('player', 'assets/img/player.png');
    this.load.image('obstacle', 'assets/img/obstacle.png');
    this.load.image('bonus', 'assets/img/bonus.png');
}

// fonction de création
function create() {
    // Ajouter le fond en déplacement
    this.background = this.add.tileSprite(400, 300, 800, 600, 'background');

    // Ajouter le joueur
    player = this.physics.add.sprite(400, 500, 'player');
    player.setCollideWorldBounds(true);

    // Configurer les contrôles
    cursors = this.input.keyboard.createCursorKeys();

    // Groupes d'obstacles et de bonus
    obstacles = this.physics.add.group();
    bonuses = this.physics.add.group();

    
    // Générer des obstacles et des bonus à intervalles réguliers
    this.time.addEvent({
        delay: 1000,
        callback: addObstacle,
        callbackScope: this,
        loop: true
    });

    this.time.addEvent({
        delay: 1500,
        callback: addBonus,
        callbackScope: this,
        loop: true
    });
}

function update() {
    // Faire défiler le fond pour simuler le mouvement
    this.background.tilePositionY -= 2;

    // Contrôles de déplacement du joueur
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }

    // Faire défiler les obstacles et les bonus
    obstacles.children.iterate(function (child) {
        child.setVelocityY(200);

    });

    bonuses.children.iterate(function (child) {
        child.setVelocityY(150);

    });

}

function addObstacle() {
    const x = Phaser.Math.Between(50, 750);
    const obstacle = obstacles.create(x, 0, 'obstacle');
    obstacle.setVelocityY(200);
}

function addBonus() {
    const x = Phaser.Math.Between(50, 750);
    const bonus = bonuses.create(x, 0, 'bonus');
    bonus.setVelocityY(150);
}
