webpackHotUpdate(0,{

/***/ 247:
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

var CompletedGames = function (_React$Component) {
    _inherits(CompletedGames, _React$Component);

    function CompletedGames(props) {
        _classCallCheck(this, CompletedGames);

        var _this = _possibleConstructorReturn(this, (CompletedGames.__proto__ || Object.getPrototypeOf(CompletedGames)).call(this, props));

        _this.state = {
            game_list: _this.props.game_list
        };
        _this.renderGameList = _this.renderGameList.bind(_this);
        return _this;
    }

    _createClass(CompletedGames, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProp) {
            this.setState({ game_list: newProp.game_list });
        }
    }, {
        key: "renderGameList",
        value: function renderGameList() {
            var player_removed = this.props.game_list.filter(function (game) {
                return game.winner !== null;
            }, this);

            if (player_removed.length > 0) {
                return player_removed.map(function (game) {
                    if (game.winner.id == this.props.player.id) {
                        return _react2.default.createElement(
                            "li",
                            { key: game.id, className: "list-group-item" },
                            _react2.default.createElement(
                                "span",
                                { className: "badge float-left" },
                                game.id,
                                " "
                            ),
                            "\xA0 \xA0",
                            _react2.default.createElement(
                                "span",
                                null,
                                game.creator.username,
                                " vs ",
                                game.opponent.username
                            ),
                            _react2.default.createElement(
                                "span",
                                null,
                                _react2.default.createElement("br", null),
                                "Your Result: WIN"
                            ),
                            _react2.default.createElement(
                                "a",
                                { className: "btn btn-sm btn-primary float-right", href: "/game/" + game.id + "/" },
                                "View"
                            )
                        );
                    } else {
                        return _react2.default.createElement(
                            "li",
                            { key: game.id, className: "list-group-item" },
                            _react2.default.createElement(
                                "span",
                                { className: "badge float-left" },
                                game.id,
                                " "
                            ),
                            "\xA0 \xA0",
                            _react2.default.createElement(
                                "span",
                                null,
                                game.creator.username,
                                " vs ",
                                game.opponent.username
                            ),
                            _react2.default.createElement(
                                "span",
                                null,
                                _react2.default.createElement("br", null),
                                "Your Result: "
                            ),
                            _react2.default.createElement(
                                "span",
                                { style: { color: red } },
                                "LOSS"
                            ),
                            _react2.default.createElement(
                                "a",
                                { className: "btn btn-sm btn-primary float-right", href: "/game/" + game.id + "/" },
                                "View"
                            )
                        );
                    }
                }, this);
            } else {
                return "No completed games!";
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
                            "Your Completed Games"
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

    return CompletedGames;
}(_react2.default.Component);

CompletedGames.defaultProps = {};

CompletedGames.propTypes = {
    game_list: _react2.default.PropTypes.array,
    player: _react2.default.PropTypes.object

};

exports.default = CompletedGames;

/***/ })

})