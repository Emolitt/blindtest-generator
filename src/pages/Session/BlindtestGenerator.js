import React from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import {Helmet} from "react-helmet";
import KeyboardEvents from './KeyboardEvent';
import YouTube from "react-youtube";
import PropTypes from "prop-types";
import {localStorageHelper} from "../../utils/localStorageHelper";
import './BlindtestGenerator.scss'

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
        const sessionId = localStorageHelper.getSessionId();
        this.drinkMode = localStorageHelper.getDrinkMode();

        this.playlist = [];
        this.playlistSize = 0;
        const timeline = localStorageHelper.getTimeline();
        this.guessTime = timeline[0];
        this.answerTime = timeline[1];

        this.state = {
            display: false,
            status: Status.None,
            counter: this.guessTime,
            playerOpts: {},
            playerObj: null,
            playlistIndex: 0,
            currMusic: null,
            drinkAmount: 0,
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
            this.props.navigate('/')
        }
    }

    //---------------------------------------------------------Utils
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
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
                playerOpts: opt,
                drinkAmount: this.randomNumber(1, 4)
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
        const sessionId = localStorageHelper.getSessionId();
        if (!sessionId) {
            return ;
        }
        this.updatePlayer(shift).then(() => {
            this.setState({
                status: Status.Play,
                counter: this.guessTime
            })
            this.startGuessTime();
        }).catch(() => {
            console.log("erreur du chargement de la music");
            if (this.playlist.length === 0) {
                this.props.navigate('/')
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
                    counter: this.answerTime
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
        if (this.state.playerObj === null) {
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
                this.props.navigate('/')
                break
            default:
                break
        }
    }


    //---------------------------------------------------------Renderer
    componentWillMount() {
        const playlistSize = localStorageHelper.getPlaylistSize();
        const difficulties = localStorageHelper.getActiveDifficulties();
        const allowSameLicence = localStorageHelper.getAllowMultipleLicence();
        const themes = localStorageHelper.getActiveThemes();
        this.props.assetManager.generateSelection(themes, playlistSize, difficulties, allowSameLicence)
            .then(assets => {
                this.playlist = assets;
                this.playlistSize = assets.length;
                this.nextGuess(true);
            });
    }

    componentDidMount() {
    }
    render() {
        return <div>
            <Helmet bodyAttributes={{style: 'background-color : #242629'}}/>
            {!this.state.display && <div className="guess-container">
                <div className="counter">
                    <h1>{this.state.counter}</h1>
                    {this.drinkMode && <h2>{this.state.drinkAmount} drinks</h2>}
                </div>
                <div className="asset-counter">
                    {`${this.playlistSize - this.playlist.length} / ${this.playlistSize}`}
                </div>
            </div>}
            {this.state.currMusic != null && <div style={{ display: this.state.display ? '' : 'none', position: 'relative' }}>
                <div style={{ position: 'absolute'}}>
                    <YouTube videoId={this.state.currMusic.url}
                             opts={this.state.playerOpts}
                             onReady={this._onReady}
                             onPlay={this._onPlay}
                             onEnd={this._onEnd}
                             onError={this._onError}
                             onStateChange={this._onStateChange}
                    />
                </div>
                <div className="asset-info-container">
                    <div className="asset-label">
                        {this.state.currMusic.name}
                    </div>
                </div>
            </div>}
            <div style={{ display: 'none' }}>
                <KeyboardEventHandler
                    handleKeys={['up', 'down', 'left', 'right', 'space', 'esc']}
                    onKeyEvent={this.handleKeyDown} />
            </div>
        </div>
    }
}

BlindtestGenerator.propTypes = {
    assetManager: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
}