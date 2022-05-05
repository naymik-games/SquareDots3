class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {
    gameData = JSON.parse(localStorage.getItem('SD3save'));
    if (gameData === null || gameData.length <= 0) {
      localStorage.setItem('SD3save', JSON.stringify(defaultValues));
      gameData = defaultValues;
    }
    var lev = levels.length
    var stat = gameData.levelStatus.length
    //console.log('lev ' + lev + ', ' + 'stat ' + stat)
    if (lev > stat) {
      for (var i = 0; i < lev - stat; i++) {
        gameData.levelStatus.push(-1)
      }
      localStorage.setItem('SD3save', JSON.stringify(gameData));
    }
    onGroup = gameData.group
    defaultGame = null;
    defaultGame = {
      cols: 7,
      rows: 8,
      items: 6,
      movesGoal: 20,
      time: 60,
      allowDrop: false,
      dropStartCount: 0,
      allowGem: false,
      gemStartCount: 0,
      allowRover: false,
      roverStartCount: 0,
      allowIce: false,
      iceStartCount: 0,
      allowBomb: false,
      bombStartCount: 0,
      allowIce: false,
      iceStartCount: 0,
      allowFire: false,
      fireStartCount: 0,
      allowWild: false,
      wildStartCount: 0,
      blocks: []
    }




    this.cameras.main.setBackgroundColor(0x000000);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'gothic', 'SquareDots', 130).setOrigin(.5).setTint(0xf7484e);
    var playMoves = this.add.image(200, 375, 'play').setOrigin(1, .5).setTint(0xf7484e).setScale(2).setInteractive()
    var startMoves = this.add.bitmapText(225, 340, 'gothic', 'MOVES', 70).setOrigin(0, .5).setTint(0xffffff);
    var highMoves = this.add.bitmapText(225, 415, 'gothic', 'Best: ' + gameData.mostDotsMoves, 40).setOrigin(0, .5).setTint(0xcccccc);
    playMoves.setInteractive();
    playMoves.on('pointerdown', this.clickHandler, this);



    var playTime = this.add.image(200, 600, 'play').setOrigin(1, .5).setTint(0xf7484e).setScale(2).setInteractive()
    var startTime = this.add.bitmapText(225, 565, 'gothic', 'TIME', 80).setOrigin(0, .5).setTint(0xffffff);
    var highTime = this.add.bitmapText(225, 640, 'gothic', 'Best: ' + gameData.mostDotsTime, 40).setOrigin(0, .5).setTint(0xcccccc);
    playTime.setInteractive();
    playTime.on('pointerdown', this.clickHandler2, this);


    var playChallenge = this.add.image(200, 975, 'levelsIcon').setOrigin(1, .5).setTint(0xf7484e).setScale(1.9).setInteractive()
    var startChanllenge = this.add.bitmapText(225, 940, 'gothic', 'CHALLENGE', 80).setOrigin(0, .5).setTint(0xffffff);
    var highChallenge = this.add.bitmapText(225, 1015, 'gothic', 'Level: ' + gameData.currentLevel, 40).setOrigin(0, .5).setTint(0xcccccc);
    playChallenge.setInteractive();
    playChallenge.on('pointerdown', this.clickHandler3, this);

    var playBuilder = this.add.image(200, 1475, 'levelbuilder').setOrigin(1, .5).setTint(0xf7484e).setScale(1.9).setInteractive()
    var levelBuilder = this.add.bitmapText(225, 1440, 'gothic', 'LEVEL BUILDER ', 80).setOrigin(0, .5).setTint(0xffffff);
    var highLB = this.add.bitmapText(225, 1515, 'gothic', 'Best: ' + gameData.mostDotsLB, 40).setOrigin(0, .5).setTint(0xcccccc);
    playBuilder.setInteractive();
    playBuilder.on('pointerdown', function () {
      this.scene.start('levelBuilder');
    }, this);


  }
  clickHandler() {
    gameMode = 'moves'
    lbFlag = false
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  clickHandler2() {
    gameMode = 'time'
    lbFlag = false
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  clickHandler3() {
    gameMode = 'challenge'
    lbFlag = false
    this.scene.start('selectGame');
    //this.scene.launch('UI');
  }

}