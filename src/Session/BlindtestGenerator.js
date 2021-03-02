import React from "react";
import {GenerateSelectionFromJSON} from '../Generator/SelectionGenerator'
import KeyboardEventHandler from "react-keyboard-event-handler";
import {Helmet} from "react-helmet";
import KeyboardEvents from './KeyboardEvent';
import PlaylistManager from "./PlaylistManager";

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
        this.playlistManager = new PlaylistManager(this.playlist);

        this.state = {
            display: false,
            status: Status.None,
            counter: this.guessTime
        }

        this.nextGuess = this.nextGuess.bind(this)
        this.startGuessTime = this.startGuessTime.bind(this)
        this.startAnswerTime = this.startAnswerTime.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        //this._onStateChange = this._onStateChange.bind(this)

        if (this.playlist.length === 0) {
            this.props.history.push('/')
        }
    }

    nextGuess(shift) {
        console.log("Starting new guess");
        this.playlistManager.updatePlayer(shift).then(() => {
            this.setState({
                status: Status.Play,
                counter: this.guessTime
            })
            this.startGuessTime();
        }).catch(() => {
            console.log("erreur du chargement de la music");
            if (this.state.playlistManager.playlist.length === 0) {
                this.props.history.push('/')
            } else {
                this.nextGuess(shift);
            }
        })
    }

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

    handleKeyDown(key, event) {
        if (this.state.player === null) {
            return
        }
        console.log("receiving key: " + key)
        switch (key) {
            case 'up':
                KeyboardEvents.HandleVolumeUp(this.playlistManager.player)
                break
            case 'down':
                KeyboardEvents.HandleVolumeDown(this.playlistManager.player)
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
                KeyboardEvents.HandlePause(this.playlistManager.player)
                break
            case 'esc':
                //TODO arreter le chargement des autres musiques
                this.props.history.push('/')
                break
            default:
                break
        }
    }

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
            <div style={{ display: this.state.display ? '' : 'none' }}>
                {this.playlistManager.player}
            </div>
            <div style={{ display: 'none' }}>
                <KeyboardEventHandler
                    handleKeys={['up', 'down', 'left', 'right', 'space', 'esc']}
                    onKeyEvent={this.handleKeyDown} />
            </div>
        </div>
    }
}