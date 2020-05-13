webpackHotUpdate(1,{

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(25);

var _react2 = _interopRequireDefault(_react);

var _reactNotifyToast = __webpack_require__(254);

var _reactNotifyToast2 = _interopRequireDefault(_reactNotifyToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var invalid_icon = _react2.default.createElement('img', { src: '/static/img/invalid-square.png' });
var free_icon = _react2.default.createElement('img', { src: '/static/img/free-square.png' });
var fox_icon = _react2.default.createElement('img', { src: '/static/img/fox-player.png' });
var hound_icon = _react2.default.createElement('img', { src: '/static/img/hound-player.png' });
var hound_active_icon = _react2.default.createElement('img', { src: '/static/img/hound-active.png' });
var fox_active_icon = _react2.default.createElement('img', { src: '/static/img/fox-active.png' });

var GameSquare = function (_Component) {
    _inherits(GameSquare, _Component);

    function GameSquare(props) {
        _classCallCheck(this, GameSquare);

        var _this = _possibleConstructorReturn(this, (GameSquare.__proto__ || Object.getPrototypeOf(GameSquare)).call(this, props));

        _this.state = {
            owner: props.owner,
            possession_type: props.possession_type
        };
        _this.squareClicked = _this.squareClicked.bind(_this);
        return _this;
    }

    _createClass(GameSquare, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.setState({
                owner: newProps.owner,
                possession_type: newProps.possession_type
            });
        }
    }, {
        key: 'getStatus',
        value: function getStatus() {
            var claimed_icon = void 0,
                active_icon = null;

            if (this.state.owner) {
                if (this.state.owner == this.props.game_creator) {
                    claimed_icon = fox_icon;
                    active_icon = fox_active_icon;
                } else {
                    claimed_icon = hound_icon;
                    active_icon = hound_active_icon;
                }
            }

            switch (this.state.possession_type) {
                case "Claimed":
                    return claimed_icon;
                case "Active":
                    return active_icon;
                case "Free":
                    return free_icon;
                default:
                    return invalid_icon;
            }
        }
    }, {
        key: 'checkAvailable',
        value: function checkAvailable() {
            if (this.props.isPlayerTurn() && this.props.getOpponentStatus()) {
                if (this.state.owner == null && this.state.possession_type != "Invalid") {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }, {
        key: 'checkValidMove',
        value: function checkValidMove() {
            var test_val = null;

            if (this.props.isPlayerTurn()) {
                test_val = this.props.sendSocketMessage({
                    action: "check_move",
                    square_id: this.props.square_id
                });
            }
        }
    }, {
        key: 'checkActive',
        value: function checkActive() {
            if (this.props.isPlayerTurn()) {
                return this.props.getActiveStatus();
            }
        }
    }, {
        key: 'changeStatus',
        value: function changeStatus(status) {
            if (this.props.isPlayerTurn()) {
                if (this.state.owner) {
                    if (this.state.owner == this.props.getCurrentPlayerId()) {
                        this.props.sendSocketMessage({
                            action: "change_status",
                            square_id: this.props.square_id,
                            new_status: status
                        });
                    }
                }
            }
        }
    }, {
        key: 'takeOwnership',
        value: function takeOwnership() {
            if (this.props.isPlayerTurn()) {
                this.props.sendSocketMessage({
                    action: "claim_square",
                    square_id: this.props.square_id
                });
            }
        }
    }, {
        key: 'squareClicked',
        value: function squareClicked(square) {
            if (this.props.gameComplete() == false) {
                if (this.state.possession_type == "Claimed" && this.checkActive() == false) {
                    this.changeStatus("Active");
                } else if (this.state.possession_type == "Active") {
                    this.changeStatus("Claimed");
                } else if (this.state.possession_type == "Free" && this.checkActive() == true) {
                    if (this.checkAvailable()) {
                        this.takeOwnership();
                    }
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'td',
                { onClick: this.squareClicked, height: '60', width: '60' },
                this.getStatus(),
                _react2.default.createElement(
                    'div',
                    { className: 'coords' },
                    '(',
                    this.props.loc_x,
                    ', ',
                    this.props.loc_y,
                    ') '
                )
            );
        }
    }]);

    return GameSquare;
}(_react.Component);

GameSquare.propTypes = {
    loc_x: _react.PropTypes.number,
    loc_y: _react.PropTypes.number,
    square_id: _react.PropTypes.number,
    owner: _react.PropTypes.number,
    possession_type: _react.PropTypes.string,
    game_creator: _react.PropTypes.number,
    sendSocketMessage: _react.PropTypes.func,
    isPlayerTurn: _react.PropTypes.func,
    getCurrentPlayerId: _react.PropTypes.func,
    getActiveStatus: _react.PropTypes.func,
    checkActive: _react.PropTypes.func,
    gameComplete: _react.PropTypes.func
};

exports.default = GameSquare;

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeOptions = mergeOptions;
exports.defaults = void 0;

var _objectAssign = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaults = {
  wrapperId: 'notification-wrapper',
  animationDuration: 300,
  timeout: 5000,
  zIndex: 1000,
  top: 0,
  // Controls the offset from top of viewport.
  colors: {
    error: {
      color: "#FFFFFF",
      backgroundColor: '#E85742'
    },
    success: {
      color: "#FFFFFF",
      backgroundColor: '#55CA92'
    },
    warning: {
      color: "#333333",
      backgroundColor: '#F5E273'
    },
    info: {
      color: "#FFFFFF",
      backgroundColor: '#4990E2'
    }
  }
};
exports.defaults = defaults;

function mergeOptions(options) {
  exports.defaults = defaults = (0, _objectAssign["default"])(defaults, options);
}

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(119)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(256)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.notify = void 0;

var _react = _interopRequireDefault(__webpack_require__(25));

var _reactDom = _interopRequireDefault(__webpack_require__(109));

var _Toast = _interopRequireDefault(__webpack_require__(255));

var _Container = _interopRequireDefault(__webpack_require__(258));

var _defaults = __webpack_require__(252);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* Render React component */
function renderToast(text, type, timeout, color) {
  var target = document.getElementById(_defaults.defaults.wrapperId);

  _reactDom["default"].render(_react["default"].createElement(_Toast["default"], {
    text: text,
    timeout: timeout,
    type: type,
    color: color
  }), target);
}
/* Unmount React component */


function hide() {
  var target = document.getElementById(_defaults.defaults.wrapperId);

  _reactDom["default"].unmountComponentAtNode(target);
}
/**
 * Show Animated Toast Message
 * Returns true if the toast was shown, or false if show failed due to an existing notification
 *
 * @param  {String|Node} text    Text/Node to be displayed inside the toast.
 * @param  {Object}      options Display options for notification (See example below)
 *
 * [Options example]
 * {
 *   type:    {String} [success/error/info]
 *   timeout: {Int}    [timeout in ms]
 *   style:   {Object} [JS representation of CSS]
 * }
 */


function show(text, type, timeout, color) {
  if (!document.getElementById(_defaults.defaults.wrapperId).hasChildNodes()) {
    // Use default timeout if not set.
    var renderTimeout = timeout || _defaults.defaults.timeout; // Render Component with Props.

    renderToast(text, type, renderTimeout, color);

    if (renderTimeout === -1) {
      return false;
    } // Unmount react component after the animation finished.


    setTimeout(function () {
      hide();
    }, renderTimeout + _defaults.defaults.animationDuration);
    return true;
  }

  return false;
}
/**
 * Add to Animated Toast Message Queue
 * Display immediately if no queue
 * @param  {Number} initialRecallDelay   If the call to show fails because of an existing
 *                                       notification, how long to wait until we retry (ms)
 * @param  {Number} recallDelayIncrement Each time a successive call fails, the recall delay
 *                                       will be incremented by this (ms)
 * @return {[type]}                      [description]
 */


function createShowQueue() {
  var _this = this;

  var initialRecallDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  var recallDelayIncrement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  // Array to hold queued messages
  this.msgs = []; // Is the showNotify function in progress - used so we can call showNotify when a
  // message is added to an empty queue.

  this.isNotifying = false;
  this.currentRecallDelay = initialRecallDelay; // Retrieve the next message from the queue and try to show it

  this.showNotify = function () {
    // If there are no messages in the queue
    if (_this.msgs.length === 0) {
      _this.isNotifying = false;
      return;
    }

    _this.isNotifying = true;

    var current = _this.msgs.pop(); // show will now return true if it is able to send the message,
    // or false if there is an existing message


    if (show(current.text, current.type, current.timeout, current.color)) {
      _this.currentRecallDelay = initialRecallDelay;

      if (current.timeout > 0) {
        setTimeout(function () {
          return _this.showNotify();
        }, current.timeout + _defaults.defaults.animationDuration);
      }
    } else {
      // If message show failed, re-add the current message to the front of the queue
      _this.msgs.unshift(current);

      setTimeout(function () {
        return _this.showNotify();
      }, _this.currentRecallDelay);
      _this.currentRecallDelay += recallDelayIncrement;
    }
  };

  return function (text) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _defaults.defaults.timeout;
    var color = arguments.length > 3 ? arguments[3] : undefined;

    _this.msgs.push({
      text: text,
      type: type,
      timeout: timeout,
      color: color
    });

    if (!_this.isNotifying) {
      _this.showNotify();
    }
  };
}
/* Export notification functions */


var notify = {
  show: show,
  hide: hide,
  createShowQueue: createShowQueue
};
exports.notify = notify;
var _default = _Container["default"];
exports["default"] = _default;

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(25));

var _propTypes = _interopRequireDefault(__webpack_require__(253));

var _objectAssign = _interopRequireDefault(__webpack_require__(5));

var _defaults = __webpack_require__(252);

var _stylesheet = _interopRequireDefault(__webpack_require__(257));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* React Notification Component */
var Toast =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Toast, _React$Component);

  function Toast() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Toast);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Toast)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      containerStyle: _stylesheet["default"].styles.container
    });

    return _this;
  }

  _createClass(Toast, [{
    key: "getToastStyle",
    value: function getToastStyle() {
      var _this$props = this.props,
          type = _this$props.type,
          color = _this$props.color;
      var styles = _stylesheet["default"].styles;
      var contentStyle = {};
      /* If type is set, merge toast action styles with base */

      switch (type) {
        case 'success':
        case 'error':
        case 'warning':
        case 'info':
          contentStyle = (0, _objectAssign["default"])({}, styles.content, _defaults.defaults.colors[type]);
          break;

        case 'custom':
          {
            var customStyle = {
              backgroundColor: color.background,
              color: color.text
            };
            contentStyle = (0, _objectAssign["default"])({}, styles.content, customStyle);
          }
          break;

        default:
          contentStyle = (0, _objectAssign["default"])({}, styles.content);
          break;
      }

      return contentStyle;
    }
  }, {
    key: "animateState",
    value: function animateState() {
      var _this2 = this;

      var styles = _stylesheet["default"].styles; // Show

      setTimeout(function () {
        _this2.updateStyle(styles.show);
      }, 100); // wait 100ms after the component is called to animate toast.
      // Timeout -1 displays toast as a persistent notification

      if (this.props.timeout === -1) {
        return;
      } // Hide after timeout


      setTimeout(function () {
        _this2.updateStyle(styles.hide);
      }, this.props.timeout);
    } // Updates the style of the container with styles for a state (hide/show).
    // This triggers animations.

  }, {
    key: "updateStyle",
    value: function updateStyle(stateStyle) {
      var styles = _stylesheet["default"].styles;
      this.setState({
        containerStyle: (0, _objectAssign["default"])({}, styles.container, stateStyle)
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.animateState();
    }
  }, {
    key: "render",
    value: function render() {
      var text = this.props.text;
      var containerStyle = this.state.containerStyle;
      return _react["default"].createElement("div", {
        className: "toast-notification",
        style: containerStyle
      }, _react["default"].createElement("span", {
        style: this.getToastStyle()
      }, text));
    }
  }]);

  return Toast;
}(_react["default"].Component);

_defineProperty(Toast, "propTypes", {
  text: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
  timeout: _propTypes["default"].number,
  type: _propTypes["default"].string,
  color: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string]),
  style: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].bool])
});

var _default = Toast;
exports["default"] = _default;

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(69);

function emptyFunction() {}

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defaults = __webpack_require__(252);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This was created as an ES6 class with a getter for the styles to allow for recomputing
 * dynamic values on each usage without calling a function.
 */
var Stylesheet =
/*#__PURE__*/
function () {
  function Stylesheet() {
    _classCallCheck(this, Stylesheet);
  }

  _createClass(Stylesheet, [{
    key: "styles",
    get: function get() {
      return {
        container: {
          position: 'fixed',
          width: '50%',
          margin: '0 auto',
          right: '0px',
          top: _defaults.defaults.top,
          left: '0px',
          textAlign: 'center',
          zIndex: _defaults.defaults.zIndex,
          pointerEvents: 'none',
          transition: 'all ' + _defaults.defaults.animationDuration + 'ms ease',
          transform: 'translateY(-100%)',
          // Vendor Prefixes
          msTransition: 'all ' + _defaults.defaults.animationDuration + 'ms ease',
          msTransform: 'translateY(-100%)',
          WebkitTransition: 'all ' + _defaults.defaults.animationDuration + 'ms ease',
          WebkitTransform: 'translateY(-100%)',
          OTransition: 'all ' + _defaults.defaults.animationDuration + 'ms ease',
          OTransform: 'translateY(-100%)',
          MozTransition: 'all ' + _defaults.defaults.animationDuration + 'ms ease',
          MozTransform: 'translateY(-100%)'
        },
        content: {
          cursor: 'pointer',
          display: 'inline-block',
          width: 'auto',
          borderRadius: '0 0 4px 4px',
          backgroundColor: 'white',
          padding: '10px 30px',
          pointerEvents: 'all'
        },
        show: {
          transform: 'translateY(0)',
          msTransform: 'translateY(0)',
          WebkitTransform: 'translateY(0)',
          OTransform: 'translateY(0)',
          MozTransform: 'translateY(0)'
        },
        hide: {
          transform: 'translateY(-100%)',
          msTransform: 'translateY(-100%)',
          WebkitTransform: 'translateY(-100%)',
          OTransform: 'translateY(-100%)',
          MozTransform: 'translateY(-100%)'
        }
      };
    }
  }]);

  return Stylesheet;
}();

var _default = new Stylesheet();

exports["default"] = _default;

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(25));

var _propTypes = _interopRequireDefault(__webpack_require__(253));

var _defaults = __webpack_require__(252);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* Export notification container */
var _default =
/*#__PURE__*/
function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, _getPrototypeOf(_default).apply(this, arguments));
  }

  _createClass(_default, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _defaults.mergeOptions)(this.props.options);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        id: _defaults.defaults.wrapperId
      });
    }
  }]);

  return _default;
}(_react["default"].Component);

exports["default"] = _default;

_defineProperty(_default, "propTypes", {
  options: _propTypes["default"].object
});

_defineProperty(_default, "defaultProps", {
  options: {}
});

/***/ })

})