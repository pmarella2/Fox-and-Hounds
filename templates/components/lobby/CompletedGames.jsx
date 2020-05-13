import React from 'react'

const red = {
    'color': '#f20b0b'
}

const green = {
    'color': '#61ef0a'
}

class CompletedGames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game_list: this.props.game_list
        }
        this.renderGameList = this.renderGameList.bind(this);
    }

    componentWillReceiveProps(newProp) {
        this.setState({ game_list: newProp.game_list })
    }

    renderGameList() {
        let player_removed = this.props.game_list.filter(function (game) {
            return game.winner !== null
        }, this);

        if (player_removed.length > 0) {
            return player_removed.map(function (game) {
                if (game.winner.id == this.props.player.id) {
                    return <li key={game.id} className="list-group-item">
                        <span className="badge float-left">{game.id} </span>&nbsp; &nbsp;
                        <span>{game.creator.username} vs {game.opponent.username}</span>
                        <span><br></br>Your Result: </span><span style={green}>WIN</span>
                        <a className="btn btn-sm btn-primary float-right" href={"/game/" + game.id + "/"}>View</a>
                    </li>
                } else {
                    return <li key={game.id} className="list-group-item">
                        <span className="badge float-left">{game.id} </span>&nbsp; &nbsp;
                        <span>{game.creator.username} vs {game.opponent.username}</span>
                        <span><br></br>Your Result: </span><span style={red}>LOSS</span>
                        <a className="btn btn-sm btn-primary float-right" href={"/game/" + game.id + "/"}>View</a>
                    </li>
                }
            }, this)

        } else {
            return ("No completed games!")
        }
    }

    render() {
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span>Your Completed Games</span>
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

CompletedGames.defaultProps = {

};

CompletedGames.propTypes = {
    game_list: React.PropTypes.array,
    player: React.PropTypes.object

};

export default CompletedGames

