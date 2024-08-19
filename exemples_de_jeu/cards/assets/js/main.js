// configuration of the game
var config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 800, // game width
    height: 600,//  game height
    backgroundColor: '#333', // game background color
    zoom: 1,
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
var timedEvent; // variable to hold the timed event
var text; // variable to hold the text
var initialTime = 10; // variable to hold the initial time (10 s)

function preload () // preload method
{
    this.load.spritesheet('cards', 'assets/img/sprites/all_cards.png', { frameWidth: 108, frameHeight: 155, spacing: 13.25, margin: 9 });
    this.load.image('back', 'assets/img/back.png');

}

function create () // create method
{
    // declare all the cards
    // the last number is the position of the card in the sprite sheet (from 0 to 51)
    var card = this.add.image(180, 300, 'cards', 0 );

    var card2 = this.add.image(300, 300, 'cards', 12 );

    var card3 = this.add.image(420, 300, 'cards', 39 );

    var card = this.add.image(540, 300, 'cards', 51 );

    // declare the back of the cards 
    // add interactivity to the cards
    var back1 = this.physics.add.image(180, 300, 'back');

    var back2 = this.physics.add.image(300, 300, 'back');

    var back3 = this.physics.add.image(420, 300, 'back');

    var back4 = this.physics.add.image(540, 300, 'back');

    // add interactivity to the cards
    // hide the card when clicked
    back1.setInteractive();

    back1.on('pointerdown', function () {
        back1.setVisible(false);
    });

    back2.setInteractive();

    back2.on('pointerdown', function () {
        back2.setVisible(false);
    });

    back3.setInteractive();

    back3.on('pointerdown', function () {
        back3.setVisible(false);
    });

    back4.setInteractive();

    back4.on('pointerdown', function () {
        back4.setVisible(false);
    });

    text = this.add.text(32, 32, 'Countdown: ' + formatTime(initialTime));

    // Each 1000 ms call onEvent
    timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
}

// format time method
function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}

// function to be executed at each event
function onEvent ()
{
    initialTime -= 1; // One second
    text.setText('Countdown: ' + formatTime(initialTime));

    if (initialTime == 0) // time is up
    {
        timedEvent.paused = true; // pause the timed event
        text.setText('Countdown: 0:00'); // display 0:00
        endGame(); // call the end game method
    }
}

function endGame(){
    console.log('end game')
}


function update () // update method
{
   
}

