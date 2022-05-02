menuOptions = {
  colors: ["0xffffff", "0xff0000", "0x00ff00", "0x0000ff", "0xffff00"],
  pages: 5,
  columns: 3,
  rows: 4,
  thumbWidth: 250,
  thumbHeight: 250,
  spacing: 20,
  localStorageName: "levelselect"
}
class selectGame extends Phaser.Scene {
  constructor() {
    super("selectGame");
  }
  preload() {
    this.load.spritesheet("levelthumb", "assets/sprites/select_icons.png", {
      frameWidth: 300,
      frameHeight: 300
    });
    this.load.image("levelpages", "assets/sprites/levelpages.png");
    this.load.image("transp", "assets/sprites/transp.png");
  }
  create() {
    menuOptions.pages = groups.length

    /* var back = this.add.image(0, 0, 'select_back').setOrigin(0)
    back.displayWidth = 900
    back.displayHeight = 1640 */
    this.stars = [];
    this.stars[0] = 0;
    this.canMove = true;
    this.itemGroup = this.add.group();
    for (var l = 1; l < menuOptions.columns * menuOptions.rows * menuOptions.pages; l++) {
      this.stars[l] = -1;
    }
    //this.savedData = localStorage.getItem(menuOptions.localStorageName) == null ? this.stars.toString() : localStorage.getItem(menuOptions.localStorageName);
    //this.stars = this.savedData.split(",");
    this.currentPage = onGroup;
    this.pageText = this.add.bitmapText(game.config.width / 2, 75, 'gothic', groups[onGroup].title + " (1 / " + menuOptions.pages + ")", 80).setOrigin(.5).setTint(0xffffff).setAlpha(1);


    this.pageText.setOrigin(0.5);
    this.scrollingMap = this.add.tileSprite(0, 0, menuOptions.pages * game.config.width, game.config.height, "transp");
    this.scrollingMap.setInteractive();
    this.input.setDraggable(this.scrollingMap);
    this.scrollingMap.setOrigin(0, 0);

    this.pageSelectors = [];
    var rowLength = menuOptions.thumbWidth * menuOptions.columns + menuOptions.spacing * (menuOptions.columns - 1);
    var leftMargin = (game.config.width - rowLength) / 2 + menuOptions.thumbWidth / 2;
    var colHeight = menuOptions.thumbHeight * menuOptions.rows + menuOptions.spacing * (menuOptions.rows - 1);
    var topMargin = (game.config.height - colHeight) / 2 + menuOptions.thumbHeight / 2;
    for (var k = 0; k < menuOptions.pages; k++) {
      for (var i = 0; i < menuOptions.columns; i++) {
        for (var j = 0; j < menuOptions.rows; j++) {
          var thumb = this.add.image(k * game.config.width + leftMargin + i * (menuOptions.thumbWidth + menuOptions.spacing), topMargin + j * (menuOptions.thumbHeight + menuOptions.spacing), "levelthumb");
          thumb.displayWidth = 250;
          thumb.displayHeight = 250;
          //thumb.setTint(menuOptions.colors[k]);
          thumb.levelNumber = k * (menuOptions.rows * menuOptions.columns) + j * menuOptions.columns + i;
          //console.log(gameData.levelStatus[thumb.levelNumber - 1])
          thumb.setFrame(this.getFrame(gameData.levelStatus[thumb.levelNumber]));
          this.itemGroup.add(thumb);

          var levelText = this.add.bitmapText(thumb.x, thumb.y - 60, 'gothic', thumb.levelNumber + 1, 100).setOrigin(.5).setTint(0x000000).setAlpha(1);

          this.itemGroup.add(levelText);
        }
      }
      this.pageSelectors[k] = this.add.sprite(game.config.width / 2 + (k - Math.floor(menuOptions.pages / 2) + 0.5 * (1 - menuOptions.pages % 2)) * 40, game.config.height - 190, "levelpages");
      this.pageSelectors[k].setInteractive();
      this.pageSelectors[k].on("pointerdown", function () {
        if (this.scene.canMove) {
          var difference = this.pageIndex - this.scene.currentPage;
          this.scene.changePage(difference);
          this.scene.canMove = false;
        }
      });
      this.pageSelectors[k].pageIndex = k;
      this.pageSelectors[k].tint = menuOptions.colors[k];
      if (k == this.currentPage) {
        this.pageSelectors[k].scaleY = 1;
      }
      else {
        this.pageSelectors[k].scaleY = 0.5;
      }
    }
    this.input.on("dragstart", function (pointer, gameObject) {
      gameObject.startPosition = gameObject.x;
      gameObject.currentPosition = gameObject.x;
    });
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      if (dragX <= 10 && dragX >= -gameObject.width + game.config.width - 10) {
        gameObject.x = dragX;
        var delta = gameObject.x - gameObject.currentPosition;
        gameObject.currentPosition = dragX;
        this.itemGroup.children.iterate(function (item) {
          item.x += delta;
        });
      }
    }, this);
    this.input.on("dragend", function (pointer, gameObject) {
      this.canMove = false;
      var delta = gameObject.startPosition - gameObject.x;
      if (delta == 0) {
        this.canMove = true;
        this.itemGroup.children.iterate(function (item) {
          if (item.texture.key == "levelthumb") {
            var boundingBox = item.getBounds();
            if (Phaser.Geom.Rectangle.Contains(boundingBox, pointer.x, pointer.y) && item.frame.name > 0) {
              onLevel = item.levelNumber
              levelSettings = levels[onLevel]
              this.scene.pause()
              this.scene.launch('previewGame', { level: onLevel, group: this.currentPage });
              //this.scene.start("PlayGame");
              //this.scene.launch('UI')
            }
          }
        }, this);
      }
      if (delta > game.config.width / 8) {
        this.changePage(1);
      }
      else {
        if (delta < -game.config.width / 8) {
          this.changePage(-1);
        }
        else {
          this.changePage(0);
        }
      }
    }, this);
    //this.changePage(3)
    var backIcon = this.add.image(game.config.width / 2, 1550, 'menu_icons', 5).setInteractive()
    backIcon.on('pointerdown', function () {
      this.scene.stop()
      this.scene.start('startGame')
    }, this)
  }
  changePage(page) {
    this.currentPage += page;
    for (var k = 0; k < menuOptions.pages; k++) {
      if (k == this.currentPage) {
        this.pageSelectors[k].scaleY = 1;
      }
      else {
        this.pageSelectors[k].scaleY = 0.5;
      }
    }
    this.pageText.text = "Groups (" + (this.currentPage + 1).toString() + " / " + menuOptions.pages + ")";
    var currentPosition = this.scrollingMap.x;
    this.tweens.add({
      targets: this.scrollingMap,
      x: this.currentPage * -game.config.width,
      duration: 300,
      ease: "Cubic.easeOut",
      callbackScope: this,
      onUpdate: function (tween, target) {
        var delta = target.x - currentPosition;
        currentPosition = target.x;
        this.itemGroup.children.iterate(function (item) {
          item.x += delta;
        });
      },
      onComplete: function () {
        this.canMove = true;
      }
    });
  }
  getFrame(val) {
    var frame
    if (val == -1) {
      frame = 0
    } else if (val == 0) {
      frame = 1
    } else if (val == 1) {
      frame = 2
    } else if (val == 2) {
      frame = 3
    } else if (val == 3) {
      frame = 4
    }
    return frame
  }
}