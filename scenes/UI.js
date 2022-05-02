let timedEvent
class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {



  }
  create() {
    this.winCount = -1;
    this.winComplete = -10;
    this.movesLeft = 0
    this.header = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0xf7484e).setAlpha(.8);
    this.header.displayWidth = 900;
    this.header.displayHeight = 225;

    this.initialTime = gameOptions.defaultTime
    if (gameMode == 'time') {
      timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
      this.time = this.add.bitmapText(85, 100, 'gothic', this.formatTime(this.initialTime), 110).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);
      this.totalclearedText = this.add.bitmapText(445, 100, 'gothic', '0', 90).setOrigin(0, .5).setTint(0xffffff).setAlpha(1);
      this.levelText = this.add.bitmapText(860, 65, 'gothic', 'Best', 50).setOrigin(1, .5).setTint(0xffffff).setAlpha(1);
      //  this.bestText = this.add.bitmapText(860, 160, 'gothic', gameSettings.mostDotsTime, 50).setOrigin(1, .5).setTint(0xffffff).setAlpha(1);


    } else if (gameMode == 'moves') {
      this.totalMovesText = this.add.bitmapText(85, 100, 'gothic', levelSettings.movesGoal, 100).setOrigin(.5).setTint(0xf5f5f5).setAlpha(1);

      this.totalclearedText = this.add.bitmapText(445, 100, 'gothic', '0', 100).setOrigin(0, .5).setTint(0x000000).setAlpha(1);
      this.levelText = this.add.bitmapText(860, 65, 'gothic', 'Best', 50).setOrigin(1, .5).setTint(0x000000).setAlpha(1);
      //this.bestText = this.add.bitmapText(860, 160, 'gothic', gameSettings.mostDotsMoves, 50).setOrigin(1, .5).setTint(0xffffff).setAlpha(1);

    } else if (gameMode == 'challenge') {
      this.totalMovesText = this.add.bitmapText(95, 100, 'gothic', levels[onLevel].movesGoal, 100).setOrigin(.5).setTint(0xf5f5f5).setAlpha(1);

      var levelBG = this.add.image(game.config.width, game.config.height, 'blank').setOrigin(1).setTint(0x333333).setAlpha(.8)
      levelBG.displayWidth = 150;
      levelBG.displayHeight = 175

      var temp = onLevel + 1;
      this.levelText = this.add.bitmapText(860, 1520, 'gothic', 'L ' + temp, 50).setOrigin(1, .5).setTint(0xf7484e).setAlpha(1);
      this.totalclearedText = this.add.bitmapText(860, 1600, 'gothic', '0', 50).setOrigin(1, .5).setTint(0x4c4f4d).setAlpha(1);
      this.setupGoals();
    }





    var Main = this.scene.get('playGame');
    this.main = Main
    Main.events.on('dots', function (data) {
      var string = data.dots;
      this.dots = data.dots
      //console.log('dots ' + string)
      this.totalclearedText.setText(string)
    }, this);

    Main.events.on('moves', function (data) {
      this.movesLeft = data.moves;

      if (gameMode != 'time') {
        //console.log('goal' + levelSettings.movesGoal + ' left ' + this.movesLeft)
        this.totalMovesText.setText(levelSettings.movesGoal - this.movesLeft)
        if (levelSettings.movesGoal - this.movesLeft < 4) {
          //TweenHelper.flashElement(this, this.totalMovesText);
        }
        if (levelSettings.movesGoal - this.movesLeft == 0) {
          // alert('game over')
          this.scene.pause('playGame');
          this.scene.launch("endGame", { outcome: 0, movesLeft: this.movesLeft, totalRemoved: this.dots });
          this.scene.pause('UI');
        }
      }
    }, this);
    if (gameMode == 'challenge') {
      Main.events.on('tally', function () {

        this.winConditions();

      }, this);
    }
    Main.events.on('resettime', function () {
      this.initialTime = gameOptions.defaultTime
    }, this);
    Main.events.on('addtime', function (data) {
      this.amount = data.amount;
      this.initialTime += this.amount
    }, this);
    Main.events.on('addmoves', function (data) {
      this.movesLeft -= data.amount;

      if (gameMode != 'time') {
        this.totalMovesText.setText(levelSettings.movesGoal - this.movesLeft)
      }
    }, this);


  }

  update() {
    if (gameMode == 'time') {

      if (this.initialTime <= 0) {
        //alert('game over')
        this.scene.pause('playGame');
        this.scene.launch("endGame", { outcome: 1, movesLeft: this.movesLeft, totalRemoved: this.dots });
        this.scene.pause('UI');
        /*  if (appSettings.music) {
           this.main.backgroundMusic.pause()
         } */


      }
    }
  }
  onEvent() {
    this.initialTime -= 1; // One second
    this.time.setText(this.formatTime(this.initialTime));
  }
  formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
  }


  setupGoals() {
    // console.log(levels[onLevel].length);
    //  for (var i = 0; i < levels[onLevel].length; i++) {
    var i = 0;
    var j = 0;
    var x = 0;
    var y = 65;
    this.winCount = 0;
    this.winComplete = 0;
    var xOffsetT = 260
    var xOffsetI = 320
    var xSpace = 220
    var labelSize = 70
    var labelColor = 0x000000
    Object.entries(levels[onLevel].win).forEach(([key, value]) => {



      if (key == 'green') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.greenIcon = this.add.image(xOffsetT + x * xSpace, y, 'circle', 0).setScale(.5).setAlpha(1).setTint(colors[3]);
        this.greenText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);
        this.greenGoal = value;
        this.greenText.setText(value);
        this.greenWin = true;
        this.winCount++;
        i++;
        j++;
      }

      if (key == 'red') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.redIcon = this.add.image(xOffsetT + x * xSpace, y, 'circle', 0).setScale(.5).setAlpha(1).setTint(colors[5]);
        this.redText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);
        this.redGoal = value;
        this.redText.setText(value);
        this.redWin = true;
        this.winCount++;
        i++;
        j++;
      }
      if (key == 'purple') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.purpleIcon = this.add.image(xOffsetT + x * xSpace, y, 'circle', 0).setScale(.5).setAlpha(1).setTint(colors[1]);
        this.purpleText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);

        this.purpleGoal = value;
        this.purpleText.setText(value);
        this.purpleWin = true;
        this.winCount++;
        i++;
        j++;
      }
      if (key == 'orange') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.orangeIcon = this.add.image(xOffsetT + x * xSpace, y, 'circle', 0).setScale(.5).setAlpha(1).setTint(colors[0]);
        this.orangeText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);

        this.orangeGoal = value;
        this.orangeText.setText(value);
        this.orangeWin = true;
        this.winCount++;
        i++;
        j++;

      }
      if (key == 'brown') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.brownIcon = this.add.image(xOffsetT + x * xSpace, y, 'circle', 0).setScale(.5).setAlpha(1).setTint(colors[4]);
        this.brownText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);

        this.brownGoal = value;
        this.brownText.setText(value);
        this.brownWin = true;
        this.winCount++;
        i++;
        j++;

      }
      if (key == 'blue') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.blueIcon = this.add.image(xOffsetT + x * xSpace, y, 'circle', 0).setScale(.5).setAlpha(1).setTint(colors[2]);
        this.blueText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);

        this.blueGoal = value;
        this.blueText.setText(value);
        this.blueWin = true;
        this.winCount++;
        i++;
        j++;

      }

      if (key == 'drop') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.dropIcon = this.add.image(xOffsetT + x * xSpace, y, 'drop').setScale(.5).setAlpha(1).setTint(gameOptions.dropColor);
        this.dropText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);
        this.dropGoal = value;
        this.dropText.setText(value);
        this.dropWin = true;
        this.winCount++;
        i++;
        j++;
      }

      if (key == 'ice') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.iceIcon = this.add.image(xOffsetT + x * xSpace, y, 'ice1').setScale(.5).setAlpha(1);
        this.iceText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);
        this.iceGoal = value;
        this.iceText.setText(value);
        this.iceWin = true;
        this.winCount++;
        i++;
        j++;
      }

      if (key == 'gems') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.bombIcon = this.add.image(xOffsetT + x * xSpace, y, 'gem').setScale(.5).setAlpha(1);
        this.bombText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);
        this.bombGoal = value;
        this.bombText.setText(value);
        this.bombWin = true;
        this.winCount++;
        i++;
        j++;
      }
      if (key == 'square') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.sixIcon = this.add.image(xOffsetT + x * xSpace, y, 'goal_icons', 11).setScale(.5).setAlpha(1);
        this.sixText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);
        this.sixGoal = value;
        this.sixText.setText(value);
        this.sixWin = true;
        this.winCount++;
        i++;
        j++;
      }
      if (key == 'squareBomb') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.squareBombIcon = this.add.image(xOffsetT + x * xSpace, y, 'bomb1').setScale(.5).setAlpha(1);
        this.squareBombText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);
        this.squareBombGoal = value;
        this.squareBombText.setText(value);
        this.squareBombWin = true;
        this.winCount++;
        i++;
        j++;
      }
      if (key == 'rover') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.roverIcon = this.add.image(xOffsetT + x * xSpace, y, 'rover1').setScale(.5).setAlpha(1);
        this.roverText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);
        this.roverGoal = value;
        this.roverText.setText(value);
        this.roverWin = true;
        this.winCount++;
        i++;
        j++;
      }
      if (key == 'bomb') {
        if (i > 2) {
          y = 160;
          x = i - 3;
        } else {
          x = i;
        }
        this.bombIcon = this.add.image(xOffsetT + x * xSpace, y, 'bomb1').setScale(.5).setAlpha(1);
        this.bombText = this.add.bitmapText(xOffsetI + x * xSpace, y, 'gothic', '0', labelSize).setOrigin(0, .5).setTint(labelColor).setAlpha(1);
        this.bombGoal = value;
        this.bombText.setText(value);
        this.bombWin = true;
        this.winCount++;
        i++;
        j++;
      }
      //console.log(key + ' ' + value); // "a 5", "b 7", "c 9"

    });
    // console.log(levelSettings.win[i].thing2);
    //  }






  }
  winConditions() {




    if (this.greenWin) {
      this.greenText.setText(this.greenGoal - this.main.tally.green);
      if (this.main.tally.green >= this.greenGoal) {
        this.tweenCount(this.greenText, this.greenIcon);
        this.greenGoal = -100
        this.winComplete++;
        this.greenWin = false;
      }
    }

    if (this.redWin) {
      this.redText.setText(this.redGoal - this.main.tally.red);
      if (this.main.tally.red >= this.redGoal) {
        this.tweenCount(this.redText, this.redIcon);
        this.redGoal = -100
        this.winComplete++;
        this.redWin = false;
      }
    }
    if (this.purpleWin) {
      this.purpleText.setText(this.purpleGoal - this.main.tally.purple);
      if (this.main.tally.purple >= this.purpleGoal) {
        this.tweenCount(this.purpleText, this.purpleIcon);
        this.purpleGoal = -100
        this.winComplete++;
        this.purpleWin = false;
      }
    }
    if (this.orangeWin) {
      this.orangeText.setText(this.orangeGoal - this.main.tally.orange);
      if (this.main.tally.orange >= this.orangeGoal) {
        this.tweenCount(this.orangeText, this.orangeIcon);
        this.orangeGoal = -100
        this.winComplete++;
        this.orangeWin = false;
      }
    }
    if (this.brownWin) {
      this.brownText.setText(this.brownGoal - this.main.tally.brown);
      if (this.main.tally.brown >= this.brownGoal) {
        this.tweenCount(this.brownText, this.brownIcon);
        this.brownGoal = -100
        this.winComplete++;
        this.brownWin = false;
      }
    }
    if (this.blueWin) {
      this.blueText.setText(this.blueGoal - this.main.tally.blue);
      if (this.main.tally.blue >= this.blueGoal) {
        this.tweenCount(this.blueText, this.blueIcon);
        this.blueGoal = -100
        this.winComplete++;
        this.blueWin = false;
      }
    }
    if (this.dropWin) {
      this.dropText.setText(this.dropGoal - this.main.tally.drop);
      if (this.main.tally.drop >= this.dropGoal) {
        this.tweenCount(this.dropText, this.dropIcon);
        this.dropGoal = -100
        this.winComplete++;
        this.dropWin = false;
      }
    }
    if (this.iceWin) {
      this.iceText.setText(this.iceGoal - this.main.tally.ice);
      if (this.main.tally.ice >= this.iceGoal) {
        this.tweenCount(this.iceText, this.iceIcon);
        this.iceGoal = -100
        this.winComplete++;
        this.iceWin = false;
      }
    }
    if (this.bombWin) {
      this.bombText.setText(this.bombGoal - this.main.tally.bomb);
      if (this.main.tally.bomb >= this.bombGoal) {
        this.tweenCount(this.bombText, this.bombIcon);
        this.bombGoal = -100
        this.winComplete++;
        this.bombWin = false;
      }
    }
    if (this.sixWin) {
      this.sixText.setText(this.sixGoal - this.main.tally.square);
      if (this.main.tally.square >= this.sixGoal) {
        this.tweenCount(this.sixText, this.sixIcon);
        this.sixGoal = -100
        this.winComplete++;
        this.sixWin = false;
      }
    }
    if (this.squareBombWin) {
      this.squareBombText.setText(this.squareBombGoal - tally.squareBomb);
      if (tally.squareBomb >= this.squareBombGoal) {
        this.tweenCount(this.squareBombText, this.squareBombIcon);
        this.squareBombGoal = -100
        this.winComplete++;
        this.squareBombWin = false;
      }
    }
    if (this.roverWin) {
      this.roverText.setText(this.roverGoal - this.main.tally.rover);
      if (this.main.tally.rover >= this.roverGoal) {
        this.tweenCount(this.roverText, this.roverIcon);
        this.roverGoal = -100
        this.winComplete++;
        this.roverWin = false;
      }
    }
    if (this.winCount == this.winComplete) {
      // return true;
      //console.log('you win');
      //this.scene.start("start");
      //this.scene.stop('PlayGame');
      var time = this.time.addEvent({
        delay: 1500,
        callback: function () {
          // alert('You won!')
          this.scene.pause('playGame');
          this.scene.launch("endGame", { outcome: 1, movesLeft: levelSettings.movesGoal - this.movesLeft, level: onLevel });
          this.scene.pause('UI');
          /* if (appSettings.music) {
            this.main.backgroundMusic.pause()
          } */
        },
        callbackScope: this
      })

    } else {
      // return false;
    }
  }
  tweenCount(count, icon) {
    var cx = count.x;
    var cy = count.y;
    var tween = this.tweens.add({
      targets: count,
      y: '-= 75',
      alpha: 0,
      duration: 300,
      onCompleteScope: this,
      onComplete: function () {
        this.damageEmit(cx, cy);
        var check = this.add.image(cx, cy, 'check').setOrigin(0, .5).setScale(.4).setAlpha(0).setTint(0x62cc7e);
        var tweencheck = this.tweens.add({
          targets: check,
          alpha: 1,
          duration: 300,
        })
      }
    });
    var tweenicon = this.tweens.add({
      targets: icon,
      // alpha:0,
      scale: 1,
      duration: 200,
      yoyo: true
    })


  }

  onEvent() {
    this.initialTime -= 1; // One second
    this.time.setText(this.formatTime(this.initialTime));
  }
  damageEmit(objX, objY) {
    var particlesColor = this.add.particles("particle_color");
    //.setTint(0x7d1414);
    var emitter = particlesColor.createEmitter({
      // particle speed - particles do not move
      // speed: 1000,
      frame: { frames: [0, 1, 2, 3], cycle: true },

      speed: {
        min: -500,
        max: 500
      },
      // particle scale: from 1 to zero
      scale: {
        start: 4,
        end: 0
      },
      // particle alpha: from opaque to transparent
      alpha: {
        start: 1,
        end: 1
      },
      // particle frequency: one particle every 100 milliseconds
      frequency: 50,
      // particle lifespan: 1 second
      lifespan: 1000
    });
    //emitter.tint.onChange(0x7d1414);
    emitter.explode(40, objX, objY);

  }


}