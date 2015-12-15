// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }



    var startButton = document.querySelector('.start-game');
    var overlay = document.querySelector('.overlay');
    var gunman = document.querySelector('.gunman');
    var userStatus = false;

    /* Sounds */
    //var soundDeath = new Audio('sound/death.mp3');
    //var soundFire = new Audio('sound/fire.m4a');
    var soundFire = new Audio('sound/fire.mp3');
    var soundTitle = new Audio('sound/title.mp3');
    var soundIntro = new Audio('sound/one-outlaw-intro.mp3');
    var soundPrepareToShoot = new Audio('sound/prepare-to-shoot.mp3');
    //var soundWin = new Audio('sound/win.mp3');

    /* Messages */

    var textReady = 'Ready?';
    var textFire = 'Fire!';
    var textYouWon = 'You won!';
    var textGunmanWon = 'Gunman won!';

    var soundState = false;



    if(soundState) {
        soundTitle.play();
    }

    function level(person, shootTime) {
        var self = this;
        self.name = person;
        self.shootTime = shootTime;
        self.initPerson = function() {
            gunman.classList.add(person);
            self.move();
            self.walk();
        };

        self.move = function() {
            gunman.classList.add('move');
            gunman.classList.add('centered');
            gunman.addEventListener('transitionend', self.stay);
        };

        self.walk = function() {
            gunman.classList.add('walk');
            if(soundState) {
                soundTitle.pause();
                soundIntro.play();
            }
        };

        self.stay = function() {
            gunman.classList.add('stay');
            gunman.classList.remove('walk');
            gunman.classList.remove('move');
            if(soundState) {
                soundIntro.pause();
                soundPrepareToShoot.play();
            }
            self.readyToShoot();
        };

        self.readyToShoot = function() {
            console.log('ready');
            setTimeout(self.shoot, 2500);
        };

        self.shoot = function() {
            var oldTime = new Date().getTime();
            var x = gunman.addEventListener('click', timeCounter);
            console.log(x);

            if(soundState) {
                soundPrepareToShoot.pause();
                soundFire.play();
            }
            console.log('fire');
        }
    }

    var level1 = new level('billy', 1500);
    var level2 = new level('bob', 1100);

    function startGame() {
        hideOverlay();
        initLevel(level1);
    }

    function initLevel(level) {
        var gunmanClass = level.name;
        level.initPerson();

    }

    function cons() {
        console.log('shoot!!!');
    }


    function timeCounter(e) {
        var newTime = new Date().getTime();
        //var shootTime = newTime - oldTime;
        console.log(e);

    }

    function hideOverlay() {
        overlay.classList.add('hide');
    }

    function showOverlay() {
        overlay.classList.remove('hide');
    }
}());



