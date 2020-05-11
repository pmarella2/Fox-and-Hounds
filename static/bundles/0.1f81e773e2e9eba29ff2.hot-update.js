webpackHotUpdate(0,{

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

var _LobbyBase = __webpack_require__(186);

var _LobbyBase2 = _interopRequireDefault(_LobbyBase);

var _reactDom = __webpack_require__(83);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = __webpack_require__(82);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lobby_sock = 'ws://' + window.location.host + "/lobby/";
var current_user = null;

_jquery2.default.get('http://localhost:8080/current-user/?format=json', function (result) {
    current_user = result;
    render_component();
});

function render_component() {
    _reactDom2.default.render(_react2.default.createElement(_LobbyBase2.default, { current_user: current_user, socket: lobby_sock }), document.getElementById('lobby_component'));
}

/***/ })

})