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

var bricks;
var ball;
var paddle;

function preload () // preload method
{
    this.load.image('paddle', 'assets/img/sprites/paddle1.png');
    this.load.image('ball', 'assets/img/sprites/ball1.png');
    this.load.image('brick1', 'assets/img/sprites/blue1.png');
    this.load.image('brick2', 'assets/img/sprites/green1.png');
    this.load.image('brick3', 'assets/img/sprites/red1.png');
}

function create () // create method
{
    // Enable world bounds, but disable the floor
    this.physics.world.setBoundsCollision(true, true, true, false);

    // Create 10 bricks in a horizontal line, and change the color for each row
    bricks = this.physics.add.staticGroup();
    

    const brickImages = ['brick1', 'brick2', 'brick3']; // Images pour chaque ligne
    const brickRows = 5;
    const brickCols = 10;

    for (let y = 0; y < brickRows; y++) {
        for (let x = 0; x < brickCols; x++) {
            const brickX = 80 + x * 60;
            const brickY = 100 + y * 30;
            const brickImage = brickImages[y % brickImages.length]; // Changer l'image pour chaque ligne
            bricks.create(brickX, brickY, brickImage).setOrigin(0).refreshBody();
        }
    }

    // Create the ball with a physics body
    ball = this.physics.add.image(400, 500, 'ball').setCollideWorldBounds(true).setBounce(1);
    ball.setData('onPaddle', true);
    bricks.children.each(function(brick) {
        // define the hit property
        brick.setData('hit', 0);
        }, this);
    
    // Create the player's paddle
    paddle = this.physics.add.image(400, 550, 'paddle').setImmovable();

    // Collide the ball with the bricks
    this.physics.add.collider(ball, bricks, function(myball, brick){
        
        // get the value of the hit property
        var hit = brick.getData('hit');
        // if hit = 1, disable the brick
        if(hit==1){
            brick.disableBody(true, true);
        } else {
            // else, set hit to 1
            brick.setData('hit', 1);
        }
    }, null, this);

    // Collide the ball and the paddle
    this.physics.add.collider(ball, paddle, function(myball, paddle){
        let diff = 0;

        // if the ball is on the left-hand side of the paddle
        if (myball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - myball.x;
            myball.setVelocityX(-10 * diff);
        }
        // if the ball is on the right-hand side of the paddle
        else if (myball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = myball.x - paddle.x;
            myball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            myball.setVelocityX(2 + Math.random() * 8);
        }
    }, null, this);

    // follow the pointer
    this.input.on('pointermove', function (pointer)
    {
        //  Keep the paddle within the game
        paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

        if (ball.getData('onPaddle'))
        {
            ball.x = paddle.x;
        }

    }, this);

    // launch the ball
    this.input.on('pointerup', function (pointer)
    {

        if (ball.getData('onPaddle'))
        {
            ball.setVelocity(-75, -300);
            ball.setData('onPaddle', false);
        }

    }, this);
}

function resetBall ()
{
    // reset the ball position and velocity
    ball.setVelocity(0);
    ball.setPosition(paddle.x, 500);
    ball.setData('onPaddle', true);
}

function update () // update method
{
    // if the ball is out of the screen, call the resetBall function (respawn)
    if (ball.y > 600)
    {
        resetBall.call(this);
    }
}

