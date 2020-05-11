webpackHotUpdate(1,{

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

var _GameBoard = __webpack_require__(190);

var _GameBoard2 = _interopRequireDefault(_GameBoard);

var _reactDom = __webpack_require__(83);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = __webpack_require__(82);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var current_user = null;
var game = (0, _jquery2.default)("#game_component").data("game");
var game_sock = 'ws://' + window.location.host + "/game/" + game + "/";

_jquery2.default.get('http://localhost:8080/current-user/?format=json', function (result) {
    // gets the current user information from Djang    current_user = result
    render_component();
});

function render_component() {
    _reactDom2.default.render(_react2.default.createElement(_GameBoard2.default, { current_user: current_user, game_id: game, socket: game_sock }), document.getElementById("game_component"));
}

/***/ })

})