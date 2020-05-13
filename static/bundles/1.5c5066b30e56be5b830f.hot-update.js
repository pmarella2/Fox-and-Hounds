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
            if (this.props.isPlayerTurn()) {
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
            if (this.props.gameComplete() == false && this.props.getOpponentStatus()) {
                _reactNotifyToast.notify.show('Toasty!');
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

/***/ })

})