class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        //load audio
        //to keep with old code, the names of the audios will stay the same
        this.load.audio('sfx_select', './assets/twinkle.mp3');
        this.load.audio('sfx_explosion', './assets/Poof.wav');
        this.load.audio('sfx_rocket', './assets/arrow.wav');
    }
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#E680BF',
            color: '#000',
            allign: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'WITCH PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2,'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#7a78d9';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding+ 44, 'Press ↑ for Novice Two Player', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding+ 88, 'or ↓ for Expert Two Player', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +borderPadding+ 132 , 'Highscore:' + highscore, menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    update() {
      // Single player
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000, 
            players: 1  
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            players: 1   
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        //Two Players
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          // easy mode
          console.log("two players chief")
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000, 
            players: 2, 
            currentPlayer: 1,
            prevScore: 0
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          // hard mode
          console.log("two players chief")
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            players: 2,
            currentPlayer: 1,
            prevScore:0 
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}