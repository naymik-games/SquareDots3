let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,
  dropValue: 6,
  gemValue: 7,
  roverValue: 8,
  iceValue: 11,
  bombValue: 12,
  iceValue: 13,
  fireValue: 14,
  wildValue: 15,
  blockValue: 16,
  dropColor: 0xe6b60b,
  iceColor: 0x65b3e0,
  bombColor: 0xe66a0b,
  squareColor: 0x333333,
  wildColor: 0xcccccc


}
onGroup = 0
onLevel = 0
let gameMode
let gameData
let levelSettings
let lbData
defaultGame = {
  cols: 7,
  rows: 8,
  items: 6,
  movesGoal: 20,
  time: 60,
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
let colors = [0xDC5639, 0x823957, 0x436475, 0x5FA34C, 0xFBBD4E, 0xA6AB86];
let lbFlag = false
let gameSettings;
var defaultValues = {
  mostDotsMoves: 0,
  mostDotsTime: 0,
  mostDotsLB: 0,
  levelStatus: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  totalSquares: 0,
  group: 0,
  currentLevel: 0
}