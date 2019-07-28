/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

var Furry = function () {
  this.x = 0;
  this.y = 0;
  this.direction = "right";
};

var Coin = function () {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
};

var Game = function () {
  var self = this;
  this.board = document.querySelectorAll("#board>div");
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;

  this.index = function (x, y) {
    return x + y * 10;
  };

  this.showFurry = function () {
    this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
  };

  this.showCoin = function () {
    this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
  };

  this.startGame = setInterval(function () {
    self.moveFurry();
  }, 250);

  this.moveFurry = function () {
    this.hideVisibleFurry();
    var direction = this.furry.direction;

    if (direction === "right") {
      this.furry.x += 1;
    } else if (direction === "left") {
      this.furry.x -= 1;
    } else if (direction === "up") {
      this.furry.y -= 1;
    } else if (direction === "down") {
      this.furry.y += 1;
    }

    this.gameOver();
    this.showFurry();
    this.checkCoinCollision();
    document.addEventListener("keydown", function () {
      self.turnFurry(event);
    });
  };

  this.hideVisibleFurry = function () {
    var doubledFurry = document.querySelector(".furry");

    if (doubledFurry) {
      doubledFurry.classList.remove("furry");
    }
  };

  this.turnFurry = function (event) {
    switch (event.which) {
      case 37:
        this.furry.direction = "left";
        break;

      case 38:
        this.furry.direction = "up";
        break;

      case 39:
        this.furry.direction = "right";
        break;

      case 40:
        this.furry.direction = "down";
        break;
    }
  };

  this.checkCoinCollision = function () {
    if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
      this.board[this.index(this.coin.x, this.coin.y)].classList.remove("coin");
      this.score++;
      var scoreCounter = document.querySelector("#score strong");
      scoreCounter.innerText = this.score;
      this.coin = new Coin();
      this.showCoin();
    }
  };

  this.gameOver = function () {
    if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
      clearInterval(this.startGame);
      this.hideVisibleFurry();
      var over = document.getElementById("over");
      board.style.display = "none";
      over.style.display = "block";
      var button = over.querySelector("button");
      button.addEventListener("click", function () {
        location.reload();
      });
    }
  };
};

var startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", function () {
  document.querySelector("#welcome").classList.add("invisible");
  document.querySelector("#score").classList.remove("invisible");
  document.querySelector("#board").classList.remove("invisible");
  var gameNew = new Game();
  gameNew.showFurry();
  gameNew.showCoin();
  gameNew.startGame;
});

/***/ })

/******/ });
//# sourceMappingURL=out.js.map