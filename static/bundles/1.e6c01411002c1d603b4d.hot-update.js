webpackHotUpdate(1,{

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(25);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(109);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _browser = __webpack_require__(210);

var Sentry = _interopRequireWildcard(_browser);

var _GameBoard = __webpack_require__(248);

var _GameBoard2 = _interopRequireDefault(_GameBoard);

var _jquery = __webpack_require__(108);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Sentry.init({ dsn: "https://1295e0eabb06407d87a710850f4c5540@o374711.ingest.sentry.io/5236901" });

var current_user = null;
var game = (0, _jquery2.default)("#game_component").data("game");
//var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
//var game_sock = ws_scheme + "://" + window.location.host + "/game/" + game + "/"
var game_sock = 'ws://' + window.location.host + "/game/" + game + "/";

_jquery2.default.get('http://localhost:8080/current-user/?format=json', function (result) {
    current_user = result;
    render_component();
});

function render_component() {
    _reactDom2.default.render(_react2.default.createElement(_GameBoard2.default, { current_user: current_user, game_id: game, socket: game_sock }), document.getElementById("game_component"));
}

/***/ })

})