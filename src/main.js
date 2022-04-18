//Citlalli Hernandez, Rocket Patrol Modifications, 4/17/2022, About 16 hours
// 100 points
// Track a highscore that persists across scenes and display it in the UI (5)
// Implement the speed increase that happens after 30 seconds in the original game (5)
// Display the time remaining (in seconds) on the screen (10)
// Implement an alternating two-player mode (20)
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

//Track highscore
let highscore = 0;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyUP; 