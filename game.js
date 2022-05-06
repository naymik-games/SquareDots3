let game;

var deltas = [
  [-1, 0],// up
  [0, 1], // right
  [1, 0], // down
  [0, -1] // left
];

window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },
    dom: {
      createContainer: true
    },
    scene: [preloadGame, startGame, selectGame, previewGame, playGame, UI, levelBuilder, endGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {


  }
  create() {


    //var colors = [0xDC5639, 0x823957, 0x436475, 0x5FA34C, 0xFBBD4E];
    this.tally = null
    this.tally = {
      red: 0,
      blue: 0,
      green: 0,
      orange: 0,
      brown: 0,
      purple: 0,
      square: 0,
      moves: 0,
      drop: 0,
      gem: 0,
      rover: 0,
      bomb: 0,
      ice: 0,
      dots: 0
    }
    if (gameMode == 'challenge') {
      if (lbFlag) {
        levelSettings = defaultGame
      } else {
        levelSettings = levels[onLevel]
      }

    } else {
      levelSettings = defaultGame
    }
    this.cameras.main.setBackgroundColor(0x000000);
    this.poolArray = []
    this.dotSize = 110
    this.spriteSize = 75
    this.cols = levelSettings.cols;
    this.rows = levelSettings.rows
    this.xOffset = (game.config.width - (this.cols * this.dotSize)) / 2
    this.yOffset = 250
    this.canPick = true
    this.dragging = false
    this.items = levelSettings.items
    this.selectAlpha = .6
    this.removeSpeed = 200
    this.fallSpeed = 100
    this.startAllColor = false
    this.startOneDot = false
    this.startBombPU = false
    this.startPaintPU = false
    this.startShufflePU = false
    this.b = new Board(this.rows, this.cols, this.items);
    this.e = new Extra(this.rows, this.cols, this.items)
    //console.log(this.e.extra)
    this.squareBox = this.add.graphics();
    this.squareBox.lineStyle(10, 0x00ff00, 1);
    this.squareBox.fillStyle(0x000000, 0);
    this.drawBoard()
    this.drawExtra()
    this.graphics = this.add.graphics({
      lineStyle: {
        width: 10,
        color: 0xffffff,
        alpha: 1
      }
    });
    const config1 = {
      key: 'burst1',
      frames: 'burst',
      frameRate: 20,
      repeat: 0
    };
    this.anims.create(config1);
    this.bursts = this.add.group({
      defaultKey: 'burst',
      maxSize: 30
    });
    this.input.on("pointerdown", this.gemSelect, this);
    this.input.on("pointermove", this.drawPath, this);
    this.input.on("pointerup", this.endDrag, this);
    this.makeMenu()
    this.makePowerUp()
    /* for (var i = 0; i < colors.length; i++) {
      var tile = this.add.image(75 + i * 150, 1500, 'circle').setTint(colors[i])
    } */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);


  }
  update() {

  }
  drawBoard() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        let posX = this.xOffset + this.dotSize * j + this.dotSize / 2;
        let posY = this.yOffset + this.dotSize * i + this.dotSize / 2
        if (this.b.board[i][j].value <= 5) {
          var cir = this.add.image(posX, posY, 'circle').setTint(colors[this.b.board[i][j].value])
          this.b.board[i][j].type = 'dot'
        } else if (this.b.board[i][j].value == gameOptions.dropValue) {
          var cir = this.add.image(posX, posY, 'drop').setTint(gameOptions.dropColor)
          this.b.board[i][j].type = 'drop'
        } else if (this.b.board[i][j].value == gameOptions.gemValue) {
          var ran = Math.floor(Math.random() * this.items)
          var cir = this.add.image(posX, posY, 'gem').setTint(colors[ran])
          this.b.board[i][j].type = 'gem'
          this.b.board[i][j].gemColor = ran
        } else if (this.b.board[i][j].value == gameOptions.roverValue) {
          var ran = Math.floor(Math.random() * this.items)
          var cir = this.add.image(posX, posY, 'rover1').setTint(colors[ran])
          this.b.board[i][j].value = ran
          this.b.board[i][j].isRover = true
          this.b.board[i][j].roverDir = Phaser.Math.Between(0, 3)
          this.b.board[i][j].type = 'rover'
        } else if (this.b.board[i][j].value == gameOptions.fireValue) {
          var ran = Math.floor(Math.random() * this.items)
          var cir = this.add.image(posX, posY, 'fire').setTint(0xff0000)
          this.b.board[i][j].type = 'fire'
        } else if (this.b.board[i][j].value == gameOptions.wildValue) {
          this.b.board[i][j].type = 'wild'
          var cir = this.add.image(posX, posY, 'bomb1').setTint(gameOptions.wildColor)

        }

        cir.displayWidth = this.spriteSize
        cir.displayHeight = this.spriteSize
        this.b.board[i][j].image = cir

      }
    }
  }
  drawExtra() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.e.valueAt(i, j) == gameOptions.blockValue) {
          let posX = this.xOffset + this.dotSize * j + this.dotSize / 2;
          let posY = this.yOffset + this.dotSize * i + this.dotSize / 2;
          var cir = this.add.image(posX, posY, 'block')
          cir.displayWidth = this.spriteSize + 20
          cir.displayHeight = this.spriteSize + 20

          this.e.extra[i][j].type = 'block',
            this.e.extra[i][j].image = cir
        }

        if (this.e.valueAt(i, j) == gameOptions.bombValue) {
          let posX = this.xOffset + this.dotSize * j + this.dotSize / 2;
          let posY = this.yOffset + this.dotSize * i + this.dotSize / 2;
          var cir = this.add.image(posX, posY, 'bomb1').setTint(gameOptions.bombColor)
          cir.displayWidth = this.spriteSize + 20
          cir.displayHeight = this.spriteSize + 20

          this.e.extra[i][j].type = 'bomb',
            this.e.extra[i][j].image = cir
        }
        if (this.e.valueAt(i, j) == gameOptions.iceValue) {
          let posX = this.xOffset + this.dotSize * j + this.dotSize / 2;
          let posY = this.yOffset + this.dotSize * i + this.dotSize / 2;
          var cir = this.add.image(posX, posY, 'ice1').setTint(gameOptions.iceColor)
          cir.displayWidth = this.spriteSize + 20
          cir.displayHeight = this.spriteSize + 20

          this.e.extra[i][j].type = 'ice',
            this.e.extra[i][j].image = cir
        }
      }
    }

  }
  gemSelect(pointer) {
    if (pointer.y > this.yOffset + this.rows * this.dotSize) { return }
    this.isSpecial = false
    this.pathValue = null
    this.square = false
    this.lineArray = []
    this.bombToExplode = []
    this.stopFire = false
    if (this.canPick) {
      let row = Math.floor((pointer.y - this.yOffset) / this.dotSize);
      let col = Math.floor((pointer.x - this.xOffset) / this.dotSize);
      if (this.startOneDot) {
        if (this.b.board[row][col].type != 'dot') { return }
        gameData.money -= 1
        this.events.emit('removeMoney', { amount: 1 })
        this.dragging = true
        this.isSpecial = true
        this.pathDots = [{ row: row, col: col }]
        this.b.board[row][col].image.setAlpha(this.selectAlpha)
        this.oneDot.clearTint()
        this.explode(row, col)
        this.startOneDot = false
        //this.removeGems()
        //this.removeOne(row, col)
        return
      }
      if (this.startAllColor) {
        if (this.b.board[row][col].type != 'dot') { return }
        gameData.money -= 2
        this.events.emit('removeMoney', { amount: 2 })
        this.dragging = true
        this.isSpecial = true
        this.pathDots = this.b.findAll(this.valueAt(row, col))
        this.highlightAll()
        this.allColor.clearTint()
        this.explode(row, col)
        this.startAllColor = false
        //this.removeGems()
        //this.removeOne(row, col)
        return
      }
      if (this.startBombPU) {
        if (this.b.board[row][col].type != 'dot') { return }
        gameData.money -= 3
        this.events.emit('removeMoney', { amount: 3 })
        this.dragging = true
        this.isSpecial = true
        this.explodeBomb(row, col)

        this.bombPU.clearTint()

        this.startBombPU = false
        //this.removeGems()
        //this.removeOne(row, col)
        return
      }
      if (this.startPaintPU) {
        if (this.b.board[row][col].type != 'dot') { return }
        gameData.money -= 5
        this.events.emit('removeMoney', { amount: 5 })
        this.dragging = true
        this.isSpecial = true
        let dots = this.b.findAllDots()
        dots.forEach(function (dot) {
          this.b.board[dot.row][dot.col].value = this.b.board[row][col].value
          this.b.board[dot.row][dot.col].image.setTint(colors[this.b.board[row][col].value])
        }.bind(this));
        this.explode(row, col)

        this.paintPU.clearTint()

        this.startPaintPU = false
        //this.removeGems()
        //this.removeOne(row, col)
        return
      }
      if (this.startShufflePU) {
        if (this.b.board[row][col].type != 'dot') { return }
        gameData.money -= 4
        this.events.emit('removeMoney', { amount: 4 })
        this.dragging = true
        this.isSpecial = true
        this.b.findAllDotValues()


        this.shufflePU.clearTint()

        this.startShufflePU = false
        //this.removeGems()
        //this.removeOne(row, col)
        return
      }
      //let row = Math.floor((pointer.y - this.yOffset) / this.dotSize);
      //let col = Math.floor((pointer.x - this.xOffset) / this.dotSize);
      // console.log(this.b.board[row][col])
      if (this.b.valid(row, col) && !this.b.isNonSelect(this.b.board[row][col].value, this.e.extra[row][col].value)) {
        this.dragging = true;
        this.pathDots = [{ row: row, col: col }]
        this.b.board[row][col].image.setAlpha(this.selectAlpha)
        //console.log(this.pathDots)
      }
    }
  }
  drawPath(pointer) {
    if (this.startOneDot || this.startAllColor) { return }
    if (this.dragging) {
      let row = Math.floor((pointer.y - this.yOffset) / this.dotSize);
      let col = Math.floor((pointer.x - this.xOffset) / this.dotSize);
      var newDot = { row: row, col: col }
      var current = this.pathDots[this.pathDots.length - 1];
      if (!this.b.valid(row, col) || this.b.isNonSelect(this.b.board[row][col].value, this.e.extra[row][col].value)) { return }
      if (!this.connects(current, newDot)) return;
      //backtrack
      if (this.pathDots.length > 1) {
        var previous = this.pathDots[this.pathDots.length - 2];
        if (this.isSame(newDot, previous)) {
          var dot = this.pathDots.pop();
          this.b.board[dot.row][dot.col].image.setAlpha(1)
          /* var line = this.lineArray.pop()
          line.setAlpha(0) */
          // drawLine();
          return;
        }
      }
      //square
      if (this.inPath(newDot)) {
        var line = new Phaser.Geom.Line(this.b.board[current.row][current.col].image.x, this.b.board[current.row][current.col].image.y, this.b.board[row][col].image.x, this.b.board[row][col].image.y);
        this.graphics.lineStyle(10, colors[this.b.board[current.row][current.col].value], 1);
        this.graphics.strokeLineShape(line);
        this.graphics.fillPointShape(line.getPointA(), 20);
        this.graphics.fillStyle(colors[this.b.board[current.row][current.col].value]);
        this.graphics.fillPointShape(line.getPointB(), 20);
        this.lineArray.push(line)
        this.square = true
        this.pathDots = this.b.findAll(this.valueAt(this.pathDots[0].row, this.pathDots[0].col))
        this.highlightAll()
        this.squareBox.lineStyle(10, colors[this.valueAt(this.pathDots[0].row, this.pathDots[0].col)], 1);
        this.squareBox.fillStyle(colors[this.valueAt(this.pathDots[0].row, this.pathDots[0].col)], .2);
        this.squareBox.strokeRoundedRect(this.xOffset - 5, this.yOffset - 5, (this.dotSize * this.cols) + 10, (this.dotSize * this.rows + 10), 15);
        this.squareBox.fillRoundedRect(this.xOffset - 5, this.yOffset - 5, (this.dotSize * this.cols) + 10, (this.dotSize * this.rows + 10), 15);
        return;
      }

      //new
      this.b.board[row][col].image.setAlpha(this.selectAlpha)
      var line = new Phaser.Geom.Line(this.b.board[current.row][current.col].image.x, this.b.board[current.row][current.col].image.y, this.b.board[row][col].image.x, this.b.board[row][col].image.y);
      this.graphics.lineStyle(10, colors[this.b.board[current.row][current.col].value], 1);
      this.graphics.strokeLineShape(line);
      this.graphics.fillPointShape(line.getPointA(), 20);
      this.graphics.fillStyle(colors[this.b.board[current.row][current.col].value]);
      this.graphics.fillPointShape(line.getPointB(), 20);
      this.lineArray.push(line)

      this.pathDots.push(newDot)
    }
  }
  endDrag() {
    if (this.dragging) {
      if (this.pathDots.length < 2) {

      } else {
        this.tally.moves++

      }
      if (this.square) {
        //this.squareBack.setAlpha(0)
        //this.tally.square++
        this.squareBox.clear()
      }
      this.removeGems()
    }

  }
  removeGems() {
    this.roverExplode = []
    if (this.isSpecial) {
      var num = 0
    } else {
      var num = 1
    }
    this.graphics.clear()
    if (this.dragging) {
      this.canPick = false;
      if (this.pathDots.length > num) {
        this.pathValue = this.b.board[this.pathDots[0].row][this.pathDots[0].col].value
        if (this.square) {
          //console.log('square')

          //console.log(all)
        }
        var results = this.b.remove(this.pathDots);

        this.tallyResults(results)

        let destroyed = 0
        results.forEach(function (pos) {
          var valExtra = this.e.valueAt(pos.row, pos.col)

          if (valExtra != null) {
            if (valExtra == gameOptions.bombValue) {
              this.e.extra[pos.row][pos.col].strength--
              if (this.e.extra[pos.row][pos.col].strength == 2) {
                this.e.extra[pos.row][pos.col].image.setTexture('bomb3')
              } else if (this.e.extra[pos.row][pos.col].strength == 1) {
                this.e.extra[pos.row][pos.col].image.setTexture('bomb2')
              } else if (this.e.extra[pos.row][pos.col].strength == 0) {
                //this.explodeBomb(pos.row, pos.col)
                this.bombToExplode.push({ row: pos.row, col: pos.col })
                var tween = this.tweens.add({
                  targets: this.e.extra[pos.row][pos.col].image,
                  duration: 400,
                  alpha: 0,
                  y: -50,
                  onCompleteScope: this,
                  onComplete: function () {
                    this.e.setEmptyExtra(pos.row, pos.col)
                    this.tally.bomb++
                  }
                })
              }

            } else if (valExtra == gameOptions.iceValue) {
              this.e.extra[pos.row][pos.col].strength--
              if (this.e.extra[pos.row][pos.col].strength == 2) {
                this.e.extra[pos.row][pos.col].image.setTexture('ice2')
              } else if (this.e.extra[pos.row][pos.col].strength == 1) {
                this.e.extra[pos.row][pos.col].image.setTexture('ice3')
              } else if (this.e.extra[pos.row][pos.col].strength == 0) {
                //this.explodeBomb(pos.row, pos.col)

                var tween = this.tweens.add({
                  targets: this.e.extra[pos.row][pos.col].image,
                  duration: 400,
                  alpha: 0,
                  y: -50,
                  onCompleteScope: this,
                  onComplete: function () {
                    this.e.setEmptyExtra(pos.row, pos.col)
                    this.tally.ice++
                  }
                })
              }

            }
          }
          if (pos.rover) {

            this.tally.rover++
            this.roverExplode.push(pos)
          }
          if (this.b.isNeighborFire(pos.row, pos.col)) {
            this.stopFire = true
          }
          //console.log(this.stopFire)
          this.poolArray.push(this.b.board[pos.row][pos.col].image)
          destroyed++;
          this.tweens.add({
            targets: this.b.board[pos.row][pos.col].image,
            alpha: 0,
            duration: this.removeSpeed,
            callbackScope: this,
            onComplete: function (event, sprite) {
              destroyed--;
              if (destroyed == 0) {
                this.makeDotsFall();
              }
            }
          });

        }.bind(this));


        //draw(b.data());
      } else {
        //console.log(this.pathDots)
        this.b.board[this.pathDots[0].row][this.pathDots[0].col].image.setAlpha(1)
        this.dragging = false;
        this.canPick = true
      }
      this.removePath();

    }
  }
  makeDotsFall() {
    let moved = 0;
    var moveDown = this.b.arrangeBoardAfterChain()
    moveDown.forEach(function (movement) {
      moved++;
      this.tweens.add({
        targets: this.b.board[movement.row][movement.col].image,
        y: this.b.board[movement.row][movement.col].image.y + movement.deltaRow * this.dotSize,
        duration: this.fallSpeed * Math.abs(movement.deltaRow),
        ease: 'Bounce',
        callbackScope: this,
        onComplete: function () {
          moved--;
          if (moved == 0) {
            this.canPick = true;
          }
        }
      })
    }.bind(this));

    let replenishMovements = this.b.replenishBoard(this.square, this.pathValue);
    //console.log(replenishMovements)
    replenishMovements.forEach(function (movement) {
      moved++;
      //console.log(this.b.board[movement.row][movement.col])
      let sprite = this.poolArray.pop();
      sprite.alpha = 1;

      //add dot
      if (this.b.board[movement.row][movement.col].value <= 5) {
        sprite.setTexture('circle')
        sprite.setTint(colors[this.b.board[movement.row][movement.col].value]);
        this.b.board[movement.row][movement.col].type = 'dot'
        //add drop
      } else if (this.b.board[movement.row][movement.col].value == gameOptions.dropValue) {
        sprite.setTexture('drop')
        sprite.setTint(gameOptions.dropColor);
        this.b.board[movement.row][movement.col].type = 'drop'
        //add gem
      } else if (this.b.board[movement.row][movement.col].value == gameOptions.gemValue) {
        sprite.setTexture('gem')
        var ran = Math.floor(Math.random() * this.items)
        sprite.setTint(colors[ran])
        this.b.board[movement.row][movement.col].gemColor = ran
        this.b.board[movement.row][movement.col].type = 'gem'
        //add wild
      } else if (this.b.board[movement.row][movement.col].value == gameOptions.wildValue) {
        sprite.setTexture('bomb1')

        sprite.setTint(gameOptions.wildColor)

        this.b.board[movement.row][movement.col].type = 'wild'
        //add rover
      } else if (this.b.board[movement.row][movement.col].value == gameOptions.roverValue) {
        var ran = Math.floor(Math.random() * this.items)
        sprite.setTexture('rover1')
        sprite.setTint(colors[ran])
        this.b.board[movement.row][movement.col].value = ran
        this.b.board[movement.row][movement.col].isRover = true
        this.b.board[movement.row][movement.col].roverDir = Phaser.Math.Between(0, 3)
        this.b.board[movement.row][movement.col].type = 'rover'
      } /* else if (this.b.board[movement.row][movement.col].value == gameOptions.iceValue) {
        sprite.setTexture('ice1')
        
        sprite.setTint(colors[ran])
        this.b.board[movement.row][movement.col].gemColor = ran
        //add rover
      } */

      sprite.y = this.yOffset + this.dotSize * (movement.row - movement.deltaRow + 1) - this.dotSize / 2;
      sprite.x = this.xOffset + this.dotSize * movement.col + this.dotSize / 2,

        this.b.board[movement.row][movement.col].image = sprite;

      this.tweens.add({
        targets: sprite,
        y: this.yOffset + this.dotSize * movement.row + this.dotSize / 2,
        duration: this.fallSpeed * movement.deltaRow,
        ease: 'Bounce',
        callbackScope: this,
        onComplete: function () {
          moved--;
          if (moved == 0) {

            if (this.gemCheck()) {
              this.isSpecial = true;
              this.removeGems()
            } else if (this.roverCheck()) {

            } else if (this.roverExplode.length > 0) {
              for (var i = 0; i < this.roverExplode.length; i++) {
                // console.log('rover explode')
                this.explodeBomb(this.roverExplode[i].row, this.roverExplode[i].col)
              }

              this.isSpecial = true;
              this.removeGems()
            } else if (this.bombToExplode.length > 0) {
              for (var i = 0; i < this.bombToExplode.length; i++) {
                //console.log('rover explode')
                var bomb = this.bombToExplode.pop()
                this.explodeBomb(bomb.row, bomb.col)
              }
              this.bombToExplode = []
              this.isSpecial = true;
              this.removeGems()

            } else if (this.dropCheck()) {
              this.isSpecial = true;
              this.removeGems()
            } else {
              if (levelSettings.allowFire && !this.stopFire) {
                this.growFire()

              }
              this.canPick = true
              this.dragging = false;
              this.isSpecial = false;
              this.pathValue = null
              this.events.emit('moves', { moves: this.tally.moves })

            }

          }
        }
      });
    }.bind(this))
  }
  removePath() {
    this.pathDots = []

  }
  dropCheck() {

    let result = false
    if (!levelSettings.allowDrop) {
      return result
    }
    for (let j = 0; j < this.cols; j++) {
      if (gameOptions.dropValue == this.b.board[this.rows - 1][j].value) {
        this.pathDots.push({ row: this.rows - 1, col: j })
        result = true
        //console.log('found drop')
      }
    }
    //console.log(result)
    return result
  }
  gemCheck() {
    let result = false
    if (!levelSettings.allowGem) {
      return result
    }
    if (this.square) {
      var gems = this.findGems()
      //console.log(gems)
      if (gems.length > 0) {
        gems.forEach(function (gem) {
          this.explode(gem.row, gem.col)
          var cross = this.b.addCross(gem.row, gem.col)
          this.pathDots.push.apply(this.pathDots, cross);
          //console.log(cross)
        }.bind(this))

        return true
        //return true and removegems
      }
    }
    return false
  }
  findGems() {
    let results = []
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var img = this.b.board[i][j].image
        if (img.texture.key == 'gem' && this.b.board[i][j].gemColor == this.pathValue && this.b.board[i][j].value == gameOptions.gemValue) {
          //console.log('key' + img.texture.key + ', tint' + img.tintTopLeft + ', value' + this.b.board[i][j].value)
          results.push({ row: i, col: j })
        }
      }
    }
    return results;
  }
  roverCheck() {
    var rovers = this.findRovers()
    //console.log(rovers)
    if (rovers.length > 0) {
      rovers.forEach(rover => {
        var roverVal = this.valueAt(rover.row, rover.col)

        var tile = this.b.getRandomNeighbor(rover.row, rover.col)
        this.b.setTarget(tile.row, tile.col)
        var swap = this.b.swapItems(rover.row, rover.col, tile.row, tile.col)
        //console.log(swap)
        //non rover to rover
        this.b.removeTarget(swap[0].row, swap[0].col, roverVal)
        var tween1 = this.tweens.add({
          targets: this.b.board[swap[0].row][swap[0].col].image,
          x: this.xOffset + this.dotSize * rover.col + this.dotSize / 2,
          y: this.yOffset + this.dotSize * rover.row + this.dotSize / 2,
          duration: 200,
          onCompleteScope: this,
          onComplete: function () {
            return false
            //this.canPick = true;
            //this.dragging = false;


          }

        });
        //rover to non rover
        var tween1 = this.tweens.add({
          targets: this.b.board[swap[1].row][swap[1].col].image,
          x: this.xOffset + this.dotSize * tile.col + this.dotSize / 2,
          y: this.yOffset + this.dotSize * tile.row + this.dotSize / 2,
          duration: 200,

        });

      });

    }

  }
  findRovers() {
    let results = []
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var tile = this.b.board[i][j]
        if (tile.isRover) {
          //console.log('key' + img.texture.key + ', tint' + img.tintTopLeft + ', value' + this.b.board[i][j].value)
          results.push({ row: i, col: j })
        }
      }
    }
    return results;
  }
  growFire() {
    var results = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.valueAt(i, j) == gameOptions.fireValue) {
          results.push({ r: i, c: j })
        }
        // this.draw3.customDataOf(i, j).setAlpha(.2)


      }
    }


    if (results.length > 0) {
      for (var r = 0; r < results.length; r++) {
        var neighbors = this.b.getNeighbors(results[r].r, results[r].c)
        if (neighbors.length > 0) {
          var tile = neighbors[Phaser.Math.Between(0, neighbors.length - 1)]
          this.b.board[tile.row][tile.col].value = gameOptions.fireValue;
          this.b.board[tile.row][tile.col].image.setTexture('fire').setTint(0xff0000)

          var tween = this.tweens.add({
            targets: this.b.board[tile.row][tile.col].image,
            alpha: 0,
            duration: 200,
            yoyo: true,
          })
        }

      }


    }

  }
  explodeBomb(row, col) {
    // Get the first explosion, and activate it.
    this.explode(row, col)
    this.bombCleared = true
    var neighbors = this.b.getNeighbors(row, col)
    if (neighbors.length > 0) {
      // this.pathDots.push({row, col})
      for (var n = 0; n < neighbors.length; n++) {
        this.pathDots.push({ row: neighbors[n].row, col: neighbors[n].col })
      }
    }
  }
  explode(row, col) {
    var explosion = this.bursts.get().setActive(true);

    // Place the explosion on the screen, and play the animation.
    explosion.setOrigin(0.5, 0.5).setScale(3);
    explosion.x = this.b.board[row][col].image.x;
    explosion.y = this.b.board[row][col].image.y;
    explosion.play('burst1');
    explosion.on('animationcomplete', function () {
      explosion.setActive(false);
    }, this);
  }
  tallyResults(results) {
    var totalDotsThisMove = 0
    for (var r = 0; r < results.length; r++) {
      var result = results[r]
      if (result.value == 0) {
        this.tally.orange++
        totalDotsThisMove++
      } else if (result.value == 1) {
        this.tally.purple++
        totalDotsThisMove++
      } else if (result.value == 2) {
        this.tally.blue++
        totalDotsThisMove++
      } else if (result.value == 3) {
        this.tally.green++
        totalDotsThisMove++
      } else if (result.value == 4) {
        this.tally.brown++ //yellow
        totalDotsThisMove++
      } else if (result.value == 5) {
        this.tally.red++ //tan
        totalDotsThisMove++
      } else if (result.value == gameOptions.gemValue) {
        this.tally.gem++
        totalDotsThisMove++
      } else if (result.value == gameOptions.dropValue) {
        this.tally.drop++
        totalDotsThisMove++
      } else if (result.rover) {
        this.tally.rover++
        totalDotsThisMove++
      }
    }
    if (this.square) {
      //this.squareText.setText(this.moveValue)
      this.tally.square++
    }
    this.tally.dots += totalDotsThisMove
    //console.log(this.tally)
    this.events.emit('tally')
    this.events.emit('dots', { dots: this.tally.dots });
  }
  valueAt(row, col) {
    return this.b.board[row][col].value
  }
  inPath(dot) {
    for (var i = 0; i < this.pathDots.length; i++) {
      if (this.isSame(this.pathDots[i], dot)) {
        return true;
      }
    }
    return false;
  }
  isSame(one, two) {
    return one.row == two.row && one.col == two.col
  }
  connects(dot1, dot2) {
    if (dot1 == undefined || dot2 == undefined) { return }
    //return this.b.board[dot1.row][dot1.col].value === this.b.board[dot2.row][dot2.col].value && this.b.areNext(dot1, dot2)

    if (this.b.board[dot1.row][dot1.col].value === this.b.board[dot2.row][dot2.col].value && this.b.areNext(dot1, dot2)) {
      return true
    } else if (this.valueAt(dot1.row, dot1.col) == gameOptions.wildValue && this.b.areNext(dot1, dot2)) {

      return true
    } else if (this.valueAt(dot2.row, dot2.col) == gameOptions.wildValue && this.b.areNext(dot1, dot2)) {
      return true
    }


    //return false
  }


  highlightAll() {
    this.pathDots.forEach(function (pos) {
      this.b.board[pos.row][pos.col].image.setAlpha(this.selectAlpha)
    }.bind(this))
  }

  makePowerUp() {
    var puBack = this.add.image(0, 1475, 'blank').setOrigin(0, .5).setTint(0x333333)
    puBack.displayWidth = game.config.width
    puBack.displayHeight = 125
    this.oneDot = this.add.image(75, 1475, 'one_dot').setInteractive()
    this.oneDot.on('pointerdown', function () {
      if (this.startOneDot) {
        this.startOneDot = false
        this.oneDot.clearTint()
      } else {
        if (gameData.money < 1) { return }
        this.startOneDot = true
        this.oneDot.setTint(0xff0000)
      }

    }, this)
    this.allColor = this.add.image(200, 1475, 'all_color').setInteractive()
    this.allColor.on('pointerdown', function () {
      if (this.startAllColor) {
        this.startAllColor = false
        this.allColor.clearTint()
      } else {
        if (gameData.money < 2) { return }
        this.startAllColor = true
        this.allColor.setTint(0xff0000)
      }

    }, this)
    this.bombPU = this.add.image(325, 1475, 'bombPU').setInteractive()
    this.bombPU.on('pointerdown', function () {
      if (this.startBombPU) {
        this.startBombPU = false
        this.bombPU.clearTint()
      } else {
        if (gameData.money < 3) { return }
        this.startBombPU = true
        this.bombPU.setTint(0xff0000)
      }

    }, this)
    this.paintPU = this.add.image(450, 1475, 'paint').setInteractive()
    this.paintPU.on('pointerdown', function () {
      if (this.startPaintPU) {
        this.startPaintPU = false
        this.paintPU.clearTint()
      } else {
        if (gameData.money < 5) { return }
        this.startPaintPU = true
        this.paintPU.setTint(0xff0000)
      }

    }, this)
    this.shufflePU = this.add.image(575, 1475, 'shuffle').setInteractive()
    this.shufflePU.on('pointerdown', function () {
      if (this.startShufflePU) {
        this.startShufflePU = false
        this.shufflePU.clearTint()
      } else {
        if (gameData.money < 5) { return }
        this.startShufflePU = true
        this.shufflePU.setTint(0xff0000)
      }

    }, this)
  }

  toggleMenu() {

    if (this.menuGroup.y == 0) {
      var menuTween = this.tweens.add({
        targets: this.menuGroup,
        y: -270,
        duration: 500,
        ease: 'Bounce'
      })

    }
    if (this.menuGroup.y == -270) {
      var menuTween = this.tweens.add({
        targets: this.menuGroup,
        y: 0,
        duration: 500,
        ease: 'Bounce'
      })
    }
  }
  makeMenu() {
    ////////menu
    this.menuGroup = this.add.container().setDepth(5);
    var menuBG = this.add.image(game.config.width / 2, game.config.height - 85, 'blank').setOrigin(.5, 0).setTint(0x333333).setAlpha(.8)
    menuBG.displayWidth = 300;
    menuBG.displayHeight = 600
    this.menuGroup.add(menuBG)
    var menuButton = this.add.image(game.config.width / 2, game.config.height - 40, "menu").setInteractive().setDepth(3);
    menuButton.on('pointerdown', this.toggleMenu, this)
    menuButton.setOrigin(0.5);
    this.menuGroup.add(menuButton);
    var homeButton = this.add.bitmapText(game.config.width / 2, game.config.height + 50, 'gothic', 'HOME', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    homeButton.on('pointerdown', function () {
      this.scene.stop()
      this.scene.stop('UI')
      this.scene.start('startGame')

    }, this)
    this.menuGroup.add(homeButton);
    var wordButton = this.add.bitmapText(game.config.width / 2, game.config.height + 140, 'gothic', 'WORDS', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    wordButton.on('pointerdown', function () {
      var data = {
        yesWords: this.foundWords,
        noWords: this.notWords
      }
      this.scene.pause()
      //this.scene.launch('wordsPlayed', data)
    }, this)
    this.menuGroup.add(wordButton);
    var helpButton = this.add.bitmapText(game.config.width / 2, game.config.height + 230, 'gothic', 'RESTART', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    helpButton.on('pointerdown', function () {
      this.scene.stop()
      this.scene.stop('UI')

      this.scene.start('playGame')
      this.scene.launch('UI')
    }, this)
    this.menuGroup.add(helpButton);
    //var thankYou = game.add.button(game.config.width / 2, game.config.height + 130, "thankyou", function(){});
    // thankYou.setOrigin(0.5);
    // menuGroup.add(thankYou);    
    ////////end menu
  }


}
