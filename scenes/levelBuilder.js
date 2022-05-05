class levelBuilder extends Phaser.Scene {
  constructor() {
    super("levelBuilder");
  }
  preload() {
    this.load.html("dropdown", "html/dropdownItems.html");
    this.load.html("dropdownR", "html/dropdownRows.html");
    this.load.html("dropdownC", "html/dropdownCols.html");
    this.load.html("dropdownM", "html/dropdownMoves.html");
    this.load.html("dropdownT", "html/dropdownTime.html");

  }
  create() {
    lbData = JSON.parse(localStorage.getItem('SD3lb1'));
    if (lbData === null || lbData.length <= 0) {
      localStorage.setItem('SD3lb1', JSON.stringify(defaultGame));
      lbData = defaultGame;
    }

    defaultGame = null;
    defaultGame = lbData

    this.itemsArray = [3, 4, 5, 6]
    this.colsArray = [4, 5, 6, 7, 8]
    this.rowsArray = [4, 5, 6, 7, 8, 9, 10]
    this.movesArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
    this.timeArray = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180]
    this.timeClockArray = [':30', ':45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45', '3:00']

    this.roverOn = defaultGame.allowRover
    this.gemOn = defaultGame.allowGem
    this.bombOn = defaultGame.allowBomb
    this.fireOn = defaultGame.allowFire
    this.dropOn = defaultGame.allowDrop
    var title = this.add.bitmapText(game.config.width / 2, 100, 'gothic', 'Level Builder', 100).setOrigin(.5).setTint(0xf7484e);
    var text = 'Create and play your own level.'
    var info = this.add.bitmapText(game.config.width / 2, 175, 'gothic', text, 30).setOrigin(.5).setTint(0xffffff);
    var high = this.add.bitmapText(game.config.width / 2, 275, 'gothic', 'Best: ' + gameData.mostDotsLB, 50).setOrigin(.5).setTint(0xf7484e);

    let ratioX = game.config.width / window.innerWidth
    let ratioY = game.config.height / window.innerHeight
    // items dropdown
    var colorText = this.add.bitmapText(75, 395, 'gothic', 'Items', 50).setOrigin(0, 1).setTint(0xffffff);
    this.itmeSelect()
    /* let dropdownItems = this.add.dom(75, 400).createFromCache("dropdown").setOrigin(0);
    let color = dropdownItems.getChildByName("colors");
    color.value = defaultGame.items
    dropdownItems.setScale(Math.max(ratioX, ratioY));
    dropdownItems.addListener("click");
    dropdownItems.on("click", function (e) {
      defaultGame.items = e.target.value
    }, this); */
    //Rows dropdown
    this.rowsSelect()
    var rowsText = this.add.bitmapText(700, 395, 'gothic', 'Rows', 50).setOrigin(0, 1).setTint(0xffffff);

    /* let dropdownRows = this.add.dom(700, 400).createFromCache("dropdownR").setOrigin(0);
    let rows = dropdownRows.getChildByName("rows");
    rows.value = defaultGame.rows
    dropdownRows.setScale(Math.max(ratioX, ratioY));
    dropdownRows.addListener("click");
    dropdownRows.on("click", function (e) {
      defaultGame.rows = e.target.value
    }, this) */
    //cols dropdown
    this.colSelect()
    var colsText = this.add.bitmapText(400, 395, 'gothic', 'Cols', 50).setOrigin(0, 1).setTint(0xffffff);

    /*  let dropdownCols = this.add.dom(400, 400).createFromCache("dropdownC").setOrigin(0);
     let cols = dropdownCols.getChildByName("cols");
     cols.value = defaultGame.cols
     dropdownCols.setScale(Math.max(ratioX, ratioY));
     dropdownCols.addListener("click");
     dropdownCols.on("click", function (e) {
       defaultGame.cols = e.target.value
     }, this) */
    // moves dropdown
    this.movesSelect()
    /* let dropdownMoves = this.add.dom(game.config.width / 2 - 200, 1200).createFromCache("dropdownM");
    let moves = dropdownMoves.getChildByName("moves");
    moves.value = defaultGame.movesGoal
    dropdownMoves.setScale(Math.max(ratioX, ratioY));
    dropdownMoves.addListener("click");
    dropdownMoves.on("click", function (e) {
      defaultGame.movesGoal = e.target.value
    }, this) */
    // time dropdown
    this.timeSelect()
    /* let dropdownTime = this.add.dom(game.config.width / 2 + 200, 1200).createFromCache("dropdownT");
    let movesd = dropdownTime.getChildByName("time");
    movesd.value = defaultGame.time
    dropdownTime.setScale(Math.max(ratioX, ratioY));
    dropdownTime.addListener("click");
    dropdownTime.on("click", function (e) {
      defaultGame.time = e.target.value
    }, this) */
    //allow rovers
    var rover = this.add.bitmapText(game.config.width / 2 - 25, 575, 'gothic', 'Rover', 50).setOrigin(1, .5).setTint(0xffffff);
    this.roverSwitch = this.add.image(game.config.width / 2 + 25, 575, 'switch', (this.roverOn) ? 1 : 0).setOrigin(0, .5).setInteractive().setScale(.9)
    this.roverSwitch.on('pointerdown', this.roverToggle, this)
    //allow gems
    var gems = this.add.bitmapText(game.config.width / 2 - 25, 675, 'gothic', 'Gems', 50).setOrigin(1, .5).setTint(0xffffff);
    this.gemSwitch = this.add.image(game.config.width / 2 + 25, 675, 'switch', (this.gemOn) ? 1 : 0).setOrigin(0, .5).setInteractive().setScale(.9)
    this.gemSwitch.on('pointerdown', this.gemToggle, this)
    //allow bomb
    var bombs = this.add.bitmapText(game.config.width / 2 - 25, 775, 'gothic', 'Bombs', 50).setOrigin(1, .5).setTint(0xffffff);
    this.bombSwitch = this.add.image(game.config.width / 2 + 25, 775, 'switch', (this.bombOn) ? 1 : 0).setOrigin(0, .5).setInteractive().setScale(.9)
    this.bombSwitch.on('pointerdown', this.bombToggle, this)
    //allow fire
    var fire = this.add.bitmapText(game.config.width / 2 - 25, 875, 'gothic', 'Fire', 50).setOrigin(1, .5).setTint(0xffffff);
    this.fireSwitch = this.add.image(game.config.width / 2 + 25, 875, 'switch', (this.fireOn) ? 1 : 0).setOrigin(0, .5).setInteractive().setScale(.9)
    this.fireSwitch.on('pointerdown', this.fireToggle, this)
    //allow drop
    var drop = this.add.bitmapText(game.config.width / 2 - 25, 975, 'gothic', 'Drop', 50).setOrigin(1, .5).setTint(0xffffff);
    this.dropSwitch = this.add.image(game.config.width / 2 + 25, 975, 'switch', (this.dropOn) ? 1 : 0).setOrigin(0, .5).setInteractive().setScale(.9)
    this.dropSwitch.on('pointerdown', this.dropToggle, this)

    var startMoves = this.add.bitmapText(game.config.width / 2 - 200, 1100, 'gothic', 'Moves', 70).setOrigin(.5).setTint(0xffffff);
    var playMoves = this.add.image(game.config.width / 2 - 200, 1375, 'play').setTint(0xf7484e).setScale(2).setInteractive()
    playMoves.on('pointerdown', this.clickHandler, this);
    var startTime = this.add.bitmapText(game.config.width / 2 + 200, 1100, 'gothic', 'Time', 70).setOrigin(.5).setTint(0xffffff);
    var playTime = this.add.image(game.config.width / 2 + 200, 1375, 'play').setTint(0xf7484e).setScale(2).setInteractive()

    playTime.on('pointerdown', this.clickHandler2, this);

    var exit = this.add.image(game.config.width / 2, 1550, 'menu_icons', 5).setInteractive()
    exit.on('pointerdown', function () {

      // localStorage.setItem('ringTotal', JSON.stringify(this.ringTotal));
      this.scene.start('startGame');

    }, this);


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
  dropToggle() {
    if (this.dropOn) {
      this.dropOn = false
      defaultGame.allowDrop = this.dropOn

      this.dropSwitch.setFrame(0)
    } else {
      this.dropOn = true
      defaultGame.allowDrop = this.dropOn
      defaultGame.dropStartCount = Phaser.Math.Between(2, 5)
      this.dropSwitch.setFrame(1)
    }
  }
  clickHandler() {
    localStorage.setItem('SD3lb1', JSON.stringify(defaultGame));
    gameMode = 'moves'
    lbFlag = true
    this.scene.stop()
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  clickHandler2() {
    localStorage.setItem('SD3lb1', JSON.stringify(defaultGame));
    gameMode = 'time'
    lbFlag = true
    this.scene.stop()
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  itmeSelect() {
    var less = this.add.bitmapText(90, 435, 'gothic', '< ', 60).setOrigin(.5).setTint(0xcccccc).setInteractive();
    var more = this.add.bitmapText(160, 435, 'gothic', ' >', 60).setOrigin(.5).setTint(0xcccccc).setInteractive();
    var itemSelectText = this.add.bitmapText(125, 435, 'gothic', defaultGame.items, 60).setOrigin(.5).setTint(0xffffff);
    itemSelectText.value = this.itemsArray.indexOf(defaultGame.items)
    less.on('pointerdown', function () {
      defaultGame.items--
      if (defaultGame.items < this.itemsArray[0]) {
        defaultGame.items = this.itemsArray[this.itemsArray.length - 1]
      }
      itemSelectText.setText(defaultGame.items)
    }, this)
    more.on('pointerdown', function () {
      defaultGame.items++
      if (defaultGame.items > this.itemsArray[this.itemsArray.length - 1]) {
        defaultGame.items = this.itemsArray[0]
      }
      itemSelectText.setText(defaultGame.items)
    }, this)
  }
  colSelect() {
    var less = this.add.bitmapText(415, 435, 'gothic', '< ', 60).setOrigin(.5).setTint(0xffffff).setInteractive();
    var more = this.add.bitmapText(485, 435, 'gothic', ' >', 60).setOrigin(.5).setTint(0xffffff).setInteractive();
    var colSelectText = this.add.bitmapText(450, 435, 'gothic', defaultGame.cols, 60).setOrigin(.5).setTint(0xffffff);
    colSelectText.value = this.colsArray.indexOf(defaultGame.cols)
    less.on('pointerdown', function () {
      defaultGame.cols--
      if (defaultGame.cols < this.colsArray[0]) {
        defaultGame.cols = this.colsArray[this.colsArray.length - 1]
      }
      colSelectText.setText(defaultGame.cols)
    }, this)
    more.on('pointerdown', function () {
      defaultGame.cols++
      if (defaultGame.cols > this.colsArray[this.colsArray.length - 1]) {
        defaultGame.cols = this.colsArray[0]
      }
      colSelectText.setText(defaultGame.cols)
    }, this)
  }
  rowsSelect() {
    var less = this.add.bitmapText(700, 435, 'gothic', '< ', 60).setOrigin(.5).setTint(0xffffff).setInteractive();
    var more = this.add.bitmapText(800, 435, 'gothic', ' >', 60).setOrigin(.5).setTint(0xffffff).setInteractive();
    var rowSelectText = this.add.bitmapText(750, 435, 'gothic', defaultGame.rows, 60).setOrigin(.5).setTint(0xffffff);
    rowSelectText.value = this.colsArray.indexOf(defaultGame.rows)
    less.on('pointerdown', function () {
      defaultGame.rows--
      if (defaultGame.rows < this.rowsArray[0]) {
        defaultGame.rows = this.rowsArray[this.rowsArray.length - 1]
      }
      rowSelectText.setText(defaultGame.rows)
    }, this)
    more.on('pointerdown', function () {
      defaultGame.rows++
      if (defaultGame.rows > this.rowsArray[this.rowsArray.length - 1]) {
        defaultGame.rows = this.rowsArray[0]
      }
      rowSelectText.setText(defaultGame.rows)
    }, this)
  }
  movesSelect() {
    var movesIndex = this.movesArray.indexOf(defaultGame.movesGoal)
    var less = this.add.bitmapText(game.config.width / 2 - 255, 1200, 'gothic', '< ', 60).setOrigin(.5).setTint(0xffffff).setInteractive();
    var more = this.add.bitmapText(game.config.width / 2 - 145, 1200, 'gothic', ' >', 60).setOrigin(.5).setTint(0xffffff).setInteractive();
    var movesSelectText = this.add.bitmapText(game.config.width / 2 - 200, 1200, 'gothic', defaultGame.movesGoal, 60).setOrigin(.5).setTint(0xffffff);

    less.on('pointerdown', function () {
      movesIndex--
      if (movesIndex < 0) {
        movesIndex = this.movesArray.length - 1
      }
      defaultGame.movesGoal = this.movesArray[movesIndex]
      movesSelectText.setText(defaultGame.movesGoal)
    }, this)
    more.on('pointerdown', function () {
      movesIndex++
      if (movesIndex == this.movesArray.length) {
        movesIndex = 0
      }
      defaultGame.movesGoal = this.movesArray[movesIndex]
      movesSelectText.setText(defaultGame.movesGoal)
    }, this)
  }
  timeSelect() {
    var timeIndex = this.timeArray.indexOf(defaultGame.time)
    var less = this.add.bitmapText(game.config.width / 2 + 125, 1200, 'gothic', '< ', 60).setOrigin(.5).setTint(0xffffff).setInteractive();
    var more = this.add.bitmapText(game.config.width / 2 + 275, 1200, 'gothic', ' >', 60).setOrigin(.5).setTint(0xffffff).setInteractive();
    var timeSelectText = this.add.bitmapText(game.config.width / 2 + 200, 1200, 'gothic', this.timeClockArray[timeIndex], 60).setOrigin(.5).setTint(0xffffff);

    less.on('pointerdown', function () {
      timeIndex--
      if (timeIndex < 0) {
        timeIndex = this.timeArray.length - 1
      }
      defaultGame.time = this.timeArray[timeIndex]
      timeSelectText.setText(this.timeClockArray[timeIndex])
    }, this)
    more.on('pointerdown', function () {
      timeIndex++
      if (timeIndex == this.timeArray.length) {
        timeIndex = 0
      }
      defaultGame.time = this.timeArray[timeIndex]
      timeSelectText.setText(this.timeClockArray[timeIndex])
    }, this)
  }
}
