//const fs = require('fs');
import { Random, MersenneTwister19937 } from 'random-js';
//const path = require('path');
import AssetsManager from "../Database/AssetsManager";

const ThemeList = {
    games: AssetsManager.ThemeList.games,
    animes: AssetsManager.ThemeList.animes,
    films: AssetsManager.ThemeList.films,
    musics: AssetsManager.ThemeList.musics,
}

class SelectionGenerator {
    random = new Random(MersenneTwister19937.autoSeed());

    setSeed(seed) {
        this.random = new Random(MersenneTwister19937.seed(seed));
    }

    FlatMapAssets(assets) {
        //isolate wanted number of selection
        const flatMappedAssets = assets.map(asset => {
            const flatMappedAsset = asset.url.map(url => {
                const fullName = asset.name.concat(url.name ? ` - ${url.name}` : '');
                return ({
                    name: fullName,
                    url:  url.link.split('=')[1],
                    start: url.start
                })
            })
            return (flatMappedAsset)
        })

        return (this.random.shuffle(flatMappedAssets.flat(1)))
    }

    EqualizeAllGenreSelection(size, reuseAsset) {
        let partSize = size / Object.keys(ThemeList).length;

        if (partSize <= 0) {
            partSize = 1;
        }

        return  this.GenerateSelectionFromJSON('games', partSize, reuseAsset)
            .concat(this.GenerateSelectionFromJSON('animes', partSize, reuseAsset))
            .concat(this.GenerateSelectionFromJSON('films', partSize, reuseAsset))
            .concat(this.GenerateSelectionFromJSON('musics', partSize, reuseAsset));
    }

    GenerateSelectionFromJSON(theme, size, reuseGame) {
        let assets;
        if (theme === 'all') {
            return this.random.shuffle(this.EqualizeAllGenreSelection(size, reuseGame));
        } else {
            if(!(theme in ThemeList)) {
                return []
            }
            assets = this.random.shuffle(ThemeList[theme]);
        }

        if (reuseGame === true) {
            const flatMappedAssets = this.FlatMapAssets(assets)

            //isolate wanted number of selection
            return (flatMappedAssets.slice(0, size));
        }

        //isolate wanted number of selection
        const selectionArray = assets.slice(0, size);

        //get random info to display for each selection
        const parsedSelectionArray = selectionArray.map(asset => {
            const winnerChoice = this.random.shuffle(asset.url)[0];
            const fullName = asset.name.concat(winnerChoice.name ? ` - ${winnerChoice.name}` : '');
            return ({
                name: fullName,
                url: winnerChoice.link.split('=')[1],
                start: winnerChoice.start
            })
        })

        return(parsedSelectionArray);
    }

}

const selectionGenerator = new SelectionGenerator();

export {
    selectionGenerator
};

/*function getDirectories(source) {
    const dirs = fs.readdir(source, { withFileTypes: true }, err => {console.log('error: ' + err)})

    if (dirs === undefined) {
        console.log("failed to read directory: " + source);
        return undefined;
    }
    return (dirs.filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name));
}*/

/*const getAbsolutePath = source => path.resolve(source);

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

const getFiles = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);*/

/*function GenerateSelection(assetsPath, size) {
    const absPath = getAbsolutePath(assetsPath);
    console.log(absPath)
    //getting shuffled list of assets in specified dir
    const assets = random.shuffle(getDirectories(absPath));
    let selectionArray = [];
    let parsedSelectionArray = [];

    //console.log(assets);

    //isolate wanted number of selection
    for (let i = 0; i < size; i++) {
        if (i >= assets.length) {
            break;
        }
        selectionArray.push(assets[i]);
    }

    //get random info to display for each selection
    selectionArray.forEach(asset => {
        const music = (absPath + '/' + asset + '/musics/' + random.shuffle(getFiles(absPath + '/' + asset + '/musics'))[0]).replace(/\\/g, '/');
        const background = (absPath + '/' + asset + '/backgrounds/' + random.shuffle(getFiles(absPath + '/' + asset + '/backgrounds'))[0]).replace(/\\/g, '/');
        parsedSelectionArray.push({
            music: music,
            image: background,
        });
    });

    return (parsedSelectionArray);
}*/

/*export const checkAssetsDirectory = (path) => {
    console.log(path);
    const assets = getDirectories(path);

    for (let i = 0; i < assets.length; i++) {
        const dirs = getDirectories(path + '/' + assets[i]);
        if (dirs.length === 2) {
            if (dirs[0] !== 'backgrounds' || dirs[1] !== 'musics') {
                return assets[i];
            } else {
                const filesBG = getFiles(path + '/' + assets[i] + '/backgrounds');
                const filesMusics = getFiles(path + '/' + assets[i] + '/musics');

                if (filesBG.length <= 0 || filesMusics <= 0) {
                    return assets[i];
                }
            }
        } else {
            return assets[i];
        }
    }
    return undefined;
}*/

export const FlatMapAssets = (assets) => {
    //isolate wanted number of selection
    const flatMappedAssets = assets.map(asset => {
        const flatMappedAsset = asset.url.map(url => {
            const fullName = asset.name.concat(url.name ? ` - ${url.name}` : '');
            return ({
                name: fullName,
                id:  url.link.split('=')[1],
                start: url.start
            })
        })
        return (flatMappedAsset)
    })

    return (flatMappedAssets.flat(1))
}

