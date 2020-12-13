import React from "react";
import YouTube from 'react-youtube';
import {GenerateSelectionFromJSON} from '../Generator/SelectionGenerator'
import KeyboardEventHandler from "react-keyboard-event-handler";
import KeyboardEvents from './KeyboardEvent';

export default class BlindtestGenerator extends React.Component {
    constructor(props) {
        super(props);

        //Playlist Configuration
        const playlistSize = window.localStorage.getItem('playlist_size')
        const allowSameLicence = (window.localStorage.getItem('allow_same_licence') === 'true')
        const theme = window.localStorage.getItem('theme')

        //Session Configuration
        this.guessTime = parseInt(window.localStorage.getItem('guess_time'))
        this.waitTime = parseInt(window.localStorage.getItem('wait_time'))

        this.playlist = GenerateSelectionFromJSON(theme, playlistSize, allowSameLicence)
        console.log(this.playlist)

        this.state = {
            display: false,
            paused: false,
            counter: this.guessTime,
            waiter: this.waitTime,
            embed: this.createPlayer(),
            player: null,
            loaded: false
        }

        this.startGuessTime = this.startGuessTime.bind(this)
        this.startAnswerTime = this.startAnswerTime.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)

        if (this.playlist.length === 0) {
            this.props.history.push('/')
        } else {
            this.nextGuess(false)
        }
    }

    createPlayer() {
        const opts = {
            height: '1076',
            width: '1920',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                start: this.playlist[0].start,
                end: this.playlist[0].start + this.guessTime + this.waitTime + 1,
                fs: 0,
                origin: window.location
            }
        }

        return <YouTube videoId={this.playlist[0].url} opts={opts} onReady={this._onReady} onPlay={this._onPlay} onError={this._onError} onStateChange={this._onStateChange} />
    }

    nextGuess(shift) {
        if (shift === true) {
            this.playlist.shift()
        }
        if (this.playlist.length === 0) {
            this.props.history.push('/')
        } else {
            this.setState({
                embed: this.createPlayer(),
                loaded: false
            })
        }
    }

    startAnswerTime() {
        const timer = setInterval(() => {
            if (this.state.paused === true) {
                return
            }
            const counter = this.state.waiter
            if (counter === 0) {
                clearInterval(timer)
                this.setState({
                    display: false,
                    counter: this.guessTime,
                    waiter: 0,
                    embed: null
                })
                this.nextGuess(true)
            } else {
                this.setState({
                    waiter: counter - 1
                })
            }
        }, 1000)
    }

    startGuessTime() {
        const timer = setInterval(() => {
            if (this.state.paused === true) {
                return
            }
            const counter = this.state.counter
            if (counter === 1) {
                clearInterval(timer)
                this.setState({
                    display: true,
                    counter: 0,
                    waiter: this.waitTime
                })
                this.startAnswerTime()
            } else {
                this.setState({
                    counter: counter - 1
                })
            }
        }, 1000)
    }

    _onReady = (event) => {
        // access to player in all event handlers via event.target
        //event.target.pauseVideo();
        console.log("ready to play")
        this.setState({
            player: event.target
        })
    }

    _onPlay = (event) => {
        // access to player in all event handlers via event.target
        //event.target.pauseVideo();
        console.log("video started")
        if (this.state.loaded !== true) {
            this.startGuessTime()
        }
        this.setState({
            loaded: true
        });
    }

    _onEnd(event) {
        // access to player in all event handlers via event.target
        //event.target.pauseVideo();
        event.target.stopVideo();
        //this.nextGuess(true)
    }

    _onError = (event) => {
        // access to player in all event handlers via event.target
        alert("Failed to load video")
        this.nextGuess(true)
    }

    _onStateChange(event) {
        //Can do something with all states here
        console.log("state changed: " + event.data)
        const code = event.data;
        if (code === -1) {
            event.target.playVideo()
        }
        /*
        -1 (unstarted)
        0 (ended)
        1 (playing)
        2 (paused)
        3 (buffering)
        5 (video cued).
         */
    }

    handleKeyDown(key, event) {
        if (this.state.player === null) {
            return
        }
        console.log("receiving key: " + key)
        switch (key) {
            case 'up':
                KeyboardEvents.HandleVolumeUp(this.state.player)
                break
            case 'down':
                KeyboardEvents.HandleVolumeDown(this.state.player)
                break
            case 'space':
                KeyboardEvents.HandlePause(this.state.player)
                this.setState({
                    paused: !this.state.paused
                })
                break
            case 'esc':
                this.props.history.push('/')
                break
            default:
                break
        }
    }

    render() {
        return <div>
            {this.state.counter !== 0 && <span>{this.state.counter}</span>}
            <div style={{ display: this.state.display ? '' : 'none' }}>
                {this.state.embed}
            </div>
            <KeyboardEventHandler
                handleKeys={['up', 'down', 'space', 'esc']}
                onKeyEvent={this.handleKeyDown} />
        </div>
    }
}