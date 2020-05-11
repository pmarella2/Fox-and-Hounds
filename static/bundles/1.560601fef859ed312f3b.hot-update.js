webpackHotUpdate(1,{

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

var _GameSquare = __webpack_require__(191);

var _GameSquare2 = _interopRequireDefault(_GameSquare);

var _GameLog = __webpack_require__(192);

var _GameLog2 = _interopRequireDefault(_GameLog);

var _jquery = __webpack_require__(82);

var _jquery2 = _interopRequireDefault(_jquery);

var _reactWebsocket = __webpack_require__(184);

var _reactWebsocket2 = _interopRequireDefault(_reactWebsocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameBoard = function (_Component) {
    _inherits(GameBoard, _Component);

    function GameBoard(props) {
        _classCallCheck(this, GameBoard);

        var _this = _possibleConstructorReturn(this, (GameBoard.__proto__ || Object.getPrototypeOf(GameBoard)).call(this, props));

        _this.state = {
            game: null,
            squares: null,
            log: null
        };

        _this.sendSocketMessage = _this.sendSocketMessage.bind(_this);
        _this.isPlayerTurn = _this.isPlayerTurn.bind(_this);
        _this.getCurrentPlayerId = _this.getCurrentPlayerId.bind(_this);
        _this.getActiveStatus = _this.getActiveStatus.bind(_this);
        _this.getOpponentStatus = _this.getOpponentStatus.bind(_this);
        _this.gameComplete = _this.gameComplete.bind(_this);
        return _this;
    }

    _createClass(GameBoard, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getGame();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.serverRequest.abort();
        }
    }, {
        key: 'getGame',
        value: function getGame() {
            var game_url = 'http://localhost:8080/game-from-id/' + this.props.game_id;
            this.serverRequest = _jquery2.default.get(game_url, function (result) {
                this.setState({
                    game: result.game,
                    log: result.log,
                    squares: result.squares
                });
            }.bind(this));
        }
    }, {
        key: 'getSquares',
        value: function getSquares() {
            var squares_url = 'http://localhost:8080/game-squares/' + this.props.game_id;
            this.serverRequest = _jquery2.default.get(squares_url, function (result) {
                console.log(result);
            }.bind(this));
        }
    }, {
        key: 'handleData',
        value: function handleData(data) {
            var result = JSON.parse(data);
            this.setState({
                game: result.game,
                squares: result.squares,
                log: result.log
            });
        }
    }, {
        key: 'sendSocketMessage',
        value: function sendSocketMessage(message) {
            var socket = this.refs.socket;
            socket.state.ws.send(JSON.stringify(message));
        }
    }, {
        key: 'isPlayerTurn',
        value: function isPlayerTurn() {
            if (this.props.current_user.id == this.state.game.current_turn.id) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'gameComplete',
        value: function gameComplete() {
            return this.state.game.game_over;
        }
    }, {
        key: 'getActiveStatus',
        value: function getActiveStatus() {
            return this.state.game.active;
        }
    }, {
        key: 'getCurrentPlayerId',
        value: function getCurrentPlayerId() {
            return this.state.game.current_turn.id;
        }
    }, {
        key: 'getOpponentStatus',
        value: function getOpponentStatus() {
            if (this.state.game.opponent != null) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'renderRow',
        value: function renderRow(row_num, cols) {

            var row = cols.map(function (square) {

                return _react2.default.createElement(_GameSquare2.default, { game_creator: this.state.game.creator.id,
                    key: square.id,
                    owner: square.owner,
                    square_id: square.id,
                    possession_type: square.status,
                    loc_x: parseInt(square.col),
                    loc_y: parseInt(square.row),
                    sendSocketMessage: this.sendSocketMessage,
                    isPlayerTurn: this.isPlayerTurn,
                    getCurrentPlayerId: this.getCurrentPlayerId,
                    getActiveStatus: this.getActiveStatus,
                    getOpponentStatus: this.getOpponentStatus,
                    gameComplete: this.gameComplete
                });
            }.bind(this));

            return _react2.default.createElement(
                'tr',
                { key: row_num },
                row
            );
        }
    }, {
        key: 'renderBoard',
        value: function renderBoard() {
            var board = [];
            var cur_row = -1;
            if (this.state.game != null && this.state.squares != null) {
                board = this.state.squares.map(function (square) {
                    if (square.row != cur_row) {
                        cur_row = square.row;
                        var row_cols = this.state.squares.filter(function (c) {
                            if (c.row == cur_row) {
                                return c;
                            }
                        });
                        return this.renderRow(cur_row, row_cols);
                    }
                }, this);
            } else {
                board = 'Loading the board...';
            }
            return board;
        }
    }, {
        key: 'currentTurn',
        value: function currentTurn() {
            if (this.state.game) {
                if (this.state.game.completed != null) {
                    // game is over
                    return _react2.default.createElement(
                        'h3',
                        null,
                        'The Winner: ',
                        _react2.default.createElement(
                            'span',
                            { className: 'text-primary' },
                            this.state.game.winner.username
                        )
                    );
                } else {
                    return _react2.default.createElement(
                        'h3',
                        null,
                        'Current Turn:',
                        _react2.default.createElement(
                            'span',
                            { className: 'text-primary' },
                            this.state.game.current_turn.username
                        )
                    );
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    this.currentTurn(),
                    _react2.default.createElement(
                        'table',
                        null,
                        _react2.default.createElement(
                            'tbody',
                            null,
                            this.renderBoard()
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-6' },
                    _react2.default.createElement(_GameLog2.default, { sendSocketMessage: this.sendSocketMessage,
                        log_entries: this.state.log,
                        game_id: this.props.game_id })
                ),
                _react2.default.createElement(_reactWebsocket2.default, { ref: 'socket', url: this.props.socket,
                    onMessage: this.handleData.bind(this), reconnect: true })
            );
        }
    }]);

    return GameBoard;
}(_react.Component);

GameBoard.propTypes = {
    game_id: _react.PropTypes.number,
    socket: _react.PropTypes.string,
    current_user: _react.PropTypes.object
};

exports.default = GameBoard;

/***/ })

})