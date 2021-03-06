import React from 'react'

class PlayerGames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game_list: this.props.game_list
        }

        this.onCreateGameClick = this.onCreateGameClick.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderOpponent = this.renderOpponent.bind(this)
    }

    onCreateGameClick(event) {
        this.props.sendSocketMessage({ action: "create_game" })
    }

    componentWillReceiveProps(newProp) {
        this.setState({ game_list: newProp.game_list })
    }

    renderButton(game) {
        if (game.completed) {
            return "View"
        } else if (game.opponent == null && game.creator.id == this.props.player.id) {
            return "Waiting..."
        } else {
            return "Play"
        }

    }

    renderOpponent(game) {
        if (game.opponent != null) {
            return game.opponent.username
        } else {
            return "???"
        }
    }

    renderGameList() {
        if (this.props.game_list.length > 0) {
            return this.props.game_list.map(function (game) {
                if (game.game_over !== true) {
                    return <li key={game.id} className="list-group-item">
                        <span className="badge float-left">{game.id}</span>&nbsp;&nbsp;
                                <span>{game.creator.username}</span> vs <span>{this.renderOpponent(game)}</span>

                        <a className="btn btn-sm btn-primary float-right" href={"/game/" + game.id + "/"}>{this.renderButton(game)}</a>
                    </li>
                }
            }, this)

        } else {
            return ("No games to list!")
        }
    }

    render() {
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span>Your Pending Games</span>
                        <a href="#" className="float-right badge" onClick={this.onCreateGameClick} id="create_game">Start a New Game</a>
                    </div>
                    <div className="panel-body">
                        <div>
                            <ul className="list-group games-list">
                                {this.renderGameList()}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

PlayerGames.defaultProps = {

};

PlayerGames.propTypes = {
    game_list: React.PropTypes.array,
    player: React.PropTypes.object
};


export default PlayerGames

