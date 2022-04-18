class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        //load images/tile sprites
        //arrow is the original rocket
        this.load.image('rocket', './assets/torch arrow.png');
        //Witch is the orignal spaceship, witch will be refered as spaceship in code
        this.load.image('spaceship', './assets/Witch.png');
        this.load.image('Background', './assets/Background.png');
        //load spritesheet, puff is now the explosion
        this.load.spritesheet('explosion', './assets/Puff.png', {frameWidth: 64, frameHeight: 100, startFrame: 0, endFrame:9 });
    }
    create() {
        //place tile sprite
        this.Background = this.add.tileSprite(0, 0, 640, 480, 'Background').setOrigin(0,0);
        //purple UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize *2, 0x7a78d9).setOrigin(0,0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);
        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end: 9, first:0}),
            frameRate: 30
        });

        //initialize score
        this.p1Score = 0;

        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#E680BF',
            color: '#000',
            allign: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }



        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        scoreConfig.fixedWidth = 0;
        this.add.text(borderUISize + borderPadding +128, borderUISize + borderPadding*2, 'Highscore:' + highscore, scoreConfig);

         

        //GAME OVER Flag
        this.gameOver = false;
        //60 sec clock
        
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            scoreConfig.fixedWidth = 0;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press(R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            if(highscore < this.p1Score) highscore =  this.p1Score
            this.add.text(game.config.width/2, game.config.height/2 + 128, 'Highscore:' + highscore, scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        scoreConfig.fixedWidth = 100;
        this.timeRemaining = this.add.text(borderUISize + borderPadding +448, borderUISize + borderPadding*2, Math.floor(this.clock.getRemainingSeconds()), scoreConfig);
       


        this.speedup = this.time.delayedCall(30000, () => {
            this.ship01.updatespeed(2);
            this.ship02.updatespeed(2);
            this.ship03.updatespeed(2)
        }, null, this);
    }
    update() { 
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        this.Background.tilePositionX -=4;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.updateTime();
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
           this.p1Rocket.reset();
           this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship){
        //AABB checking
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true
            }else {
                return false;
            }
    }

    shipExplode(ship){
        //temp hide ship
        ship.alpha = 0;
        //create explosion
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode'); //plays explosion animation
        boom.on('animationcomplete', () => { //callback after anim completes
            ship.reset();                    //reset ship position
            ship.alpha = 1;                  //make ship visible
            boom.destroy();                  //remove explosion sprite
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    updateTime(){
        this.timeRemaining.text = Math.floor(this.clock.getRemainingSeconds());
    }
}