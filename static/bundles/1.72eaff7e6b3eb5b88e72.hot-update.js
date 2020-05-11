webpackHotUpdate(1,{

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameLog = function (_Component) {
    _inherits(GameLog, _Component);

    function GameLog(props) {
        _classCallCheck(this, GameLog);

        var _this = _possibleConstructorReturn(this, (GameLog.__proto__ || Object.getPrototypeOf(GameLog)).call(this, props));

        _this.state = {
            log_entries: props.log_entries
        };
        return _this;
    }

    _createClass(GameLog, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            this.setState({
                log_entries: newProps.log_entries
            });
        }
    }, {
        key: "renderLogEntry",
        value: function renderLogEntry(entry) {
            var log_sender = "System";
            if (entry.player != null) {
                log_sender = entry.player.username;
            }
            return _react2.default.createElement(
                "li",
                { key: entry.id, className: "list-group-item" },
                _react2.default.createElement(
                    "span",
                    { className: "badge pull-left player-badge " },
                    log_sender
                ),
                _react2.default.createElement(
                    "span",
                    null,
                    entry.text
                )
            );
        }
    }, {
        key: "renderLog",
        value: function renderLog() {

            if (this.state.log_entries) {
                return this.state.log_entries.map(function (entry) {
                    return this.renderLogEntry(entry);
                }.bind(this));
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "h3",
                    null,
                    "Game Log"
                ),
                _react2.default.createElement(
                    "ul",
                    { className: "list-group" },
                    this.renderLog()
                )
            );
        }
    }]);

    return GameLog;
}(_react.Component);

GameLog.propTypes = {
    log_entries: _react.PropTypes.array,
    sendSocketMessage: _react.PropTypes.func
};

exports.default = GameLog;

/***/ })

})