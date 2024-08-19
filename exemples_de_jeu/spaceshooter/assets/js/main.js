// configuration of the game
var config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 800, // game width
    height: 600,//  game height
    backgroundColor: '#333', // game background color
    physics: { // game physics
        default: 'arcade', // we are using the arcade physics engine
        arcade: { // configuration for the arcade physics engine
            gravity: { y: 0 }, // will affect our player sprite
            debug: false
        }
    },
    scene: { // scene configuration
        preload: preload, // preload method is where we load our assets
        create: create, // create method is where we set up our game
        update: update // update method is fired constantly throughout the game
    }
};

var game = new Phaser.Game(config); // creation of the game instance, passing the configuration

var player; // variable to hold the player sprite
var rock; //  variable to hold the rock sprite
var cursors; // variable to hold the cursor keys

function preload () // preload method
{
    
    this.load.image('player', 'assets/img/sprites/player.png');
    this.load.image('rock', 'assets/img/sprites/meteorSmall.png');
    this.load.image('laser', 'assets/img/sprites/laserRed.png');

}

function create () // create method
{
    // add the player
    player = this.physics.add.sprite(400, 550, 'player');
    // add the rock
    createRock.call(this);
    // add the cursor keys
    cursors = this.input.keyboard.createCursorKeys();
    // add the overlap between the player and the rock
    this.physics.add.overlap(
        player,
        rock,
        (player, rock) => {
          player.disableBody(true, true)
          
        },
        null,
        this
      )

      
}


function update () // update method
{
    
    if(cursors.right.isDown) {
        player.setVelocityX(+160)
    }
    else if(cursors.left.isDown) {
        player.setVelocityX(-160)
    } else {
        player.setVelocityX(0)
    } 

    // if cursors.up is pressed, call the createLaser function (fire)
    if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
        createLaser.call(this);
    }

    // if the rock is out of the screen, call the createRock function (respawn)
    if (rock.y > 600) {
        createRock.call(this);
    }
    
}

// function to create a rock
function createRock(){
    
    // random position on the x axis
    let poxRockX = Math.floor(Math.random() * 800);



    // random velocity on the y axis
    let velocityRockY = Math.floor(Math.random() * 100) + 100;
    rock = this.physics.add.sprite(poxRockX, 10, 'rock');
    rock.x = poxRockX;
    rock.y = 10;
    rock.setVelocityY(velocityRockY)

    // when the rock is destroyed, call the createRock function (respawn)
    rock.once('destroy', function(rock) {
        
        createRock.call(this);
        }, this); 
        
}

// function to create a laser
function createLaser(){
    // create a laser sprite at the position of the player
    var laser = this.physics.add.sprite(player.x, player.y, 'laser');
    laser.setVelocityY(-300);
    laser.setImmovable();
    // destroy the laser when it collides with the rock
    this.physics.add.collider(laser, rock, function(laser, rock){
        laser.destroy();
        rock.destroy();
    });
}
