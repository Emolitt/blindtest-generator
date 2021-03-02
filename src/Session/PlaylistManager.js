import YouTube from "react-youtube";
import React from "react";

export default class PlaylistManager {
    constructor(playlist, guessTime, waitTime) {
        this.playlist = playlist;
        this.guessTime = guessTime;
        this.answerTime = waitTime
        this.player = null;
        this.playlistIndex = 0;
        this.loaded = false;
        this.error = false;
    }

    updatePlayer = (shift) => {
        let timeoutCounter = 20;
        this.loaded = false;
        this.error = false;
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
                    autoplay: 0,
                    start: music.start,
                    end: music.start + this.guessTime + this.answerTime + 2,
                    fs: 0,
                    origin: window.location,
                }
            }
            console.log(music.url)
            this.player = <YouTube videoId={music.url} opts={opt} onReady={this._onReady} onPlay={this._onPlay} onError={this._onError} onStateChange={this._onStateChange} />

            const timer = setInterval(() => {
                timeoutCounter--;
                if (this.loaded === true) {
                    clearInterval(timer);
                    resolve();
                } else if (timeoutCounter <= 0 || this.error === true) {
                    console.log("Failed to load music");
                    clearInterval(timer);
                    reject();
                }
            }, 1000);
        })
    }

    _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.playVideo();
        console.log("ready to play video")
    }

    _onPlay = (event) => {
        // access to player in all event handlers via event.target
        //event.target.pauseVideo();
        console.log("video started")
        this.loaded = true;
        this.playlistIndex++;
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
        this.error = true;
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
}