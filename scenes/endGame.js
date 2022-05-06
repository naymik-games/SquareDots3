class endGame extends Phaser.Scene {
	constructor() {
		super("endGame");
	}
	preload() {



	}
	init(data) {
		this.totalBlocksRemoved = data.totalRemoved;
		this.outcome = data.outcome;
		this.movesLeft = data.movesLeft;
		this.level = data.level;
	}
	create() {
		//	this.cameras.main.setBackgroundColor(0xf7eac6);

		var timedEvent = this.time.addEvent({ delay: 1000, callback: this.showPreview, callbackScope: this, loop: false });

		this.previewBox = this.add.container(1000, 0);
		var background = this.add.image(450, 820, 'modal');
		this.previewBox.add(background);


		this.newBest = false;



		//this.previewBox.add(star); 

		if (gameMode == 'challenge') {

			if (this.outcome == 1) {
				this.timeline = this.tweens.createTimeline();
				var message = 'Success!'
				if (gameData.levelStatus[onLevel + 1] == -1) {
					gameData.levelStatus[onLevel + 1] = 0;
				}

				if (this.movesLeft < 2) {
					gameData.levelStatus[onLevel] = 1;
					var star1 = this.add.image(1450, 850, 'star').setScale(2);

					this.timeline.add({
						targets: star1,
						x: 450,
						delay: 1500,
						angle: 360,
						duration: 700
					})
					var mess = 'You earned one star!';
				} else if (this.movesLeft < 5) {
					gameData.levelStatus[onLevel] = 2;
					var star2 = this.add.image(1450, 850, 'star').setScale(2);
					var star3 = this.add.image(1450, 850, 'star').setScale(2);

					this.timeline.add({
						targets: star2,
						x: 350,
						delay: 1500,
						angle: 360,
						duration: 500
					})
					this.timeline.add({
						targets: star3,
						x: 550,
						delay: 0,
						angle: 360,
						duration: 500
					})
					var mess = 'You earned two stars!';
				} else {
					gameData.levelStatus[onLevel] = 3;
					gameData.money++
					var star1 = this.add.image(1450, 800, 'star').setScale(2);
					var star2 = this.add.image(1450, 900, 'star').setScale(2);
					var star3 = this.add.image(1450, 900, 'star').setScale(2);

					this.timeline.add({
						targets: star1,
						x: 450,
						delay: 1500,
						angle: 360,
						duration: 500
					})
					this.timeline.add({
						targets: star2,
						x: 350,
						delay: 0,
						angle: 360,
						duration: 500
					})
					this.timeline.add({
						targets: star3,
						x: 550,
						delay: 0,
						angle: 360,
						duration: 500
					})
					var mess = 'You earned three stars!';
				}

				gameData.currentLevel = onLevel + 1
				gameData.group = onGroup


				this.timeline.play();


			} else {
				var message = 'Failure!'
				var mess = 'Try Again';

			}
		} else {
			var message = 'Complete'
			var score = this.totalBlocksRemoved;


			if (gameMode == 'time') {
				if (lbFlag) {
					if (this.totalBlocksRemoved > gameData.mostDotsLB) {
						gameData.mostDotsLB = this.totalBlocksRemoved;
						var high = this.totalBlocksRemoved;
						this.newBest = true;
						gameData.money += 5
					} else {
						var high = gameData.mostDotsLB;
					}
				} else {
					if (this.totalBlocksRemoved > gameData.mostDotsTime) {
						gameData.mostDotsTime = this.totalBlocksRemoved;
						var high = this.totalBlocksRemoved;
						this.newBest = true;
						gameData.money += 5
					} else {
						var high = gameData.mostDotsTime;
					}
				}
				if (this.totalBlocksRemoved > gameData.mostDotsTime) {
					gameData.mostDotsTime = this.totalBlocksRemoved;
					var high = this.totalBlocksRemoved;
					this.newBest = true;
					gameData.money += 5
				} else {
					var high = gameData.mostDotsTime;
				}
			} else if (gameMode == 'moves') {
				if (lbFlag) {
					if (this.totalBlocksRemoved > gameData.mostDotsLB) {
						gameData.mostDotsLB = this.totalBlocksRemoved;
						var high = this.totalBlocksRemoved;
						this.newBest = true;
						gameData.money += 5
					} else {
						var high = gameData.mostDotsLB;
					}
				} else {
					if (this.totalBlocksRemoved > gameData.mostDotsMoves) {

						gameData.mostDotsMoves = this.totalBlocksRemoved;

						var high = this.totalBlocksRemoved;
						this.newBest = true;
						gameData.money += 5
					} else {
						var high = gameData.mostDotsMoves;
					}
				}


			}

		}

		//challenge
		var titleText = this.add.bitmapText(450, 475, 'gothic', message, 90).setOrigin(.5).setTint(0xffffff).setAlpha(1);
		this.previewBox.add(titleText);

		let messText = this.add.bitmapText(450, 625, 'gothic', mess, 60).setOrigin(.5).setTint(0xf7484e);
		this.previewBox.add(messText);


		//time or moves
		if (gameMode != 'challenge') {
			let resultText = this.add.bitmapText(450, 725, 'gothic', score, 120).setOrigin(.5).setTint(0xf7484e);
			this.previewBox.add(resultText);
			let highText = this.add.bitmapText(450, 900, 'gothic', 'Best: ' + high, 80).setOrigin(.5).setTint(0xf7484e);
			this.previewBox.add(highText);
			if (this.newBest) {
				let bestText = this.add.bitmapText(1460, 860, 'gothic', 'NEW!', 40).setOrigin(.5).setTint(0xc76210);

				var tween = this.tweens.add({
					targets: bestText,
					x: 610,
					delay: 1500,
					angle: 360,
					duration: 700
				})
			}
		}

		var playText = this.add.bitmapText(625, 1150, 'gothic', 'CONTINUE', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
		this.previewBox.add(playText);
		//var cancelText = this.add.bitmapText(175,1150, 'gothic', '[X]', 50).setOrigin(.5).setTint(0x000000).setAlpha(1).setInteractive();
		this.replayIcon = this.add.image(175, 1150, 'menu_icons', 1).setInteractive().setTint(0xf7484e);
		this.previewBox.add(this.replayIcon);

		playText.on('pointerdown', this.play, this);
		this.replayIcon.on('pointerdown', this.cancel, this);

		localStorage.setItem('SD3save', JSON.stringify(gameData));



	}

	showPreview() {
		console.log('done')
		var tween = this.tweens.add({

			targets: this.previewBox,
			duration: 500,
			x: 0,
			ease: 'bounce'
		})
	}

	play() {
		this.scene.stop('playGame');
		this.scene.stop('endGame');
		this.scene.stop('UI');
		if (gameMode == 'challenge') {
			this.scene.start('selectGame')
		} else {
			this.scene.start('startGame')
		}
	}
	cancel() {
		this.scene.stop();
		this.scene.stop('UI');
		this.scene.start('playGame');
		this.scene.start('UI');
	}
	endResults() {
		let posX = (gameOptions.offsetX + gameOptions.gemSize * levelOptions.cols + gameOptions.gemSize / 2) / 2;
		let posY = gameOptions.offsetY + gameOptions.gemSize * levelOptions.rows + gameOptions.gemSize / 2;
		let fieldHeight = gameOptions.offsetY + gameOptions.gemSize * levelOptions.rows + gameOptions.gemSize;
		if (gameOptions.gameMode == 'challenge') {
			if (this.outcome == 1) {
				var message = 'Success!'
				gameData.levelStatus[onLevel + 1] = 0;
				if (this.movesLeft < 2) {
					gameData.levelStatus[onLevel] = '*';
				} else if (this.movesLeft < 5) {
					gameData.levelStatus[onLevel] = '**';
				} else {
					gameData.levelStatus[onLevel] = '***';
				}

				gameData.currentLevel = onLevel + 1
				var score = '***';
				var high = '';
			} else {
				var message = 'Failure!'
				var score = '';
				var high = '';
			}
		} else {
			var message = 'Complete'
			var score = this.totalBlocksRemoved;
			if (this.totalBlocksRemoved > gameData.mostDotsMoves) {
				gameData.mostDotsMoves = this.totalBlocksRemoved;
				var high = this.totalBlocksRemoved;
			} else {
				var high = gameData.mostDotsMoves;
			}
		}
		let messageText = this.add.bitmapText(posX, gameOptions.offsetY + 50, 'gothic', message, 60).setOrigin(.5).setTint(0xffffff);
		let resultText = this.add.bitmapText(posX, gameOptions.offsetY + 150, 'gothic', score, 60).setOrigin(.5).setTint(0xffffff);
		let highText = this.add.bitmapText(posX, gameOptions.offsetY + 250, 'gothic', high, 60).setOrigin(.5).setTint(0xffffff);
		let back = this.add.bitmapText(posX, fieldHeight - 150, 'gothic', 'BACK', 60).setOrigin(.5).setTint(0xffffff).setInteractive();
		back.on('pointerdown', function () {
			this.scene.stop('playGame');
			this.scene.stop('UI');
			this.scene.start("startGame");
		}, this);
		localStorage.setItem('SD3save', JSON.stringify(gameData));
	}


}

