import React from 'react';
import ReactDOM from 'react-dom';
import PlayerGames from './PlayerGames'
import AvailableGames from './AvailableGames'
import CompletedGames from './CompletedGames'
import Websocket from 'react-websocket'
import $ from 'jquery'

class LobbyBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player_game_list: [],
            available_game_list: [],
            completed_game_list: []
        }
        this.sendSocketMessage = this.sendSocketMessage.bind(this);
    }

    getPlayerGames() {
        this.serverRequest = $.get('https://localhost:8080/player-games/?format=json', function (result) {
            this.setState({
                player_game_list: result,
            })
        }.bind(this))
    }

    getAvailableGames() {
        this.serverRequest = $.get('https://localhost:8080/available-games/?format=json', function (result) {
            this.setState({
                available_game_list: result
            })
        }.bind(this))
    }

    getCompletedGames() {
        this.serverRequest = $.get('https://localhost:8080/completed-games/?format=json', function (result) {
            this.setState({
                completed_game_list: result
            })
        }.bind(this))
    }

    componentDidMount() {
        this.getPlayerGames()
        this.getAvailableGames()
        this.getCompletedGames()
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleData(data) {
        let result = JSON.parse(data)
        this.getPlayerGames()
        this.setState({ available_game_list: result })
        this.setState({ completed_game_list: result })
    }

    sendSocketMessage(message) {
        const socket = this.refs.socket
        socket.state.ws.send(JSON.stringify(message))
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-5">
                    <PlayerGames player={this.props.current_user} game_list={this.state.player_game_list}
                        sendSocketMessage={this.sendSocketMessage} />
                </div>
                <div className="col-lg-5">
                    <AvailableGames player={this.props.current_user} game_list={this.state.available_game_list}
                        sendSocketMessage={this.sendSocketMessage} />
                </div>
                <div className="col-lg-5">
                    <CompletedGames player={this.props.current_user} game_list={this.state.completed_game_list}
                        sendSocketMessage={this.sendSocketMessage} />
                </div>
                <Websocket ref="socket" url={this.props.socket}
                    onMessage={this.handleData.bind(this)} reconnect={true} />
            </div>
        )
    }
}

LobbyBase.defaultProps = {

};

LobbyBase.propTypes = {
    socket: React.PropTypes.string
};

export default LobbyBase;
