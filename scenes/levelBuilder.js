class levelBuilder extends Phaser.Scene {
  constructor() {
    super("levelBuilder");
  }
  preload() {
    this.load.html("dropdown", "html/dropdownItems.html");
    this.load.html("dropdownR", "html/dropdownRows.html");
    this.load.html("dropdownC", "html/dropdownCols.html");

  }
  create() {
    this.roverOn = false
    this.gemOn = false
    this.bombOn = false
    this.fireOn = false
    var title = this.add.bitmapText(game.config.width / 2, 100, 'gothic', 'Level Builder', 100).setOrigin(.5).setTint(0xf7484e);
    var text = 'Create a default level for Moves and Time modes.'
    var info = this.add.bitmapText(game.config.width / 2, 225, 'gothic', text, 30).setOrigin(.5).setTint(0xffffff);

    let ratioX = game.config.width / window.innerWidth
    let ratioY = game.config.height / window.innerHeight
    // a DOM elements is added pretty much like a sprite
    let dropdownItems = this.add.dom(100, 425).createFromCache("dropdown");
    dropdownItems.setScale(Math.max(ratioX, ratioY));
    dropdownItems.addListener("click");
    dropdownItems.on("click", function (e) {
      defaultGame.items = e.target.value
    }, this);

    let dropdownRows = this.add.dom(300, 425).createFromCache("dropdownR");
    dropdownRows.setScale(Math.max(ratioX, ratioY));
    dropdownRows.addListener("click");
    dropdownRows.on("click", function (e) {
      defaultGame.rows = e.target.value
    }, this)
    let dropdownCols = this.add.dom(600, 425).createFromCache("dropdownC");
    dropdownCols.setScale(Math.max(ratioX, ratioY));
    dropdownCols.addListener("click");
    dropdownCols.on("click", function (e) {
      defaultGame.cols = e.target.value
    }, this)
    //allow rovers
    var rover = this.add.bitmapText(game.config.width / 2 - 25, 525, 'gothic', 'Rover', 50).setOrigin(1, .5).setTint(0xffffff);
    this.roverSwitch = this.add.image(game.config.width / 2 + 25, 525, 'switch', (this.roverOn) ? 1 : 0).setOrigin(0, .5).setInteractive().setScale(.9)
    this.roverSwitch.on('pointerdown', this.roverToggle, this)
    //allow gems
    var gems = this.add.bitmapText(game.config.width / 2 - 25, 625, 'gothic', 'Gems', 50).setOrigin(1, .5).setTint(0xffffff);
    this.gemSwitch = this.add.image(game.config.width / 2 + 25, 625, 'switch', (this.gemOn) ? 1 : 0).setOrigin(0, .5).setInteractive().setScale(.9)
    this.gemSwitch.on('pointerdown', this.gemToggle, this)
    //allow bomb
    var bombs = this.add.bitmapText(game.config.width / 2 - 25, 725, 'gothic', 'Bombs', 50).setOrigin(1, .5).setTint(0xffffff);
    this.bombSwitch = this.add.image(game.config.width / 2 + 25, 725, 'switch', (this.bombOn) ? 1 : 0).setOrigin(0, .5).setInteractive().setScale(.9)
    this.bombSwitch.on('pointerdown', this.bombToggle, this)
    //allow fire
    var fire = this.add.bitmapText(game.config.width / 2 - 25, 725, 'gothic', 'Fire', 50).setOrigin(1, .5).setTint(0xffffff);
    this.fireSwitch = this.add.image(game.config.width / 2 + 25, 725, 'switch', (this.fireOn) ? 1 : 0).setOrigin(0, .5).setInteractive().setScale(.9)
    this.fireSwitch.on('pointerdown', this.fireToggle, this)


    var exit = this.add.image(game.config.width / 2, 1550, 'menu_icons', 5).setInteractive()
    exit.on('pointerdown', function () {

      // localStorage.setItem('ringTotal', JSON.stringify(this.ringTotal));
      this.scene.start('startGame');

    }, this);

    defaultGame = {
      cols: 7,
      rows: 8,
      items: 6,
      movesGoal: 20,
      allowDrop: false,
      dropStartCount: 3,
      allowGem: false,
      gemStartCount: 2,
      allowRover: false,
      roverStartCount: 3,
      allowIce: false,
      iceStartCount: 3,
      allowBomb: false,
      bombStartCount: 3,
      allowIce: false,
      iceStartCount: 4,
      allowFire: false,
      fireStartCount: 4,
      allowWild: false,
      wildStartCount: 3,
      blocks: []
    }

  }
  roverToggle() {
    if (this.roverOn) {
      this.roverOn = false
      defaultGame.allowRover = this.roverOn

      this.roverSwitch.setFrame(0)
    } else {
      this.roverOn = true
      defaultGame.allowRover = this.roverOn
      defaultGame.roverStartCount = Phaser.Math.Between(2, 5)
      this.roverSwitch.setFrame(1)
    }
  }
  gemToggle() {
    if (this.gemOn) {
      this.gemOn = false
      defaultGame.allowRover = this.gemOn

      this.gemSwitch.setFrame(0)
    } else {
      this.gemOn = true
      defaultGame.allowGem = this.gemOn
      defaultGame.gemStartCount = Phaser.Math.Between(2, 5)
      this.gemSwitch.setFrame(1)
    }
  }
  bombToggle() {
    if (this.bombOn) {
      this.bombOn = false
      defaultGame.allowBomb = this.bombOn

      this.bombSwitch.setFrame(0)
    } else {
      this.bombOn = true
      defaultGame.allowBomb = this.bombOn
      defaultGame.bombStartCount = Phaser.Math.Between(2, 5)
      this.bombSwitch.setFrame(1)
    }
  }
  fireToggle() {
    if (this.fireOn) {
      this.fireOn = false
      defaultGame.allowFire = this.fireOn

      this.fireSwitch.setFrame(0)
    } else {
      this.fireOn = true
      defaultGame.allowFire = this.fireOn
      defaultGame.fireStartCount = Phaser.Math.Between(2, 5)
      this.fireSwitch.setFrame(1)
    }
  }
}
