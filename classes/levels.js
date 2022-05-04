let onLevel = 0
let onGroup = 0
let groups = [
  { numLevels: 12, startNum: 0, title: 'Practice' },
  /*{ numLevels: 12, startNum: 12, title: 'Practice 2' },
   { numLevels: 12, startNum: 24, title: 'Circle Drop' },
   { numLevels: 12, startNum: 36, title: 'Ice Break' },
   { numLevels: 12, startNum: 48, title: 'Wild Time' } */
];
let levels = [
  { tittle: "fasfsdf", rows: 8, cols: 5, items: 5, background: 0xfafafa, allowWild: false, wildStartCount: 0, allowDrop: false, dropStartCount: 0, allowGem: false, gemsStartCount: 0, movesGoal: 20, allowIce: false, iceStartCount: 0, allowFire: false, fireStartCount: 0, allowBomb: false, bombStartCount: 0, allowRover: true, roverStartCount: 4, win: { orange: 4, rover: 3, }, blocks: [{ "row": 1, "col": 1 }, { "row": 1, "col": 2 }, { "row": 2, "col": 1 }, { "row": 2, "col": 2 }] },
  { tittle: "Wild", rows: 8, cols: 7, items: 5, background: 0xfafafa, allowWild: true, wildStartCount: 5, allowDrop: false, dropStartCount: 0, allowGem: false, gemsStartCount: 0, movesGoal: 20, allowIce: false, iceStartCount: 0, allowFire: false, fireStartCount: 0, allowBomb: false, bombStartCount: 0, allowRover: false, roverStartCount: 0, win: { orange: 5, green: 10, }, blocks: [] },
  { tittle: "Drop", rows: 8, cols: 7, items: 4, background: 0xfafafa, allowWild: false, wildStartCount: 5, allowDrop: true, dropStartCount: 5, allowGem: false, gemsStartCount: 0, movesGoal: 20, allowIce: false, iceStartCount: 0, allowFire: false, fireStartCount: 0, allowBomb: false, bombStartCount: 0, allowRover: false, roverStartCount: 0, win: { orange: 5, green: 10, drop: 3 }, blocks: [] },
  { tittle: "Gem", rows: 8, cols: 7, items: 5, background: 0xfafafa, allowWild: false, wildStartCount: 5, allowDrop: false, dropStartCount: 5, allowGem: true, gemsStartCount: 4, movesGoal: 20, allowIce: false, iceStartCount: 0, allowFire: false, fireStartCount: 0, allowBomb: false, bombStartCount: 0, allowRover: false, roverStartCount: 0, win: { orange: 5, green: 10, gem: 3 }, blocks: [] },
  { tittle: "Rover", rows: 8, cols: 7, items: 5, background: 0x000000, allowWild: false, wildStartCount: 0, allowDrop: false, dropStartCount: 0, allowGem: false, gemsStartCount: 0, movesGoal: 20, allowIce: false, iceStartCount: 15, allowFire: false, fireStartCount: 0, allowBomb: false, bombStartCount: 0, allowRover: true, roverStartCount: 4, win: { blue: 15, orange: 15, rover: 4, }, blocks: [] },
  { tittle: "Ice", rows: 8, cols: 7, items: 5, background: 0x000000, allowWild: false, wildStartCount: 0, allowDrop: false, dropStartCount: 0, allowGem: false, gemsStartCount: 0, movesGoal: 20, allowIce: false, iceStartCount: 0, allowFire: false, fireStartCount: 0, allowBomb: false, bombStartCount: 0, allowRover: true, roverStartCount: 4, win: { blue: 15, orange: 15, }, blocks: [] },
  { tittle: "Fire", rows: 8, cols: 7, items: 5, background: 0x000000, allowWild: false, wildStartCount: 0, allowDrop: false, dropStartCount: 0, allowGem: false, gemsStartCount: 0, movesGoal: 20, allowIce: false, iceStartCount: 15, allowFire: true, fireStartCount: 7, allowBomb: false, bombStartCount: 0, allowRover: false, roverStartCount: 4, win: { blue: 15, orange: 15, }, blocks: [] },
  { tittle: "Bomb", rows: 8, cols: 7, items: 5, background: 0x000000, allowWild: false, wildStartCount: 0, allowDrop: false, dropStartCount: 0, allowGem: false, gemsStartCount: 0, movesGoal: 20, allowIce: false, iceStartCount: 15, allowFire: false, fireStartCount: 7, allowBomb: true, bombStartCount: 5, allowRover: false, roverStartCount: 4, win: { blue: 15, orange: 15, bomb: 5, }, blocks: [] },
  { tittle: "Square", rows: 8, cols: 7, items: 5, background: 0x000000, allowWild: false, wildStartCount: 0, allowDrop: false, dropStartCount: 0, allowGem: false, gemsStartCount: 0, movesGoal: 20, allowIce: false, iceStartCount: 15, allowFire: false, fireStartCount: 7, allowBomb: false, bombStartCount: 5, allowRover: false, roverStartCount: 4, win: { blue: 15, orange: 15, square: 4, }, blocks: [] },
  { tittle: "Blocks", rows: 8, cols: 7, items: 5, background: 0x000000, allowWild: false, wildStartCount: 0, allowDrop: false, dropStartCount: 0, allowGem: false, gemsStartCount: 0, movesGoal: 20, allowIce: false, iceStartCount: 15, allowFire: false, fireStartCount: 7, allowBomb: false, bombStartCount: 5, allowRover: false, roverStartCount: 4, win: { blue: 15, orange: 15, }, blocks: [{ "row": 3, "col": 2 }, { "row": 3, "col": 3 }, { "row": 3, "col": 4 }, { "row": 4, "col": 2 }, { "row": 4, "col": 3 }, { "row": 4, "col": 4 }] },
  { tittle: "Drop Gem", rows: 8, cols: 7, items: 5, background: 0x000000, allowWild: false, wildStartCount: 0, allowDrop: true, dropStartCount: 3, allowGem: true, gemsStartCount: 3, movesGoal: 20, allowIce: false, iceStartCount: 15, allowFire: false, fireStartCount: 7, allowBomb: false, bombStartCount: 5, allowRover: false, roverStartCount: 4, win: { blue: 15, orange: 15, drop: 3, gem: 3, }, blocks: [] },
  { tittle: "rover ice", rows: 8, cols: 7, items: 5, background: 0x000000, allowWild: false, wildStartCount: 0, allowDrop: false, dropStartCount: 3, allowGem: false, gemsStartCount: 3, movesGoal: 30, allowIce: true, iceStartCount: 15, allowFire: false, fireStartCount: 7, allowBomb: false, bombStartCount: 5, allowRover: true, roverStartCount: 4, win: { blue: 15, orange: 15, drop: 3, ice: 10, rover: 4, gem: 3, }, blocks: [] },

]






