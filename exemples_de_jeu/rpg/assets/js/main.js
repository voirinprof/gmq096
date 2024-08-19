// configuration of the game
var config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 500, // game width
    height: 500,//  game height
    backgroundColor: '#fff', // game background color
    zoom: 2,
    pixelArt: true,
    physics: { // game physics
        default: 'arcade', // we are using the arcade physics engine
        arcade: { // configuration for the arcade physics engine
            gravity: { y: 0 }, // will affect our player sprite
            debug: false // change if you want a colorful debug display
        }
    },
    scene: { // scene configuration
        preload: preload, // preload method is where we load our assets
        create: create, // create method is where we set up our game
        update: update // update method is fired constantly throughout the game
    }
};

var game = new Phaser.Game(config); // creation of the game instance, passing the configuration
var player;

function preload () // preload method
{
    // map tiles
    this.load.image('tiles', 'assets/img/map/spritesheet.png');
        
    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/img/map/map.json');
    
    // our two characters
    this.load.spritesheet('player', 'assets/img/sprites/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
}

function create () // create method
{
    // define the tiled map
    var map = this.make.tilemap({ key: 'map' });
    // tiles for the ground layer
    var tiles = map.addTilesetImage('spritesheet', 'tiles');
        
    // create the ground layer
    var grass = map.createLayer('Grass', tiles, 0, 0);
    // create the obstacles layer
    var obstacles = map.createLayer('Obstacles', tiles, 0, 0);
    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    // player sprite
    player = this.physics.add.sprite(50, 100, 'player', 6);

    // don't go out of the map
    this.physics.add.collider(player, obstacles);
    // limit camera to map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    
    // player will collide with the level tiles
    player.setCollideWorldBounds(true);
    
    // cursors will help us control the player
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // define the camera
    this.cameras.main.setBounds(0, 0, 900, 900);
    this.cameras.main.startFollow(player);
    this.cameras.main.roundPixels = true;

    // animation with key 'left'
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
        frameRate: 10,
        repeat: -1
    });
    
    // animation with key 'right'
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
        frameRate: 10,
        repeat: -1
    });
    // animation with key 'up'
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
        frameRate: 10,
        repeat: -1
    });
    // animation with key 'down'
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
        frameRate: 10,
        repeat: -1
    });
}


function update () // update method
{
    // player movement
    player.body.setVelocity(0);
    // Horizontal movement
    if (this.cursors.left.isDown)
    {
        player.body.setVelocityX(-80);
        player.anims.play('left', true);
        player.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        player.body.setVelocityX(80);
        player.anims.play('right', true);
        player.flipX = false;
    }
    // Vertical movement
    if (this.cursors.up.isDown)
    {
        player.body.setVelocityY(-80);
        player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown)
    {
        player.body.setVelocityY(80);
        player.anims.play('down', true);
    } 

    if (this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown){

    } else {
        player.anims.stop();
    }
}

