import React from 'react';
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser';
import GameBoard from './GameBoard.jsx'
import $ from 'jquery'

Sentry.init({ dsn: "https://1295e0eabb06407d87a710850f4c5540@o374711.ingest.sentry.io/5236901" });

let current_user = null
const game = $("#game_component").data("game")
//var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
//var game_sock = ws_scheme + "://" + window.location.host + "/game/" + game + "/"
//const game_sock = 'ws://' + window.location.host + "/game/" + game + "/"
var game_sock = "ws://" + "localhost:8888" + "/game/" + game + "/"

$.get('https://localhost:8080/current-user/?format=json', function (result) {
    current_user = result
    render_component()
})

function render_component() {
    ReactDOM.render(<GameBoard current_user={current_user} game_id={game} socket={game_sock} />, document.getElementById("game_component"))
}

