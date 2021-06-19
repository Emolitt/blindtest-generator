const fs = require('fs');

const {google} = require('googleapis');
const tokens = require('./token.json');
const games = require('../src/Assets/game.json');
const animes = require('../src/Assets/anime.json');
const films = require('../src/Assets/film.json');
const musics = require('../src/Assets/musique.json');


const FlatMapAssets = (assets) => {
    //isolate wanted number of selection
    const flatMappedAssets = assets.map(asset => {
        const flatMappedAsset = asset.url.map(url => {
            return ({
                title: asset.name,
                name: url.name ? url.name : '',
                id:  url.link.split('=')[1],
                start: url.start
            })
        })
        return (flatMappedAsset)
    })

    return (flatMappedAssets.flat(1))
}

/**
 * @param {{title: string}} a
 * @param {{title: string}} b
 */
 function sort(a, b) {
    const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();


        if(titleA < titleB) { return -1; }
        if(titleA > titleB) { return 1; }
        return 0;
}

class MusicToSort {
    constructor(title, name, id, start, nbViews) {
        this.title = title
        this.name = name
        this.url = `https://www.youtube.com/watch?v=${id}`
        this.start = start;
        this.nbViews = nbViews
    }
}

class MusicToSave {
    constructor(title, url) {
        this.title = title;
        this.url = [url];
    }
}

class MusicUrl {
    constructor(name, link, start, nbViews) {
        this.name = name
        this.link = link;
        this.start = start;
    }
}

class PlaylistSorter {
    oauth2Client = new google.auth.OAuth2();
    musicsToSort = [];
    totalSize = 0;

    constructor() {
        this.oauth2Client.setCredentials(tokens);
        console.log('Starting My Amazing Playlist Sorter...');

    }

    /**
     *
     * @param {object} music
     * @returns {MusicToSort}
     */
    getVideoStatistics(music) {
        if (music.id == undefined) {
            return Promise.reject("no id");
            
        }
        return new Promise((resolve, rejects) => {
            google.youtube("v3").videos.list({
                part: 'statistics',
                id: music.id,
                auth: this.oauth2Client,
    
            })
            .then(res => {
                if (res.data.items.length > 0) {
                    const nbViews = parseInt(res.data.items[0].statistics.viewCount);
                    resolve(new MusicToSort(music.title, music.name, music.id, music.start, nbViews));
                } else {
                    console.error('no statistics for game: ' + music.title + ' - ' + music.name);
                    this.totalSize -= 1;
                    resolve();
                }
            })
            .catch(err => rejects(err));
        });
        
    }

    /**
     * @param {Array<{name: string, id: string, start: number}>} playlist
     *  **/
    sortPlaylist(playlist) {
        console.log(`${playlist.length} musics to sort`);
        return new Promise(resolve => {
            Promise.all(playlist.map((music, index) => {
                const progression = index * 100 / playlist.length;
    
                if (progression % 25 === 0) {
                    console.log(`${progression} % done.`);
                }
                return this.getVideoStatistics(music);
            })).then(values => {
                console.log("adding musics with stats");
                values.forEach((musicToSort) => {
                    if (musicToSort != undefined) {
                        console.log(`nb views for game: ${musicToSort.title} - ${musicToSort.name} is ${musicToSort.nbViews}`)
                        this.musicsToSort.push(musicToSort);
                    }
                })
                resolve();
            })
        })
    }

    /**
     * 
     * @param {Array<MusicToSort>} chunk 
     */
    groupMusicsByName(chunk) {
        const groupedChunk = [];
        chunk.forEach((music, index) => {
            const musicIdx = groupedChunk.findIndex(value => value.title === music.title);
            if (musicIdx === -1) {
                groupedChunk.push(new MusicToSave(music.title, new MusicUrl(music.name, music.url, music.start)));
            } else {
                groupedChunk[musicIdx].url.push(new MusicUrl(music.name, music.url, music.start));
            }
        });

        return groupedChunk;
    }

    /**
     * @param {string} name
     * @param {Array} difficulties 
     */
    saveSortedPlaylistByDifficulty(name, difficulties) {
        const chunks = [];
        const len = this.musicsToSort.length;
        let chunkSize = len / difficulties.length

        while (chunkSize * difficulties.length < len) {
            chunkSize += 1;
        }

        console.log(`Saving musics into chunk of size ${chunkSize}`);
        for (let i = 0; i < len; i += chunkSize) {
            chunks.push(this.musicsToSort.slice(i, i + chunkSize))
        }
        // Here we have to write each array into files
        // Warning: We have to convert all class into json before writing them
        console.log('Now Writing chunks in files');
        chunks.forEach((chunk, index) => {
            const musicsToSave = this.groupMusicsByName(chunk);
            console.log(`Writing chunk of difficulty ${difficulties[index]}`);
            musicsToSave.sort(sort);
            fs.writeFileSync(`./${name}/${name}_${difficulties[index]}.json`, JSON.stringify(musicsToSave));
        })
    }

    run(path, name) {
        // reset in case of multiple uses
        this.sortPlaylist = [];
        const difficulties = [
            'easy',
            'medium',
            'hard',
        ];
        const assets = FlatMapAssets(require(path));
        this.totalSize = assets.length;

        this.sortPlaylist(assets).then(() => {
            const t = setInterval(() => {
                if (this.musicsToSort.length !== this.totalSize) {
                    console.log("waiting for request to finish. " + this.musicsToSort.length + ' / ' + assets.length);
                    return
                } else {
                    console.log("sorting by view. Size of list: " + this.musicsToSort.length);
                    this.musicsToSort = this.musicsToSort.sort((a, b) => {
                        console.log(`comparing size: ${a.nbViews} to size: ${b.nbViews}`);
                        return b.nbViews - a.nbViews
                    });
                    console.log('\n----------------------------------------\n');
                    this.saveSortedPlaylistByDifficulty(name, difficulties);
                    clearInterval(t);
                }
            }, 1000);
        });
    }
}


function main() {
    const playlistSorter = new PlaylistSorter();

    playlistSorter.run('../src/Assets/game.json', 'games');
    playlistSorter.run('../src/Assets/anime.json', 'animes');
    playlistSorter.run('../src/Assets/film.json', 'films');
    playlistSorter.run('../src/Assets/musique.json', 'musics');
    console.log("Finished !!");
}

main();