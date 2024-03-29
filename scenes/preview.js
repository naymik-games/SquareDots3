class previewGame extends Phaser.Scene {
  constructor() {
    super("previewGame");
  }
  preload() {



  }
  init(data) {
    this.level = data.level;
    this.group = data.group

  }
  create() {
    //this.cameras.main.setBackgroundColor(0xf7eac6);
    var timedEvent = this.time.addEvent({ delay: 300, callback: this.showPreview, callbackScope: this, loop: false });

    this.previewBox = this.add.container(1000, 0);
    var background = this.add.image(450, 820, 'modal');
    this.previewBox.add(background);
    var temp = this.level + 1;
    var titleText = this.add.bitmapText(450, 475, 'gothic', 'Level ' + temp, 90).setOrigin(.5).setTint(0xffffff).setAlpha(1);
    this.previewBox.add(titleText);
    var movesText = this.add.bitmapText(450, 925, 'gothic', 'Moves ' + levels[onLevel].movesGoal, 70).setOrigin(.5).setTint(0xf7484e).setAlpha(1);
    this.previewBox.add(movesText);
    this.setupGoals();


    var playText = this.add.bitmapText(625, 1153, 'gothic', 'PLAY', 80).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    this.previewBox.add(playText);
    //var cancelText = this.add.bitmapText(175,1150, 'gothic', '[ X ]', 50).setOrigin(.5).setTint(0x000000).setAlpha(1).setInteractive();
    var cancelIcon = this.add.image(760, 450, 'menu_icons', 2).setInteractive().setScale(.8);
    this.previewBox.add(cancelIcon);

    playText.on('pointerdown', this.play, this);
    cancelIcon.on('pointerdown', this.cancel, this);


  }
  showPreview() {
    var tween = this.tweens.add({
      targets: this.previewBox,
      duration: 500,
      x: 0,
      ease: 'bounce'
    })
  }
  play() {
    onLevel = this.level;
    onGroup = this.group;
    gameMode = 'challenge'
    this.scene.stop();
    this.scene.stop('selectGame')
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  cancel() {
    this.scene.resume('selectGame');
    this.scene.stop();
  }


  setupGoals() {
    // console.log(levels[onLevel].length);
    //  for (var i = 0; i < levels[onLevel].length; i++) {
    var i = 0;
    var j = 0;
    var x = 0;
    var y = 675;

    Object.entries(levels[onLevel].win).forEach(([key, value]) => {

      if (key == 'green') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.greenIcon = this.add.image(220 + x * 200, y, 'circle').setScale(.5).setAlpha(1).setTint(colors[3]);
        this.greenText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);
        this.greenGoal = value;
        this.greenText.setText(value);
        this.previewBox.add(this.greenIcon);
        this.previewBox.add(this.greenText);
        i++;
        j++;
      }

      if (key == 'red') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.redIcon = this.add.image(220 + x * 200, y, 'circle').setScale(.5).setAlpha(1).setTint(colors[5]);
        this.redText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);
        this.redGoal = value;
        this.redText.setText(value);
        this.previewBox.add(this.redIcon);
        this.previewBox.add(this.redText);
        i++;
        j++;
      }
      if (key == 'purple') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.purpleIcon = this.add.image(220 + x * 200, y, 'circle').setScale(.5).setAlpha(1).setTint(colors[1]);
        this.purpleText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);

        this.purpleGoal = value;
        this.purpleText.setText(value);
        this.previewBox.add(this.purpleIcon);
        this.previewBox.add(this.purpleText);
        i++;
        j++;
      }
      if (key == 'orange') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.orangeIcon = this.add.image(220 + x * 200, y, 'circle').setScale(.5).setAlpha(1).setTint(colors[0]);
        this.orangeText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);

        this.orangeGoal = value;
        this.orangeText.setText(value);
        this.previewBox.add(this.orangeIcon);
        this.previewBox.add(this.orangeText);
        i++;
        j++;

      }
      if (key == 'brown') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.brownIcon = this.add.image(220 + x * 200, y, 'circle').setScale(.5).setAlpha(1).setTint(colors[4]);
        this.brownText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);

        this.brownGoal = value;
        this.brownText.setText(value);
        this.previewBox.add(this.brownIcon);
        this.previewBox.add(this.brownText);
        i++;
        j++;

      }
      if (key == 'blue') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.blueIcon = this.add.image(220 + x * 200, y, 'circle').setScale(.5).setAlpha(1).setTint(colors[2]);
        this.blueText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);

        this.blueGoal = value;
        this.blueText.setText(value);
        this.previewBox.add(this.blueIcon);
        this.previewBox.add(this.blueText);
        i++;
        j++;

      }

      if (key == 'drop') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.dropIcon = this.add.image(220 + x * 200, y, 'drop').setScale(.5).setAlpha(1).setTint(gameOptions.dropColor);
        this.dropText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);
        this.dropGoal = value;
        this.dropText.setText(value);
        this.previewBox.add(this.dropIcon);
        this.previewBox.add(this.dropText);
        i++;
        j++;
      }

      if (key == 'ice') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.iceIcon = this.add.image(220 + x * 200, y, 'ice1').setScale(.5).setAlpha(1).setTint(gameOptions.iceColor);
        this.iceText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);
        this.iceGoal = value;
        this.iceText.setText(value);
        this.previewBox.add(this.iceIcon);
        this.previewBox.add(this.iceText);
        i++;
        j++;
      }

      if (key == 'gem') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.gemIcon = this.add.image(220 + x * 200, y, 'gem').setScale(.5).setAlpha(1).setTint(0xb8b8b8);
        this.gemText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);
        this.gemGoal = value;
        this.gemText.setText(value);
        this.previewBox.add(this.gemIcon);
        this.previewBox.add(this.gemText);
        i++;
        j++;
      }
      if (key == 'square') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.squareIcon = this.add.image(220 + x * 200, y, 'square').setScale(.5).setAlpha(1).setTint(0xb8b8b8);
        this.squareText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);
        this.squareGoal = value;
        this.squareText.setText(value);
        this.previewBox.add(this.squareIcon);
        this.previewBox.add(this.squareText);
        i++;
        j++;
      }
      if (key == 'squareBomb') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.squareBombIcon = this.add.image(220 + x * 200, y, 'squareBomb', 1).setScale(.7).setAlpha(1);
        this.squareBombText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);
        this.squareBombGoal = value;
        this.squareBombText.setText(value);
        this.previewBox.add(this.squareBombIcon);
        this.previewBox.add(this.squareBombText);
        i++;
        j++;
      }

      if (key == 'rover') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.roverIcon = this.add.image(220 + x * 200, y, 'rover1').setScale(.5).setAlpha(1).setTint(0xb8b8b8);
        this.roverText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);
        this.roverGoal = value;
        this.roverText.setText(value);
        this.previewBox.add(this.roverIcon);
        this.previewBox.add(this.roverText);
        i++;
        j++;
      }

      if (key == 'bomb') {
        if (i > 2) {
          y = 760;
          x = i - 3;
        } else {
          x = i;
        }
        this.bombIcon = this.add.image(220 + x * 200, y, 'bomb1').setScale(.5).setAlpha(1).setTint(gameOptions.bombColor);
        this.bombText = this.add.bitmapText(280 + x * 200, y, 'gothic', '0', 70).setOrigin(0, .5).setTint(0xf7484e).setAlpha(1);
        this.bombGoal = value;
        this.bombText.setText(value);
        this.previewBox.add(this.bombIcon);
        this.previewBox.add(this.bombText);

        i++;
        j++;
      }
      //console.log(key + ' ' + value); // "a 5", "b 7", "c 9"

    });
    // console.log(levelOptions.win[i].thing2);
    //  }






  }





}

