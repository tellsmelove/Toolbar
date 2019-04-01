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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/jolli/js/app.js":
/*!*****************************!*\
  !*** ./src/jolli/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// $(document).ready(() => {
//     var main_slider = new Swiper('.swiper-main', {
//         slidesPerView: 1,
//         spaceBetween: 30,
//         loop: true,
//         autoHeight: true,
//         autoplay: {
//             delay: 5000,
//         },
//         navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//         },
//     });
//     $("#flip").click(function () {
//         $("#panel").slideToggle("slow");
//     });
// })
var ballCanvas;

window.onload = function () {
  ballCanvas = new ballCanvas();
  ballCanvas.redraw(window.innerWidth, window.innerHeight);
};

function ballCanvas() {
  this.bouncyBallList = [];
  this.canvas = document.getElementById("bouncyBall");
  this.ctx = this.canvas.getContext("2d");
  requestAnimFrame(this.animate.bind(this));
}

ballCanvas.prototype.density = function () {
  return Math.floor(Math.sqrt((this.canvas.height, this.canvas.width) * 3));
};

ballCanvas.prototype.redraw = function (width, height) {
  this.bouncyBallList = [];
  this.canvas.width = width;
  this.canvas.height = height;
  spawnBalls();
};

ballCanvas.prototype.animate = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ballCanvas.bouncyBallList.forEach(function (ball) {
    ball.update();
  });
  requestAnimFrame(this.animate.bind(this));
};

bouncyBall.prototype.seekLines = function () {
  for (var i = 0; i < ballCanvas.bouncyBallList.length; i++) {
    var dx = ballCanvas.bouncyBallList[i].spawnX - this.spawnX;
    var dy = ballCanvas.bouncyBallList[i].spawnY - this.spawnY;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (ballCanvas.bouncyBallList[i] != this && ballCanvas.bouncyBallList[i].linkedbouncyBalls != null && distance < ballCanvas.density() && !this.linkedbouncyBalls.includes(ballCanvas.bouncyBallList[i])) {
      ballCanvas.drawLine(this.spawnX, this.spawnY, ballCanvas.bouncyBallList[i].spawnX, ballCanvas.bouncyBallList[i].spawnY, distance);
      this.linkedbouncyBalls.push(ballCanvas.bouncyBallList[i]);
    }
  }
};

ballCanvas.prototype.drawLine = function (startX, startY, endX, endY, distance) {
  distance = (1.0 / distance * 10).toFixed(2);
  this.ctx.beginPath();
  this.ctx.moveTo(startX, startY);
  this.ctx.lineTo(endX, endY);
  this.ctx.strokeStyle = "rgba(215, 215, 215," + distance + ")";
  this.ctx.lineWidth = 0.5;
  this.ctx.stroke();
};

ballCanvas.prototype.drawBall = function (ball) {
  this.ctx.beginPath();
  this.ctx.arc(ball.spawnX, ball.spawnY, ball.size, 0, 2 * Math.PI);
  this.ctx.fillStyle = "rgba(215, 215, 215, 0.7)";
  this.ctx.fill();
  this.ctx.strokeStyle = "rgba(215, 215, 215, 0.7)";
  this.ctx.stroke();
};

function bouncyBall(spawnX, spawnY) {
  if (spawnX && spawnY) {
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.wasSpawnedByClick = true;
  } else {
    this.spawnX = Math.floor(Math.random() * ballCanvas.canvas.width);
    this.spawnY = Math.floor(Math.random() * ballCanvas.canvas.height);
  }

  this.speedX = Math.random() * generateDecimalBetween(-1.0, 1.0);
  this.speedY = Math.random() * generateDecimalBetween(-1.0, 1.0);
  this.size = generateDecimalBetween(0.5, 1.3);
  ballCanvas.bouncyBallList.push(this);
}

bouncyBall.prototype.doesBallIntersectCanvasBoundary = function () {
  return this.spawnX < 0 + this.size || this.spawnX > ballCanvas.canvas.width - this.size || this.spawnY < 0 + this.size || this.spawnY > ballCanvas.canvas.height - this.size;
};

bouncyBall.prototype.update = function () {
  this.spawnX = this.spawnX - this.speedX;
  this.spawnY = this.spawnY - this.speedY;

  if (this.doesBallIntersectCanvasBoundary() && this.wasSpawnedByClick) {
    ballCanvas.bouncyBallList.splice(ballCanvas.bouncyBallList.indexOf(this), 1);
    return;
  }

  if (this.spawnX < 0 + this.size || this.spawnX > ballCanvas.canvas.width - this.size) {
    this.speedX = this.speedX * -1;
  } else if (this.spawnY < 0 + this.size || this.spawnY > ballCanvas.canvas.height - this.size) {
    this.speedY = this.speedY * -1;
  }

  this.linkedbouncyBalls = [];
  this.seekLines();
  ballCanvas.drawBall(this);
};

function spawnBalls() {
  for (var i = 0; i < ballCanvas.density(); i++) {
    new bouncyBall();
  }
}

function generateDecimalBetween(minimum, maximum) {
  return (Math.random() * (minimum - maximum) + maximum).toFixed(2);
}

;
document.addEventListener('click', function (evt) {
  spawnBallsFromClick(evt.x, evt.y);
}, false);
document.addEventListener("touchstart", function (evt) {
  spawnBallsFromClick(evt.touches[0].pageX, evt.touches[0].pageY);
}, false);

function spawnBallsFromClick(x, y) {
  for (var i = 0; i < 3; i++) {
    new bouncyBall(x, y);
  }
}

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

/***/ }),

/***/ "./src/jolli/sass/app.scss":
/*!*********************************!*\
  !*** ./src/jolli/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./src/jolli/js/app.js ./src/jolli/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/kimtrong/learning/Vuta/Jollibee/Jolli/src/jolli/js/app.js */"./src/jolli/js/app.js");
module.exports = __webpack_require__(/*! /home/kimtrong/learning/Vuta/Jollibee/Jolli/src/jolli/sass/app.scss */"./src/jolli/sass/app.scss");


/***/ })

/******/ });