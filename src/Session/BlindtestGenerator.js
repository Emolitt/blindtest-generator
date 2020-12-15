import React from "react";
import YouTube from 'react-youtube';
import {GenerateSelectionFromJSON} from '../Generator/SelectionGenerator'
import KeyboardEventHandler from "react-keyboard-event-handler";
import {Helmet} from "react-helmet";
import KeyboardEvents from './KeyboardEvent';

const Status = {
    None: -1,
    Play: 1,
    Pause: 2,
    Restart: 3,
    Pass: 4
}

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

        this.state = {
            display: false,
            status: Status.None,
            counter: this.guessTime,
            waiter: this.waitTime,
            embed: this.createPlayer(),
            player: null,
            loaded: false
        }

        this.startGuessTime = this.startGuessTime.bind(this)
        this.startAnswerTime = this.startAnswerTime.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this._onStateChange = this._onStateChange.bind(this)

        if (this.playlist.length === 0) {
            this.props.history.push('/')
        } else {
            this.nextGuess(false)
        }
    }

    createPlayer() {
        const opts = {
            height: window.screen.height - 5,
            width: window.screen.width,
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                start: this.playlist[0].start,
                end: this.playlist[0].start + this.guessTime + this.waitTime + 2,
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
                loaded: false,
                status: Status.None
            })
        }
    }

    startAnswerTime() {
        const timer = setInterval(() => {
            const doneAction = (nextGuess) => {
                clearInterval(timer)
                this.setState({
                    display: false,
                    counter: this.guessTime,
                    waiter: 0,
                    embed: null
                })
                this.nextGuess(nextGuess)
            }
            //check status
            switch (this.state.status) {
                case Status.Pause:
                    return
                case Status.Restart:
                    doneAction(false)
                    return
                case Status.Pass:
                    doneAction(true)
                    return
                default:
                    break
            }
            const counter = this.state.waiter
            if (counter === 0) {
                doneAction(true)
            } else {
                this.setState({
                    waiter: counter - 1
                })
            }
        }, 1000)
    }

    startGuessTime() {
        const timer = setInterval(() => {
            const doneAction = (nextGuess) => {
                clearInterval(timer)
                this.setState({
                    display: false,
                    counter: this.guessTime,
                    waiter: 0,
                    embed: null
                })
                this.nextGuess(nextGuess)
            }
            //check status
            switch (this.state.status) {
                case Status.Pause:
                    return
                case Status.Restart:
                    doneAction(false)
                    return
                case Status.Pass:
                    doneAction(true)
                    return
                default:
                    break
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
            this.setState({
                loaded: true,
                status: Status.Play
            })
        }
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

    _onStateChange = (event) => {
        //Can do something with all states here
        console.log("state changed: " + event.data)
        const code = event.data;
        switch (code) {
            case -1:
                event.target.playVideo()
                break
            case 1:
                this.setState({
                    status: Status.Play
                })
                break
            case 2:
                this.setState({
                    status: Status.Pause
                })
                break
            default:
                break
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
            case 'left':
                this.setState({
                    status: Status.Restart
                })
                break
            case 'right':
                this.setState({
                    status: Status.Pass
                })
                break
            case 'space':
                KeyboardEvents.HandlePause(this.state.player)
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
            <Helmet bodyAttributes={{style: 'background-color : #242629'}}/>
            {this.state.counter !== 0 &&
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '200px',
                color: '#BFC6D0',
                fontWeight: 'bold'
            }}>
                {this.state.counter}
            </div>
            }
            <div style={{ display: this.state.display ? '' : 'none' }}>
                {this.state.embed}
            </div>
            <div style={{ display: 'none' }}>
                <KeyboardEventHandler
                    handleKeys={['up', 'down', 'left', 'right', 'space', 'esc']}
                    onKeyEvent={this.handleKeyDown} />
            </div>
        </div>
    }
}