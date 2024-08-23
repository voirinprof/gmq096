// configuration of the game
var config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 800, // game width
    height: 600,//  game height
    backgroundColor: '#333', // game background color
    physics: { // game physics
        default: 'arcade', // we are using the arcade physics engine
        arcade: { // configuration for the arcade physics engine
            gravity: { y: 300 } // will affect our player sprite
        }
    },
    scene: { // scene configuration
        preload: preload, // preload method is where we load our assets
        create: create, // create method is where we set up our game
        update: update // update method is fired constantly throughout the game
    }
};

var game = new Phaser.Game(config); // creation of the game instance, passing the configuration
let player; // variable to hold the player sprite
let cursors; // variable to hold the cursor keys

function preload () // preload method
{

    this.load.image('platform', 'assets/img/sprites/tiled_Blue Platform.png')
    // these images are for the animation
    this.load.image('player1', 'assets/img/sprites/Elf Male_Idle_1.png')
    this.load.image('player2', 'assets/img/sprites/Elf Male_Idle_2.png')
    this.load.image('player3', 'assets/img/sprites/Elf Male_Idle_3.png')
    this.load.image('player4', 'assets/img/sprites/Elf Male_Idle_4.png')
}

function create () // create method
{
    // set the bounds of the game world
    this.physics.world.setBounds(0, 0, 1600, 600);
    // define the platforms
    let platforms = this.physics.add.staticGroup();
    platforms.create(600, 450, "platform");
    platforms.create(50, 250, "platform");
    platforms.create(650, 220, "platform");
    platforms.create(250, 320, "platform");
    // the ground
    for (var i=0;i<30;i++) {
        platforms.create(10+i*63, 600, "platform"); // this is a loop to create the platforms
    }
    // define the animation
    this.anims.create({
        key: 'idle',
        frames: [
            { key: 'player1', frame: null },
            { key: 'player2', frame: null },
            { key: 'player3', frame: null },
            { key: 'player4', frame: null, duration: 50 }
        ],
        frameRate: 8,
        repeat: -1
    });

    // define the player
    player = this.physics.add.sprite(380, 500, "player1").play('idle');

    player.scale = 1.50;
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    // add the collision between the player and the platforms
    this.physics.add.collider(player, platforms);
    // add the cursor keys
    cursors = this.input.keyboard.createCursorKeys();

    // the camera will follow the player in the world
    this.cameras.main.setBounds(0, 0, 1600, 600); // inside the bounds of the world
    this.cameras.main.startFollow(player);
}


function update () // update method
{
    // add the movement of the player
    if (cursors.left.isDown) {
        player.setVelocityX(-160)
        player.flipX = true
      } else if (cursors.right.isDown) {
        player.setVelocityX(160)
        player.flipX = false
      } else {
        player.setVelocityX(0)
      }
      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330)
      }
}

