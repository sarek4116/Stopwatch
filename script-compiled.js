"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Stopwatch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch() {
    var _this;

    _classCallCheck(this, Stopwatch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Stopwatch).call(this));
    _this.state = {
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "reset",
    value: function reset() {
      this.setState({
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      });
    }
  }, {
    key: "addResult",
    value: function addResult() {
      var results = document.querySelector('.results');
      var newLi = document.createElement('li');
      newLi.innerHTML = this.format(this.times);
      results.appendChild(newLi);
    }
  }, {
    key: "clearResult",
    value: function clearResult() {
      var results = document.querySelector('.results');
      results.innerHTML = '';
    }
  }, {
    key: "format",
    value: function format(times) {
      return "".concat(pad0(times.minutes), ":").concat(pad0(times.seconds), ":").concat(pad0(Math.floor(times.miliseconds)));
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.state.running = true;
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var miliseconds = this.state.miliseconds + 1,
          seconds = this.state.seconds,
          minutes = this.state.minutes;

      if (miliseconds >= 100) {
        seconds += 1;
        miliseconds = 0;
      }

      if (seconds == 60) {
        minutes += 1;
        seconds = 0;
        miliseconds = 0;
      }

      this.setState({
        minutes: minutes,
        seconds: seconds,
        miliseconds: miliseconds
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setState({
        running: false
      });
      clearInterval(this.watch);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement("div", {
        className: 'wrapper'
      }, React.createElement("nav", {
        className: 'controls'
      }, React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          _this3.start();
        }
      }, "Start"), React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          _this3.stop();
        }
      }, "Stop"), React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          _this3.reset();
        }
      }, "Restart"), React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          stopwatch.clearResult();
        }
      }, "Clear Result"), React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          _this3.addResult();
        }
      }, "Add Result")), React.createElement("div", {
        className: 'stopwatch'
      }, this.format({
        minutes: this.state.minutes,
        seconds: this.state.seconds,
        miliseconds: this.state.miliseconds
      })), React.createElement("ul", {
        className: 'results'
      }));
    }
  }]);

  return Stopwatch;
}(React.Component);

function pad0(value) {
  var result = value.toString();

  if (result.length < 2) {
    result = '0' + result;
  }

  return result;
}

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById('app'));
