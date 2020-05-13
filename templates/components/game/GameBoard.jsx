import React, { Component, PropTypes } from 'react'
import GameSquare from './GameSquare'
import GameLog from './GameLog'
import $ from 'jquery'
import Websocket from 'react-websocket'

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            game: null,
            squares: null,
            log: null
        }

        this.sendSocketMessage = this.sendSocketMessage.bind(this)
        this.isPlayerTurn = this.isPlayerTurn.bind(this)
        this.getCurrentPlayerId = this.getCurrentPlayerId.bind(this)
        this.getActiveStatus = this.getActiveStatus.bind(this)
        this.getOpponentStatus = this.getOpponentStatus.bind(this)
        this.gameComplete = this.gameComplete.bind(this)
    }

    componentDidMount() {
        this.getGame()
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    getGame() {
        const game_url = 'https://localhost:8080/game-from-id/' + this.props.game_id
        this.serverRequest = $.get(game_url, function (result) {
            this.setState({
                game: result.game,
                log: result.log,
                squares: result.squares,
            })
        }.bind(this))
    }

    getSquares() {
        const squares_url = 'https://localhost:8080/game-squares/' + this.props.game_id
        this.serverRequest = $.get(squares_url, function (result) {
            console.log(result)
        }.bind(this))
    }

    handleData(data) {
        let result = JSON.parse(data)
        this.setState({
            game: result.game,
            squares: result.squares,
            log: result.log
        })

    }

    sendSocketMessage(message) {
        const socket = this.refs.socket
        socket.state.ws.send(JSON.stringify(message))
    }

    isPlayerTurn() {
        if (this.props.current_user.id == this.state.game.current_turn.id) {
            return true
        } else {
            return false
        }
    }

    gameComplete() {
        return this.state.game.game_over
    }

    getActiveStatus() {
        return this.state.game.active
    }

    getCurrentPlayerId() {
        return this.state.game.current_turn.id
    }

    getOpponentStatus() {
        if (this.state.game.opponent != null) {
            return true
        } else {
            return false
        }
    }

    renderRow(row_num, cols) {

        let row = cols.map(function (square) {

            return <GameSquare game_creator={this.state.game.creator.id}
                key={square.id}
                owner={square.owner}
                square_id={square.id}
                possession_type={square.status}
                loc_x={parseInt(square.col)}
                loc_y={parseInt(square.row)}
                sendSocketMessage={this.sendSocketMessage}
                isPlayerTurn={this.isPlayerTurn}
                getCurrentPlayerId={this.getCurrentPlayerId}
                getActiveStatus={this.getActiveStatus}
                getOpponentStatus={this.getOpponentStatus}
                gameComplete={this.gameComplete}
            />
        }.bind(this))

        return (
            <tr key={row_num}>{row}</tr>
        )
    }

    renderBoard() {
        let board = []
        let cur_row = -1

        if (this.state.game != null && this.state.squares != null) {

            board = this.state.squares.map(function (square) {
                if (square.row != cur_row) {
                    cur_row = square.row
                    let row_cols = this.state.squares.filter(function (c) {
                        if (c.row == cur_row) {
                            return c
                        }
                    })
                    return this.renderRow(cur_row, row_cols)
                }

            }, this)

        } else {
            board = 'Loading the board...'
        }
        return board
    }

    currentTurn() {
        if (this.state.game) {
            if (this.state.game.completed != null) {
                return <h3>The Winner: <span className="text-primary">{(this.state.game.winner.username)}</span></h3>
            } else {
                return <h3>Current Turn:
                    <span className="text-primary">{(this.state.game.current_turn.username)}</span>
                </h3>
            }
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    {this.currentTurn()}
                    <table>
                        <tbody>
                            {this.renderBoard()}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-8">
                    <GameLog sendSocketMessage={this.sendSocketMessage}
                        log_entries={this.state.log}
                        game_id={this.props.game_id} />
                </div>
                <Websocket ref="socket" url={this.props.socket}
                    onMessage={this.handleData.bind(this)} reconnect={true} />
            </div>
        )
    }
}

GameBoard.propTypes = {
    game_id: PropTypes.number,
    socket: PropTypes.string,
    current_user: PropTypes.object
}

export default GameBoard