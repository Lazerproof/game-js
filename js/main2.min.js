(function() {
    var Game = function() {
        this.set();
        this.startGame();
    };

    Game.prototype.set = function() {
        var soundOff = false;

        /* Game vars */
        this.playerTime = '0.00';
        this.ableToFire = false;
        this.foulShoot = false;
        this.userFailFire = false;
        this.currentLevel = 1;
        this.playerScore = 0;
        this.totalScore = 0;
        this.gunman = document.querySelector('.gunman');
        this.target = document.querySelector('.target');
        this.failTarget = document.querySelector('.fail-target');
        this.overlay = document.querySelector('.overlay');
        this.textBox = document.querySelector('.text-box');
        this.messageBox = document.querySelector('.message');
        this.playerTimeBox = document.querySelector('.player-time .value');
        this.gunmanTimeBox = document.querySelector('.gunman-time .value');
        this.gunmanRewardBox = document.querySelector('.gunman-reward .value');
        this.startButton = document.querySelector('.start-game');
        this.levelInfo = document.querySelector('.level-info');
        this.levelInfoValue = document.querySelector('.level-info .value');
        this.scoreInfo = document.querySelector('.score-info');
        this.scoreInfoValue = document.querySelector('.score-info .value');
        this.totalScoreInfo = document.querySelector('.totalscore-info');
        this.totalScoreInfoValue = document.querySelector('.totalscore-info .value');
        this.prepareToShotTime = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;

        };
        this.levels = {
            1: {
                gunmanName: 'billy',
                time: 1300,
                reward: 2800
            },
            2: {
                gunmanName: 'bob',
                time: 1100,
                reward: 3600

            },
            3: {
                gunmanName: 'billy',
                time: 900,
                reward: 4300
            },
            4: {
                gunmanName: 'bob',
                time: 860,
                reward: 5200
            },
            5: {
                gunmanName: 'billy',
                time: 720,
                reward: 5900
            },
            6: {
                gunmanName: 'bob',
                time: 580,
                reward: 6400
            },
            7: {
                gunmanName: 'bob',
                time: 460,
                reward: 7100
            },
            8: {
                gunmanName: 'bob',
                time: 350,
                reward: 8000
            }
        };

        if(soundOff) {
            Audio.prototype.play = function() {
                console.log('Music is off');
            }
        }

        Audio.prototype.stop = function() {
            this.pause();
            this.currentTime = 0;
        };

        /* Sounds */
        //this.soundDeath = new Audio('sound/death.mp3');
        this.soundShoot = new Audio('sound/shoot.mp3');
        this.soundFire = new Audio('sound/fire.mp3');
        this.soundTitle = new Audio('sound/title.mp3');
        this.soundOutlawIntro = new Audio('sound/one-outlaw-intro.mp3');
        this.soundPrepareToShoot = new Audio('sound/prepare-to-shoot.mp3');
        this.soundPrepareToPlay = new Audio('sound/prepare-to-play.mp3');
        this.soundplayerLost = new Audio('sound/you-lost.mp3');
        this.soundplayerWon = new Audio('sound/you-won.mp3');
        //this.soundWin = new Audio('sound/win.mp3');

        /* Messages */

        this.textReady = 'Ready?';
        this.textFire = 'Fire!';
        this.textMissed = 'You missed!';
        this.textYouWon = 'You won!';
        this.textNextLevel = 'Next Level';
        this.textGunmanWon = 'Gunman won!';
    };

    Game.prototype.startGame = function() {
        var that = this;
        this.soundTitle.play();
        console.log(that);
        that.startButton.addEventListener('click', function clickstartButtonListener() {
            that.prepareToPlay();
            that.startButton.removeEventListener('click', clickstartButtonListener);
        });
        console.log('Start!');
    };

    Game.prototype.prepareToPlay = function() {

        /* Sound FX */
        this.soundTitle.stop();
        this.soundPrepareToPlay.play();

        /* Visual FX */
        this.hideOverlay();
        this.showTextBox();
        this.playerTimeBox.innerHTML = this.playerTime;
        this.gunmanRewardBox.innerHTML = this.levels[this.currentLevel].reward;
        this.gunmanTimeBox.innerHTML = (this.levels[this.currentLevel].time / 1000).toFixed(2);

        /* Logic */
        setTimeout(this.initGame.bind(this), 1600);

        console.log('Prepare to play!');
    };

    Game.prototype.initGame = function() {

        console.log('InitGame!');

        /* Sound FX */
        this.soundPrepareToPlay.stop();
        this.soundOutlawIntro.play();

        /* Visual FX */
        this.move(this.levels[this.currentLevel].gunmanName);
    };

    Game.prototype.hideOverlay = function() {

        /* Visual FX */
        this.overlay.classList.add('hide');
        console.log('Hide overlay!');
    };

    Game.prototype.showTextBox = function() {

        /* Visual FX */
        this.textBox.classList.add('visible');
        this.levelInfo.classList.add('visible');
        this.levelInfoValue.innerHTML = this.currentLevel;
        console.log('TextBox is visible');
    };

    Game.prototype.showOverlay = function() {

        /* Visual FX */
        this.overlay.classList.remove('hide');
        console.log('Show overlay!');
    };

    Game.prototype.move = function(person) {
        var that = this;
        console.log('Move and walk!');

        /* Visual FX */
        this.gunman.classList.add(person, 'move', 'walk', 'centered');
        this.gunman.addEventListener('transitionend', function transitionendListener(){
            that.prepareToShot();
            that.gunman.removeEventListener('transitionend', transitionendListener);
        });
    };

    Game.prototype.prepareToShot = function() {
        var that = this;
        /* Sound FX */
        this.soundOutlawIntro.stop();
        this.soundPrepareToShoot.play();

        /* Visual FX */
        this.gunman.classList.remove('move', 'walk');
        this.target.classList.remove('hidden');
        this.failTarget.classList.remove('hidden');

        /* Logic */
        this.target.addEventListener('click', function clickTargetListener(){
            that.playerShoot();
            that.target.removeEventListener('click', clickTargetListener);
        });
        this.failTarget.addEventListener('click', function clickFailTargetListener(){
            that.playerFailShoot();
            that.target.removeEventListener('click', clickFailTargetListener);
        });
        this.duelTimeout = setTimeout(this.duel.bind(this), this.prepareToShotTime(1000, 3000));
        console.log('Gunman on center');
        console.log('Prepare to shoot');
    };

    Game.prototype.duel = function() {
        /* Sound FX */
        this.soundPrepareToShoot.stop();
        this.soundFire.play();

        /* Visual FX */
        this.gunman.classList.add('unholster');
        this.messageBox.classList.remove('hidden');
        this.messageBox.innerHTML = this.textFire;


        /* Logic */
        this.ableToFire = true;
        console.log(this.ableToFire);
        console.log(this.foulShoot);
        this.gunmanShootTimeout = setTimeout(this.gunmanShoot.bind(this), this.levels[this.currentLevel].time);
        this.timer(new Date().getTime());

    };

    Game.prototype.playerShoot = function() {
        var that = this;
        /* Sound FX */
        this.soundShoot.play();

        /* Visual FX */
        this.gunman.classList.remove('aim');
        this.gunman.classList.add('fall');

        /* Logic */
        if(this.ableToFire == true) {
            this.nextLevel();
        } else if(this.ableToFire == false) {
            this.foulPlayerShoot();
        }
    };



    Game.prototype.playerFailShoot = function() {
        var that = this;
        /* Sound FX */
        this.soundShoot.play();

        /* Logic */
        if(this.ableToFire == true) {
            /* Sound FX */
            setTimeout(function() {
                that.soundShoot.stop();
            }, 500);
            console.log('Good shoot but missed');
            /* Visual FX */
            this.messageBox.innerHTML = this.textMissed;
            this.clearTargets();

        } else if(this.ableToFire == false) {
            this.foulPlayerShoot();
        }
    };

    Game.prototype.gunmanShoot = function() {
        var that = this;
        /* Sound FX */
        this.soundOutlawIntro.stop();
        this.soundShoot.play();
        this.soundplayerLost.play();

        /* Visual FX */
        this.gunman.classList.remove('unholster');
        this.gunman.classList.add('aim');
        this.target.classList.add('hidden');
        this.messageBox.classList.remove('hidden');
        this.messageBox.innerHTML = this.textGunmanWon;
        setTimeout(function () {
            that.gunman.classList.remove('aim');
            that.gunman.classList.add('aim-eyes-not-shine');
        }, 200);
        setTimeout(function () {
            that.gunman.classList.remove('aim-eyes-not-shine');
            that.gunman.classList.add('aim-win');

        }, 700);

        /* Logic */
        this.gameOver();

        console.log('Gunman shoot!')
    };

    Game.prototype.userScore = function() {
        this.playerScore = (((this.levels[this.currentLevel].time / 1000) - this.playerTime) * 10000) + this.levels[this.currentLevel].reward;
        this.totalScore +=  this.playerScore;
        console.log(this.playerScore);
        console.log(this.totalScore);
    };

    Game.prototype.foulPlayerShoot = function() {
        console.log('foul shoot');
    };

    Game.prototype.nextLevel = function() {
        var that = this;
        /* Sound FX */
        setTimeout(function() {
            that.soundplayerWon.play();
        }, 200);
        console.log('Good shoot');

        /* Visual FX */
        this.playerTimeBox.innerHTML = this.playerTime;
        this.messageBox.innerHTML = this.textYouWon;

        /* Logic */
        this.userScore();
        setTimeout(function(){
            that.visualReset();
        }, 1000);
        setTimeout(function() {
            that.showOverlay();
            that.startButton.innerHTML = that.textNextLevel;
            that.scoreInfo.classList.add('visible');
            that.totalScoreInfo.classList.add('visible');
            that.scoreInfoValue.innerHTML = that.playerScore;
            that.totalScoreInfoValue.innerHTML = that.totalScore;
            that.startButton.addEventListener('click', function clickStartButtonListener(){
                that.prepareToPlay();
                that.startButton.removeEventListener('click', clickStartButtonListener);
                //that.set();

            });
            that.logicReset('won');
        }, 500);
        this.clearTargets();

    };

    Game.prototype.clearTargets = function() {

        /* Visual FX */
        this.target.classList.add('hidden');
        this.failTarget.classList.add('hidden');

    };

    Game.prototype.gameOver = function() {

        /* Sound FX */
        this.soundPrepareToShoot.stop();

        /* Visual FX */


        /* Logic */
        //this.reset();
        //this.end();
    };

    Game.prototype.end = function() {
        this.foulShoot = true;
        console.log('You lose!');
        setTimeout(this.showOverlay.bind(this), 4000);
        setTimeout(this.startGame.bind(this), 6000);
    };


    Game.prototype.logicReset = function(event) {
        /* Visual FX */


        /* Logic  */
        this.playerTime = '0.00';
        this.playerScore = 0;
        this.ableToFire = false;
        this.foulShoot = false;
        clearTimeout(this.duelTimeout);
        clearTimeout(this.gunmanShootTimeout);
        this.duelTimeout = undefined;
        this.gunmanShootTimeout = undefined;

        if(event == 'lost') {
            this.currentLevel = 1;
        } else if (event == 'won') {
            this.currentLevel += 1;
            console.log(this)
        }


        console.log('logic reset func');

    };

    Game.prototype.visualReset = function() {
        /* Visual FX */
        this.gunman.classList.remove('centered', 'aim-win', 'unholster', 'fall');
        this.gunman.classList.remove(this.levels[this.currentLevel].gunmanName);

        console.log(' visual reset func');

    };


    Game.prototype.timer = function (shootTime) {
        var that = this;
        var timerCurrentTime;

        function timeCounter() {
            timerCurrentTime = new Date().getTime();

            if ((that.ableToFire == true) && (that.foulShoot == false)) {
                var res = (( timerCurrentTime - shootTime) / 1000).toFixed(2);

                setTimeout(timeCounter, 1);
                that.playerTime = res;
                //console.log(res);
            }
        }
        timeCounter();

    };



    var game = new Game();



})();
