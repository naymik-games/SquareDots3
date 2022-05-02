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
    console.log('lev ' + lev + ', ' + 'stat ' + stat)
    if (lev > stat) {
      for (var i = 0; i < lev - stat; i++) {
        gameData.levelStatus.push(-1)
      }
      localStorage.setItem('SD3save', JSON.stringify(gameData));
    }
    this.cameras.main.setBackgroundColor(0x000000);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'gothic', 'SquareDots', 130).setOrigin(.5).setTint(0xf7484e);

    var startMoves = this.add.bitmapText(game.config.width / 2, 375, 'gothic', 'Moves', 80).setOrigin(.5).setTint(0xffffff);
    startMoves.setInteractive();
    startMoves.on('pointerdown', this.clickHandler, this);
    var startTime = this.add.bitmapText(game.config.width / 2, 600, 'gothic', 'Time', 80).setOrigin(.5).setTint(0xffffff);
    startTime.setInteractive();
    startTime.on('pointerdown', this.clickHandler2, this);
    var startChanllenge = this.add.bitmapText(game.config.width / 2, 1075, 'gothic', 'Challenge', 80).setOrigin(.5).setTint(0xffffff);
    startChanllenge.setInteractive();
    startChanllenge.on('pointerdown', this.clickHandler3, this);



  }
  clickHandler() {
    gameMode = 'moves'
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  clickHandler2() {
    gameMode = 'time'
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  clickHandler3() {
    gameMode = 'challenge'
    this.scene.start('selectGame');
    //this.scene.launch('UI');
  }

}