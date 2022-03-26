import {nativeMath, uuid4} from "random-js";

const defaultThemes = {
    games: true,
    songs: true,
    movies: true,
    series: true,
    tvShows: true,
    animes: true
};

const defaultDifficulties = {
    easy: true,
    medium: true,
    hard: false
};

const defaultPlaylistSize = 100;

const defaultTimeline =  [13, 18];

const defaultAllowMultipleLicence = false;
const defaultDrinkMode = false;


const setThemes = function (themes) {
    localStorage.setItem('blindtest-themes', JSON.stringify(themes));
}

const getThemes = function () {
    const themes = localStorage.getItem('blindtest-themes');

    if (themes !== null) {
        return JSON.parse(themes);
    } else {
        setThemes(defaultThemes);
        return defaultThemes;
    }
}

const getActiveThemes = function () {
    const themes = localStorage.getItem('blindtest-themes');

    if (themes !== null) {
        const parsedThemes = JSON.parse(themes);
        return Object.keys(parsedThemes).filter((theme => parsedThemes[theme]));
    } else {
        setThemes(defaultThemes);
        return Object.keys(defaultThemes).filter((theme => defaultThemes[theme]));
    }
}

const setDifficulties = function (themes) {
    localStorage.setItem('blindtest-difficulties', JSON.stringify(themes));
}

const getDifficulties = function () {
    const themes = localStorage.getItem('blindtest-difficulties');

    if (themes !== null) {
        return JSON.parse(themes);
    } else {
        setDifficulties(defaultDifficulties);
        return defaultDifficulties;
    }
}

const getActiveDifficulties = function () {
    const difficulties = localStorage.getItem('blindtest-difficulties');

    if (difficulties !== null) {
        const parsedDifficulties = JSON.parse(difficulties);
        return Object.keys(parsedDifficulties).filter((difficulty => parsedDifficulties[difficulty]));
    } else {
        setThemes(defaultDifficulties);
        return Object.keys(defaultDifficulties).filter((difficulty => defaultDifficulties[difficulty]));
    }
}

const setPlaylistSize = function (playlistSize) {
    localStorage.setItem('blindtest-playlist-size', playlistSize.toString());
}

const getPlaylistSize = function () {
    const playlistSize = localStorage.getItem('blindtest-playlist-size');

    if (playlistSize !== null) {
        return parseInt(playlistSize);
    } else {
        setPlaylistSize(defaultPlaylistSize)
        return defaultPlaylistSize;
    }
}

const setTimeline = function (timeline) {
    localStorage.setItem('blindtest-timeline', JSON.stringify(timeline));
}

const getTimeline = function () {
    const timeline = localStorage.getItem('blindtest-timeline');

    if (timeline !== null) {
        return JSON.parse(timeline);
    } else {
        setTimeline(defaultTimeline);

        return defaultTimeline;
    }
}

const setAllowMultipleLicence = function (allowMultipleLicence) {
    localStorage.setItem('blindtest-allow-multiple-licence', JSON.stringify(allowMultipleLicence));
}

const getAllowMultipleLicence = function () {
    const allowMultipleLicence = localStorage.getItem('blindtest-allow-multiple-licence');

    if (allowMultipleLicence !== null) {
        return JSON.parse(allowMultipleLicence);
    } else {
        setAllowMultipleLicence(defaultAllowMultipleLicence)
        return defaultAllowMultipleLicence;
    }
}

const setDrinkMode = function (allowMultipleLicence) {
    localStorage.setItem('blindtest-drink-mode', JSON.stringify(allowMultipleLicence));
}

const getDrinkMode = function () {
    const drinkMode = localStorage.getItem('blindtest-drink-mode');

    if (drinkMode !== null) {
        return JSON.parse(drinkMode);
    } else {
        setDrinkMode(defaultDrinkMode)
        return defaultDrinkMode;
    }
}

const resetSessionId = function () {
    return localStorage.setItem('blindtest-session-id', null);
}

const getSessionId = function () {
    return localStorage.getItem('blindtest-session-id');
}

const setRandomSessionId = function () {
    localStorage.setItem('blindtest-session-id', uuid4(nativeMath));
}

export const localStorageHelper = {
    setThemes,
    getThemes,
    setDifficulties,
    getDifficulties,
    setPlaylistSize,
    getPlaylistSize,
    setTimeline,
    getTimeline,
    setAllowMultipleLicence,
    getAllowMultipleLicence,
    setDrinkMode,
    getDrinkMode,
    getActiveThemes,
    getActiveDifficulties,
    getSessionId,
    setRandomSessionId,
    resetSessionId,
    defaultThemes,
    defaultPlaylistSize,
    defaultDifficulties,
    defaultTimeline,
    defaultAllowMultipleLicence
}