import React from 'react';
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser';
import LobbyBase from './LobbyBase.jsx'
import $ from 'jquery'

Sentry.init({ dsn: "https://1295e0eabb06407d87a710850f4c5540@o374711.ingest.sentry.io/5236901" });

var current_user = null
//var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
//var lobby_sock = ws_scheme + "://" + window.location.host + "/lobby/"
//var lobby_sock = 'ws://' + window.location.host + "/lobby/"
var lobby_sock = "ws://" + "localhost:8888" + "/lobby/"

$.get('https://localhost:8080/current-user/?format=json', function (result) {
    current_user = result
    render_component()
})

function render_component() {
    ReactDOM.render(<LobbyBase current_user={current_user} socket={lobby_sock} />, document.getElementById('lobby_component'))

}

