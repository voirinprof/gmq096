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

var letters = 'abcdefghijklmnopqrstuvwxyz '
var pos_letters = [24, 17, 10, 3, 44, 37, 30, 23, 16, 9, 2, 38, 36, 29, 22, 15, 8, 1, 42, 35, 28, 21, 14, 7, 0, 43, 31]
var value_letters = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 0]

function preload () // preload method
{
    this.load.spritesheet('letters', 'assets/img/sprites/wood_spritesheet.png', { frameWidth: 256, frameHeight: 256, spacing: 2, margin: 0 });

}

function create () // create method
{
    // declare all the letters to test
    for (var i=0;i<letters.length;i++){
        var letter = this.add.image(20 + i * 28, 150, 'letters', pos_letters[i] );

        letter.scale = 0.10;
    }
    
    // declare the word to test
    var myword = "hello world";
    var value_word = 0;
    // loop through the word
    for (var i=0;i<myword.length;i++){
        // get the position of the letter in the alphabet
        var pos = letters.indexOf(myword[i]);
        // display the letter in wood
        var woodletter = this.add.image(40 + i * 72, 350, 'letters', pos_letters[pos] );
        woodletter.scale = 0.26;
        // add the value of the letter to the value of the word
        value_word += value_letters[pos];
    }

    console.log(value_word);
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

