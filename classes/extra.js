class Extra {
  constructor(rows, cols, items) {
    this.rows = rows;
    this.cols = cols;
    this.extra = [];
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
        var extra = {
          type: null,
          value: null,
          image: null,
          strength: 3
        }
        col.push(extra);

      }
      this.extra.push(col);
    }
    if (levelSettings.allowBomb) {
      this.addExtra(levelSettings.bombStartCount, gameOptions.bombValue, 'bomb')
    }
    if (levelSettings.allowIce) {
      this.addExtra(levelSettings.iceStartCount, gameOptions.iceValue, 'ice')
    }
    console.log(this.extra)
  }
  addExtra(count, value, type) {
    var i = 0
    while (i < count) {
      var row = Phaser.Math.Between(0, this.rows - 1)
      var col = Phaser.Math.Between(0, this.cols - 1)

      if (this.extra[row][col].value == null) {
        this.extra[row][col].value = value
        i++
      }
    }
  }
  setEmptyExtra(row, col) {
    var extra = {
      type: null,
      value: null,
      image: null,
      strength: 3
    }
    this.extra[row][col] = extra
  }
  valid(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols //&& this.gameArray[row] != undefined && this.gameArray[row][col] != undefined;
  }
  valueAt(row, col) {
    return this.extra[row][col].value
  }
}