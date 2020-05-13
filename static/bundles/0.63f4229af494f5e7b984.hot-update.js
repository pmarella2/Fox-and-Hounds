webpackHotUpdate(0,{

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(25);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerGames = function (_React$Component) {
    _inherits(PlayerGames, _React$Component);

    function PlayerGames(props) {
        _classCallCheck(this, PlayerGames);

        var _this = _possibleConstructorReturn(this, (PlayerGames.__proto__ || Object.getPrototypeOf(PlayerGames)).call(this, props));

        _this.state = {
            game_list: _this.props.game_list
        };

        _this.onCreateGameClick = _this.onCreateGameClick.bind(_this);
        _this.renderButton = _this.renderButton.bind(_this);
        _this.renderOpponent = _this.renderOpponent.bind(_this);
        return _this;
    }

    _createClass(PlayerGames, [{
        key: "onCreateGameClick",
        value: function onCreateGameClick(event) {
            this.props.sendSocketMessage({ action: "create_game" });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProp) {
            this.setState({ game_list: newProp.game_list });
        }
    }, {
        key: "renderButton",
        value: function renderButton(game) {
            if (game.completed) {
                return "View";
            } else if (game.opponent == null && game.creator.id == this.props.player.id) {
                return "Waiting...";
            } else {
                return "Play";
            }
        }
    }, {
        key: "renderOpponent",
        value: function renderOpponent(game) {
            if (game.opponent != null) {
                return game.opponent.username;
            } else {
                return "???";
            }
        }
    }, {
        key: "renderGameList",
        value: function renderGameList() {
            if (this.props.game_list.length > 0) {
                return this.props.game_list.map(function (game) {
                    if (game.game_over !== "True") return _react2.default.createElement(
                        "li",
                        { key: game.id, className: "list-group-item" },
                        _react2.default.createElement(
                            "span",
                            { className: "badge float-left" },
                            game.id
                        ),
                        "\xA0\xA0",
                        _react2.default.createElement(
                            "span",
                            null,
                            game.creator.username
                        ),
                        " vs ",
                        _react2.default.createElement(
                            "span",
                            null,
                            this.renderOpponent(game)
                        ),
                        _react2.default.createElement(
                            "a",
                            { className: "btn btn-sm btn-primary float-right", href: "/game/" + game.id + "/" },
                            this.renderButton(game)
                        )
                    );
                }, this);
            } else {
                return "No games to list!";
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    { className: "panel panel-primary" },
                    _react2.default.createElement(
                        "div",
                        { className: "panel-heading" },
                        _react2.default.createElement(
                            "span",
                            null,
                            "Your Pending Games"
                        ),
                        _react2.default.createElement(
                            "a",
                            { href: "#", className: "float-right badge", onClick: this.onCreateGameClick, id: "create_game" },
                            "Start a New Game"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "panel-body" },
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "ul",
                                { className: "list-group games-list" },
                                this.renderGameList()
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PlayerGames;
}(_react2.default.Component);

PlayerGames.defaultProps = {};

PlayerGames.propTypes = {
    game_list: _react2.default.PropTypes.array,
    player: _react2.default.PropTypes.object
};

exports.default = PlayerGames;

/***/ })

})