import React, { Component, PropTypes } from 'react'

const invalid_icon = <img src="/static/img/invalid-square.png" />
const free_icon = <img src="/static/img/free-square.png" />
const fox_icon = <img src="/static/img/fox-player.png" />
const hound_icon = <img src="/static/img/hound-player.png" />
const hound_active_icon = <img src="/static/img/hound-active.png" />
const fox_active_icon = <img src="/static/img/fox-active.png" />

class GameSquare extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: props.owner,
            possession_type: props.possession_type,
        }
        this.squareClicked = this.squareClicked.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            owner: newProps.owner,
            possession_type: newProps.possession_type
        })
    }

    getStatus() {
        let claimed_icon, active_icon = null

        if (this.state.owner) {
            if (this.state.owner == this.props.game_creator) {
                claimed_icon = fox_icon
                active_icon = fox_active_icon
            } else {
                claimed_icon = hound_icon
                active_icon = hound_active_icon
            }
        }

        switch (this.state.possession_type) {
            case "Claimed":
                return claimed_icon
            case "Active":
                return active_icon
            case "Free":
                return free_icon
            default:
                return invalid_icon
        }
    }

    checkAvailable() {
        if (this.props.isPlayerTurn() && this.props.getOpponentStatus()) {
            if (this.state.owner == null && this.state.possession_type != "Invalid") {
                return true
            } else {
                return false
            }
        }

    }

    checkValidMove() {
        let test_val = null

        if (this.props.isPlayerTurn()) {
            test_val = this.props.sendSocketMessage({
                action: "check_move",
                square_id: this.props.square_id
            })
            console.log(test_val)
        }
    }

    checkActive() {
        if (this.props.isPlayerTurn()) {
            return this.props.getActiveStatus()
        }
    }

    check

    changeStatus(status) {
        if (this.props.isPlayerTurn()) {
            if (this.state.owner) {
                if (this.state.owner == this.props.getCurrentPlayerId()) {
                    this.props.sendSocketMessage({
                        action: "change_status",
                        square_id: this.props.square_id,
                        new_status: status
                    })
                }
            }
        }
    }

    takeOwnership() {
        if (this.props.isPlayerTurn()) {
            this.props.sendSocketMessage({
                action: "claim_square",
                square_id: this.props.square_id
            })
        }
    }

    squareClicked(square) {
        if (this.props.gameComplete() == false) {
            if (this.state.possession_type == "Claimed" && this.checkActive() == false) {
                this.changeStatus("Active")
            } else if (this.state.possession_type == "Active") {
                this.changeStatus("Claimed")
            } else if (this.state.possession_type == "Free" && this.checkActive() == true) {
                if (this.checkAvailable()) {
                    this.takeOwnership()
                }
            }
        }
    }

    render() {
        return (
            <td onClick={this.squareClicked} height="60" width="60">
                {this.getStatus()}
                <div className="coords">({this.props.loc_x}, {this.props.loc_y}) </div>
            </td>
        )
    }
}

GameSquare.propTypes = {
    loc_x: PropTypes.number,
    loc_y: PropTypes.number,
    square_id: PropTypes.number,
    owner: PropTypes.number,
    possession_type: PropTypes.string,
    game_creator: PropTypes.number,
    sendSocketMessage: PropTypes.func,
    isPlayerTurn: PropTypes.func,
    getCurrentPlayerId: PropTypes.func,
    getActiveStatus: PropTypes.func,
    checkActive: PropTypes.func,
    gameComplete: PropTypes.func
}

export default GameSquare

