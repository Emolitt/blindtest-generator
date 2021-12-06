import {DtoAsset} from "../models/DtoAsset";
import { default as axios } from "axios";
import {MersenneTwister19937, Random} from "random-js";

const projectId = '20542294';
const accessToken = 'glpat-QNSwxVMb-11Dzf_kbt81';

/*function fetchAsset(assetName) {
    console.log("hello ?");
    axios.get(`https://gitlab.com/RomainJolidon/blindtest-assets/-/raw/master/assets%20json/${assetName}.json`)
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .then(result => {
            console.log(assetName + " loaded");
            return new DtoAsset().fromJson(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
}*/


export default class AssetsManager {

    constructor() {
        this.loadAssets().then(r => {this.loaded = true});
    }

    themeList = {
        games: undefined,
        animes: undefined,
        movies: undefined,
        tvShows: undefined,
        series: undefined,
        songs: undefined
    }

    loaded = false;
    random = new Random(MersenneTwister19937.autoSeed());

    async loadAssets() {
        this.themeList.games = await this.getAssetFromGitlab('Game');
        this.themeList.animes = await this.getAssetFromGitlab('Anime');
        this.themeList.movies = await this.getAssetFromGitlab('Film');
        this.themeList.tvShows= await this.getAssetFromGitlab('Emission');
        this.themeList.series = await this.getAssetFromGitlab('Serie');
        this.themeList.songs = await this.getAssetFromGitlab('Musique');
    }


    getAssetFromGitlab(assetName) {
        //const url = `https://gitlab.com/RomainJolidon/blindtest-assets/-/raw/master/assets%20json/${assetName}.json`;
        const url = `https://gitlab.com/api/v4/projects/${projectId}/repository/files/assets%20json%2F${assetName}.json/raw?ref=master`

        return new Promise((resolve) => {
            axios.get(url, {
                headers: {
                    "PRIVATE-TOKEN": accessToken
                }
            }).then(value => {
                console.log("loaded " + assetName);
                resolve(new DtoAsset().fromJson(value.data));
            });
        });
    }

    flatMapAssets(assets) {
        //isolate wanted number of selection
        const flatMappedAssets = assets.map(asset => {
            const flatMappedAsset = asset.url.map(url => {
                const fullName = asset.title.concat(url.name ? ` - ${url.name}` : '');
                if (url.link.indexOf('=') !== -1) {
                    return ({
                        name: fullName,
                        url:  url.link.split('=')[1],
                        start: url.start
                    });
                } else {
                    return ({
                        name: fullName,
                        url:  url.link.split('/')[1],
                        start: url.start
                    })
                }
            })
            return (flatMappedAsset)
        })

        return (this.random.shuffle(flatMappedAssets.flat(1)))
    }

    equalizeThemesSelection(themes, size, difficulty, reuseAsset) {
        let partSize = size / themes.length;

        if (partSize <= 0) {
            partSize = 1;
        }

        return Promise.all(themes.map(((theme) => this.generateSelection(theme, partSize, difficulty,reuseAsset))));
    }

    generateSelection(themes, size, difficulties, reuseGame) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(themes)) {
                this.equalizeThemesSelection(themes, size, difficulties, reuseGame).then(result => {
                    resolve(this.random.shuffle(result.flatMap(asset => asset)));
                });
            } else {
                let theme = themes;
                if(!(theme in this.themeList)) {
                    return []
                }

                const assets =  this.random.shuffle(difficulties.flatMap((difficulty => this.themeList[theme][difficulty])));

                if (reuseGame === true) {
                    const flatMappedAssets = this.flatMapAssets(assets)

                    //isolate wanted number of selection
                    resolve(flatMappedAssets.slice(0, size));
                }

                //isolate wanted number of selection
                const selectionArray = assets.slice(0, size);

                //get random info to display for each selection
                const parsedSelectionArray = selectionArray.map(asset => {
                    const winnerChoice = this.random.shuffle(asset.url)[0];
                    const fullName = asset.title.concat(winnerChoice.name ? ` - ${winnerChoice.name}` : '');
                    return ({
                        name: fullName,
                        url: winnerChoice.link.split('=')[1],
                        start: winnerChoice.start
                    })
                })

                resolve(parsedSelectionArray);
            }
        });
    }
}