import React, { Component, PropTypes } from 'react'

const backgroundColor = {
    'background':'#4b4a4a'
};

class GameLog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            log_entries: props.log_entries,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            log_entries: newProps.log_entries
        })
    }

    renderLogEntry(entry) {
        let log_sender = "Server"
        if (entry.player != null) {
            log_sender = entry.player.username

        }
        return <li key={entry.id} className="list-group-item" style={backgroundColor}>
            <span className="badge float-left player-badge">
                {log_sender}
            </span>
            <span>{entry.text}</span>
        </li>
    }

    renderLog() {
        if (this.state.log_entries) {
            return this.state.log_entries.map(function (entry) {
                return this.renderLogEntry(entry)
            }.bind(this))
        }
    }

    render() {
        return (
            <div>
                <h3>Game Log</h3>
                <ul className="list-group">
                    {this.renderLog()}
                </ul>
            </div>
        )
    }
}

GameLog.propTypes = {
    log_entries: PropTypes.array,
    sendSocketMessage: PropTypes.func
}

export default GameLog