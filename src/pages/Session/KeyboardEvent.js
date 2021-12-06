
function HandleVolumeUp(player) {
    const volume = player.getVolume()

    player.setVolume(volume + 10)
}

function HandleVolumeDown(player) {
    const volume = player.getVolume()

    player.setVolume(volume - 10)
}

function HandlePause(player) {
    const status = player.getPlayerState()

    if (status === 1) {
        player.pauseVideo()
    } else if (status === 2) {
        player.playVideo()
    }
}

const KeyboardEvents = {
    HandleVolumeDown: HandleVolumeDown,
    HandleVolumeUp: HandleVolumeUp,
    HandlePause: HandlePause
}

export default KeyboardEvents;
