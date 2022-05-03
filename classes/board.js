let dirs = [{ r: -1, c: 0 }, { r: -1, c: 1 }, { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 0 }, { r: 1, c: -1 }, { r: 0, c: -1 }, { r: -1, c: -1 }]
let dirs4 = [{ r: -1, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 0, c: -1 }];
class Board {
  constructor(rows, cols, items) {
    this.rows = rows;
    this.cols = cols;
    this.board = [];
    this.ids = 0;
    this.items = items
    if (this.items == 2) {
      this.itemArray = [0, 1];
    } else if (this.items == 3) {
      this.itemArray = [0, 1, 2];
    } else if (this.items == 4) {
      this.itemArray = [0, 1, 2, 3];
    } else if (this.items == 5) {
      this.itemArray = [0, 1, 2, 3, 4];
    } else if (this.items == 6) {
      this.itemArray = [0, 1, 2, 3, 4, 5];
    }
    this.init();

  }
  init() {
    for (var c = 0; c < this.rows; c++) {
      var col = [];
      for (var r = 0; r < this.cols; r++) {
        col.push(new Dot(this.id));

      }
      this.board.push(col);
    }
    if (levelSettings.allowDrop) {
      this.addSpecial(levelSettings.dropStartCount, gameOptions.dropValue)
    }
    if (levelSettings.allowGem) {
      this.addSpecial(levelSettings.gemStartCount, gameOptions.gemValue)
    }
    if (levelSettings.allowRover) {
      this.addSpecial(levelSettings.roverStartCount, gameOptions.roverValue)
    } if (levelSettings.allowFire) {
      this.addSpecial(levelSettings.fireStartCount, gameOptions.fireValue)
    }
    if (levelSettings.allowWild) {
      this.addSpecial(levelSettings.wildStartCount, gameOptions.wildValue)
    }
    this.fillValues()
  }
  dot() {
    var val = Math.floor(Math.random() * this.items)
    return {
      id: this.ids++,
      value: null,
      type: 'dot',
      strength: 0,
      gemColor: -1,
      isRover: false,
      roverStength: 3
      //color: colors[val]
    }
  }
  fillValues() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.board[i][j].value == null) {
          let randomValue = Math.floor(Math.random() * this.items);
          this.board[i][j].value = randomValue
        }

      }
    }
  }
  addSpecial(count, value) {
    var i = 0
    while (i < count) {
      var row = Phaser.Math.Between(0, this.rows - 2)
      var col = Phaser.Math.Between(0, this.cols - 1)

      if (this.board[row][col].value == null) {
        this.board[row][col].value = value
        i++
      }
    }
  }
  valid(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols //&& this.gameArray[row] != undefined && this.gameArray[row][col] != undefined;
  }
  isNonSelect(value, eValue) {
    return value == gameOptions.dropValue || value == gameOptions.gemValue || value == gameOptions.fireValue || eValue == gameOptions.blockValue
  }
  findAll(value) {
    var positions = [];
    this.board.forEach(function (row, r) {
      row.forEach(function (dot, c) {
        if (dot.value === value) {
          positions.push({ row: r, col: c });
        }
      });
    });
    return positions;
  }
  addCross(row1, col) {
    return this.addcol(col)
    //var crossC = this.addcol(col)
    //var crossR = this.addRow(row)
    //return crossC.concat(crossR);
    //col

  }
  addcol(col) {
    var result = []
    this.board.forEach(function (row, r) {
      row.forEach(function (dot, c) {
        if (c === col) {
          result.push({ row: r, col: c });
        }
      });
    });

    return result
  }
  addRow(row1) {
    var result = []
    this.board.forEach(function (row, r) {
      row.forEach(function (dot, c) {
        if (r === row1) {
          result.push({ row: r, col: c });
        }
      });
    });

    return result
  }
  remove(positions) {
    var self = this;

    let results = []
    positions.forEach(function (pos) {
      //filter out the rover, unless it is done, then remove it 
      if (self.board[pos.row][pos.col].isRover) {
        self.board[pos.row][pos.col].image.setAlpha(1)
        self.board[pos.row][pos.col].roverStength--
        if (self.board[pos.row][pos.col].roverStength == 2) {
          self.board[pos.row][pos.col].image.setTexture('rover2')
          var val = self.getRandomWithOneExclusion(self.items, self.board[pos.row][pos.col].value)
          self.board[pos.row][pos.col].image.setTint(colors[val])
          self.board[pos.row][pos.col].value = val
        } else if (self.board[pos.row][pos.col].roverStength == 1) {
          self.board[pos.row][pos.col].image.setTexture('rover3')
          var val = self.getRandomWithOneExclusion(self.items, self.board[pos.row][pos.col].value)
          self.board[pos.row][pos.col].image.setTint(colors[val])
          self.board[pos.row][pos.col].value = val
        } else if (self.board[pos.row][pos.col].roverStength == 0) {
          results.push({
            row: pos.row,
            col: pos.col,
            value: self.board[pos.row][pos.col].value,
            gemColor: self.board[pos.row][pos.col].gemColor,
            rover: true
          })
          self.board[pos.row][pos.col].value = null
          self.board[pos.row][pos.col].image.clearTint()
          self.board[pos.row][pos.col].gemColor = -1
          self.board[pos.row][pos.col].isRover = false
        }

      } else {
        results.push({
          row: pos.row,
          col: pos.col,
          value: self.board[pos.row][pos.col].value,
          rover: false
        })
        self.board[pos.row][pos.col].value = null
        self.board[pos.row][pos.col].image.clearTint()
        self.board[pos.row][pos.col].gemColor = -1
        self.board[pos.row][pos.col].rover = false
      }


    })
    return results
  }
  replenishBoard(isSquare, chainVal) {
    let randomValue
    let result = [];
    for (let i = 0; i < this.cols; i++) {
      if (this.board[0][i].value == null) {
        let emptySpaces = this.emptySpacesBelow(0, i) + 1;
        for (let j = 0; j < emptySpaces; j++) {
          //randomValue = Math.floor(Math.random() * this.items)
          if (isSquare) {
            randomValue = this.getRandomWithOneExclusion(this.itemArray.length, chainVal)
          } else {
            randomValue = Math.round(Math.random() * (this.itemArray.length - 1));
          }

          result.push({
            row: j,
            col: i,
            deltaRow: emptySpaces,
            deltacol: 0
          });
          this.board[j][i].value = randomValue;


        }
      }
    }

    if (levelSettings.allowDrop) {
      if (Phaser.Math.Between(1, 100) < 25) {
        var go = false
        while (!go) {
          var tile = result[Phaser.Math.Between(0, result.length - 1)]
          if (this.board[tile.row][tile.col].value < this.items - 1) {
            go = true
          }
        }
        this.board[tile.row][tile.col].value = gameOptions.dropValue
      }
    }
    if (levelSettings.allowGem) {
      if (Phaser.Math.Between(1, 100) < 25) {
        var go = false
        while (!go) {
          var tile = result[Phaser.Math.Between(0, result.length - 1)]
          if (this.board[tile.row][tile.col].value < this.items - 1) {
            go = true
          }
        }
        this.board[tile.row][tile.col].value = gameOptions.gemValue
      }
    }
    if (levelSettings.allowRover) {
      if (Phaser.Math.Between(1, 100) < 10) {
        var go = false
        while (!go) {
          var tile = result[Phaser.Math.Between(0, result.length - 1)]
          if (this.board[tile.row][tile.col].value < this.items - 1) {
            go = true
          }
        }
        this.board[tile.row][tile.col].value = gameOptions.roverValue
      }
    }
    /* if (levelSettings.allowIce) {
      if (Phaser.Math.Between(1, 100) < 10) {
        var go = false
        while (!go) {
          var tile = result[Phaser.Math.Between(0, result.length - 1)]
          if (this.board[tile.row][tile.col].value < this.items - 1) {
            go = true
          }
        }
        this.board[tile.row][tile.col].value = gameOptions.iceValue
      }
    } */

    return result;
  }
  emptySpacesBelow(row, col) {
    let result = 0;
    if (row != this.rows) {
      for (let i = row + 1; i < this.rows; i++) {
        if (this.board[i][col].value == null) {
          result++;
        }
      }
    }
    return result;
  }
  arrangeBoardAfterChain() {
    let result = []
    for (let i = this.rows - 2; i >= 0; i--) {
      for (let j = 0; j < this.cols; j++) {
        let emptySpaces = this.emptySpacesBelow(i, j);
        if (this.board[i][j].value != null && emptySpaces > 0) {
          this.swapItems(i, j, i + emptySpaces, j)
          result.push({
            row: i + emptySpaces,
            col: j,
            deltaRow: emptySpaces,
            deltacol: 0
          });
        }
      }
    }
    return result;
  }


  swapItems(row, col, row2, col2) {
    let tempObject = Object.assign(this.board[row][col]);
    this.board[row][col] = Object.assign(this.board[row2][col2]);
    this.board[row2][col2] = Object.assign(tempObject);
    return [{
      row: row,
      col: col,
      deltaRow: row - row2,
      deltacol: col - col2
    },
    {
      row: row2,
      col: col2,
      deltaRow: row2 - row,
      deltacol: col2 - col
    }]
  }
  getRandomWithOneExclusion(lengthOfArray, indexToExclude) {
    var rand = null; //an integer
    while (rand === null || rand === indexToExclude) {
      rand = Math.round(Math.random() * (lengthOfArray - 1));
    }
    return rand;
  }
  inPath(array, dot) {
    for (var i = 0; i < array.length; i++) {
      if (this.isSame(array[i], dot)) {
        return true;
      }
    }
    return false;
  }
  isSame(one, two) {
    return one.row == two.row && one.col == two.col
  }
  valueAt(row, col) {
    return this.board[row][col].value
  }
  areNext(dot1, dot2) {
    //diangonal
    //return (Math.abs(column - column2) <= 1) && (Math.abs(row - row2) <= 1);
    //normal
    return (Math.abs(dot1.col - dot2.col) == 1 && dot1.row - dot2.row == 0) || (Math.abs(dot1.row - dot2.row) == 1 && dot1.col - dot2.col == 0);

    //return (Math.abs(row - row2) + Math.abs(column - column2) == 1) || (Math.abs(row - row2) == 1 && Math.abs(column - column2) == 1);
  }

  setTarget(row, column) {
    this.board[row][column].isTarget = true;
  }
  removeTarget(row, column) {
    this.board[row][column].isTarget = false;
  }
  isTargetAt(row, column) {
    this.board[row][column].isTarget;
  }
  getRoverDirection(row, column) {
    return this.board[row][column].roverDir
  }
  setRoverDirection(row, column, dir) {
    this.board[row][column].roverDir = dir
  }
  isNeighborFire(row, column) {
    var result = [];
    for (var n = 0; n < 4; n++) {
      var rand = Phaser.Math.Between(0, this.items - 1)
      if (this.valid(row + dirs4[n].r, column + dirs4[n].c) && this.valueAt(row + dirs4[n].r, column + dirs4[n].c) == gameOptions.fireValue) {
        this.board[row + dirs4[n].r][column + dirs4[n].c].image.setTexture('circle').setTint(colors[rand])
        this.board[row + dirs4[n].r][column + dirs4[n].c].value = rand;

        result.push({ r: row + dirs4[n].r, c: column + dirs4[n].c })
      }
    }
    if (result.length > 0) {
      return true;
    }
  }
  //returns array of valid neighbor coord
  getNeighbors(row, column) {
    var result = []
    for (var i = 0; i < 8; i++) {
      var nR = row + dirs[i].r
      var nC = column + dirs[i].c
      if (this.valid(nR, nC)) {
        result.push({ row: nR, col: nC })
      }
    }
    //console.log(result)
    return result
  }
  getRandomNeighbor(row, column) {

    var found = false
    if (Phaser.Math.Between(1, 100) < 20) {
      var dir = Math.floor(Math.random() * 3)
      this.setRoverDirection(row, column, dir)
    } else {
      var dir = this.getRoverDirection(row, column)
    }

    while (!found) {
      //console.log(dir)
      var nR = row + dirs4[dir].r
      var nC = column + dirs4[dir].c
      if (this.valid(nR, nC) && !this.board[nR][nC].isRover && !this.isTargetAt(nR, nC)) {
        found = true
      } else {
        dir = Phaser.Math.Between(0, 3)
        this.setRoverDirection(row, column, dir)
      }
    }
    return { row: nR, col: nC }

  }

}


