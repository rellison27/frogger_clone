// Enemies our player must avoid
// This is a function that allows a specific location and speed to be added to the
//* enemy
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // This line calculates the speed for each enemy bug on screen
    this.x += this.speed * dt;
    // this resets the location of the bug back to the left side of the screen so the bug scrolls on screen
    if (this.x > 500) {
        this.x = -100;
    };
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(200, 50, 150), new Enemy(200, 220, 100), new Enemy(220, 150, 300)];
// Place the player object in a variable called player
var Player = function() {
    // Places the boy image at a specific location to start from
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 300;
};


Player.prototype.collision = function() {
    /* self is here to make sure this refers to the player prototype and not the
    forEach loop */
    var self = this;

    //this represents my players box
    var playerRect = {
        x: this.x,
        y: this.y,
        width: 50,
        height: 50
    };
    // this is here to set up a box for all of the enemies inside of the array.

    allEnemies.forEach(function(enemy) {
        //this is the enemy box
        var enemyRect = {
            x: enemy.x,
            y: enemy.y,
            width: 50,
            height: 50
        };

        /* this is code I retrieved from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        this code will detect collisions and will reset the characters position. */
        if (playerRect.x < enemyRect.x + enemyRect.width &&
            playerRect.x + playerRect.width > enemyRect.x &&
            playerRect.y < enemyRect.y + enemyRect.height &&
            playerRect.height + playerRect.y > enemyRect.y) {
            // collision detected - reset Player
            self.reset();
        }

    });

};
Player.prototype.winGame = function() {
    //this function is here to reset the character when he reaches the water
    var character = this
    if (this.y <= 50) {
        character.reset();
    }
};
// The position I want the player to go back to when the player collides with an enemy
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 300;
};
/*
//Win you win a "You Win!!" message pops up
Player.prototype.winMessage = function () {
  if (this.y <= 50) {
    confirm("I Win!!!")
  }
};
*/
// Used to invoke both collison and winGame functions
Player.prototype.update = function() {
    player.collision();
    player.winGame();
    player.winMessage();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// This is a funciton to control the player and keep the player inside of the parameters
Player.prototype.handleInput = function(input) {
    if (input === "right" && player.x <= 300) {
        this.x = this.x + 100
    } else if (input === "left" && player.x >= 100) {
        this.x = this.x - 100
    } else if (input === "up" && player.y >= 0) {
        this.y = this.y - 80
    } else if (input === "down" && player.y <= 300) {
        this.y = this.y + 80
    }
};
// invokes player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
