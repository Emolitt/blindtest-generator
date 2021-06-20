import React from "react";
import {selectionGenerator} from '../Generator/SelectionGenerator'
import KeyboardEventHandler from "react-keyboard-event-handler";
import {Helmet} from "react-helmet";
import KeyboardEvents from './KeyboardEvent';
import YouTube from "react-youtube";

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
        const sessionId = window.localStorage.getItem('session_id');
        const seed = window.localStorage.getItem('seed');

        //Playlist Configuration
        const playlistSize = window.localStorage.getItem('playlist_size')
        const difficulty = JSON.parse(window.localStorage.getItem('difficulty'))
        const allowSameLicence = (window.localStorage.getItem('allow_same_licence') === 'true')
        const theme = window.localStorage.getItem('theme')

        //Session Configuration
        this.guessTime = parseInt(window.localStorage.getItem('guess_time'))
        this.waitTime = parseInt(window.localStorage.getItem('wait_time'))

        selectionGenerator.setSeed(seed)
        this.playlist = selectionGenerator.GenerateSelectionFromJSON(theme, playlistSize, difficulty, allowSameLicence)

        this.state = {
            display: false,
            status: Status.None,
            counter: this.guessTime,
            player: undefined,
            playerObj: null,
            playlistIndex: 0,
            currMusic: null,
            loaded: false,
            error: false,
            stop: false
        }

        this.nextGuess = this.nextGuess.bind(this)
        this.updatePlayer = this.updatePlayer.bind(this)
        this._onError = this._onError.bind(this)
        this._onPlay = this._onPlay.bind(this)
        this._onReady = this._onReady.bind(this)
        this.startGuessTime = this.startGuessTime.bind(this)
        this.startAnswerTime = this.startAnswerTime.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        //this._onStateChange = this._onStateChange.bind(this)

        if (!sessionId) {
            this.props.history.push('/')
        }
    }

    //---------------------------------------------------------Iframe Handler
    _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.playVideo();
        this.setState({
            playerObj: event.target
        })
        console.log("ready to play video")
    }

    _onPlay = (event) => {
        // access to player in all event handlers via event.target
        //event.target.pauseVideo();
        console.log("video started")
        this.setState({
            loaded: true,
            playlistIndex: this.state.playlistIndex + 1
        });
    }

    _onEnd = (event) => {
        // access to player in all event handlers via event.target
        event.target.stopVideo();
        console.log("stop video");
        //this.nextGuess(true)
    }

    _onError = (event) => {
        // access to player in all event handlers via event.target
        alert(`[${this.state.currMusic.name}]: Failed to load video with id: ${this.state.currMusic.url}`)
        this.setState({
            error: true
        })
        //this.nextGuess(true)
    }

    _onStateChange = (event) => {
        //Can do something with all states here
        console.log("state changed: " + event.data)
        const code = event.data;
        switch (code) {
            case -1:
                break
            case 1:
                break
            case 2:
                break
            case 5:
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

    //---------------------------------------------------------Player Config
    updatePlayer = (shift) => {
        let timeoutCounter = 10;
        this.setState({
            loaded: false,
            error: false
        });
        return new Promise((resolve, reject) => {
            if (this.playlist.length === 0) {
                reject();
                return;
            }

            const music = shift === true ? this.playlist.shift() : this.playlist[0];

            //console.log("Loading music: " + music.name);
            const opt = {
                height: window.screen.height - 5,
                width: window.screen.width,
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 1,
                    start: music.start,
                    end: music.start + this.guessTime + this.answerTime,
                    fs: 0,
                    origin: window.location,
                }
            }
            console.log("init Player");
            this.setState({
                currMusic: music,
                player: <YouTube videoId={music.url}
                                opts={opt}
                                onReady={this._onReady}
                                onPlay={this._onPlay}
                                onEnd={this._onEnd}
                                onError={this._onError}
                                onStateChange={this._onStateChange}
                />
            });

            const timer = setInterval(() => {
                timeoutCounter--;
                if (this.state.loaded === true) {
                    clearInterval(timer);
                    resolve();
                } else if (timeoutCounter <= 0 || this.state.error === true) {
                    console.log("Failed to load music");
                    clearInterval(timer);
                    reject();
                }
            }, 1000);
        })
    }

    nextGuess(shift) {
        const sessionId = window.localStorage.getItem('session_id');
        if (!sessionId) {
            return ;
        }
        console.log("Starting new guess");
        this.updatePlayer(shift).then(() => {
            this.setState({
                status: Status.Play,
                counter: this.guessTime
            })
            this.startGuessTime();
        }).catch(() => {
            console.log("erreur du chargement de la music");
            if (this.playlist.length === 0) {
                this.props.history.push('/')
            } else {
                this.nextGuess(shift);
            }
        })
    }

    //---------------------------------------------------------Player Status
    doneAction = (timer, nextGuess) => {
        clearInterval(timer)
        this.setState({
            status: Status.None,
            display: false,
            counter: this.guessTime
        })
        this.nextGuess(nextGuess)
    }

    checkStatus = (timer) => {
        switch (this.state.status) {
            case Status.Pause:
                return true
            case Status.Restart:
                this.doneAction(timer,false)
                return true
            case Status.Pass:
                this.doneAction(timer,true)
                return
            default:
                break
        }
    }

    //---------------------------------------------------------Timers
    startAnswerTime() {
        const timer = setInterval(() => {
            //check status
            if (this.checkStatus(timer)) {
                return;
            }
            const counter = this.state.counter
            if (counter === 0) {
                this.doneAction(timer,true)
            } else {
                this.setState({
                    counter: counter - 1
                })
            }
        }, 1000)
    }

    startGuessTime() {
        const timer = setInterval(() => {
            //check status
            if (this.checkStatus(timer)) {
                return;
            }
            const counter = this.state.counter
            if (counter === 1) {
                clearInterval(timer)
                this.setState({
                    display: true,
                    counter: this.waitTime
                })
                this.startAnswerTime()
            } else {
                this.setState({
                    counter: counter - 1
                })
            }
        }, 1000)
    }

    //---------------------------------------------------------User Inputs
    handleKeyDown(key, event) {
        if (this.state.player === null) {
            return
        }
        console.log("receiving key: " + key)
        switch (key) {
            case 'up':
                KeyboardEvents.HandleVolumeUp(this.state.playerObj)
                break
            case 'down':
                KeyboardEvents.HandleVolumeDown(this.state.playerObj)
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
                this.setState({
                    status: this.state.status === Status.Pause ? Status.Play : Status.Pause
                })
                //fix player non reconnu
                KeyboardEvents.HandlePause(this.state.playerObj)
                break
            case 'esc':
                //TODO arreter le chargement des autres musiques
                this.props.history.push('/')
                break
            default:
                break
        }
    }

    //---------------------------------------------------------Renderer
    componentWillMount() {
        this.nextGuess(true);
    }

    componentDidMount() {
    }

    render() {
        return <div>
            <Helmet bodyAttributes={{style: 'background-color : #242629'}}/>
            {!this.state.display &&
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
            <div style={{ display: this.state.display ? '' : 'none', position: 'relative' }}>
                <div style={{ position: 'absolute'}}>
                    {this.state.player}
                </div>
                {this.state.currMusic != null && <div style={{ position: 'absolute', 'z-index': 1, margin: '10px', color: '#ffffff', fontWeight: 'bold', fontSize: '50px', 'text-transform': 'capitalize' }}>
                    {this.state.currMusic.name}
                </div>}
            </div>
            <div style={{ display: 'none' }}>
                <KeyboardEventHandler
                    handleKeys={['up', 'down', 'left', 'right', 'space', 'esc']}
                    onKeyEvent={this.handleKeyDown} />
            </div>
        </div>
    }
}