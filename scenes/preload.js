class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {


    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image("particle", "assets/particle.png");
    for (var i = 0; i < 125; i++) {
      this.load.image("particle", "assets/particle.png");
    }




    //this.load.image("particle", "assets/sprites/particle.png");
    this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    this.load.spritesheet("menu_icons", "assets/sprites/icons.png", {
      frameWidth: 96,
      frameHeight: 96
    });


    this.load.spritesheet("particle_color", "assets/particles.png", {
      frameWidth: 6,
      frameHeight: 6
    });

    this.load.spritesheet("burst", "assets/sprites/burst.png", {
      frameWidth: 100,
      frameHeight: 100
    });

    this.load.spritesheet("switch", "assets/sprites/switch.png", {
      frameWidth: 150,
      frameHeight: 75
    });
    this.load.image('blank', 'assets/sprites/blank.png');
    this.load.image('menu', 'assets/sprites/menu.png');
    this.load.image('star', 'assets/sprites/star.png');
    this.load.image('circle', 'assets/sprites/square-ios-app-128.png');
    this.load.image('drop', 'assets/sprites/arrow-207-128.png');
    this.load.image('gem', 'assets/sprites/triangle-outline-128.png');
    this.load.image('rover3', 'assets/sprites/hexagon-outline.png');
    this.load.image('rover1', 'assets/sprites/hexagon.png');
    this.load.image('rover2', 'assets/sprites/hexagon-partial-outline.png');
    this.load.image('bomb1', 'assets/sprites/circle_outline.png');
    this.load.image('bomb2', 'assets/sprites/circle-dashed-8-128.png');
    this.load.image('bomb3', 'assets/sprites/circle-dashed-4-128.png');
    this.load.image('ice1', 'assets/sprites/square-dashed-0.png');
    this.load.image('ice2', 'assets/sprites/square-dashed-8.png');
    this.load.image('ice3', 'assets/sprites/square-dashed-4.png');
    this.load.image('fire', 'assets/sprites/fire-2-128.png');
    this.load.image('modal', 'assets/sprites/modal.png');
    this.load.image('check', 'assets/sprites/checkmark-128.png');
    this.load.image('square', 'assets/sprites/grid-two-up-128.png');
    this.load.image('one_dot', 'assets/sprites/one_dot.png');
    this.load.image('all_color', 'assets/sprites/all_color.png');
    this.load.image('bombPU', 'assets/sprites/bomb-96.png');
    this.load.image('block', 'assets/sprites/block.png');
    this.load.image('play', 'assets/sprites/play.png');
    this.load.image('levelsIcon', 'assets/sprites/levels.png');
    this.load.image('levelbuilder', 'assets/sprites/levelbuilder.png');
  }
  create() {
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}








