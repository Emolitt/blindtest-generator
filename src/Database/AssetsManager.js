import {firestore} from "./FirebaseConfig";
import {DtoAsset} from "./DtoAsset";
import { v4 } from "uuid";
import DtoSuggestion from "./DtoSuggestion";
import { default as axios } from "axios";

const projectId = '20542294';
const accessToken = 'nNeL_egaj8PhyWJHkYXk';

export default class AssetsManager {

    /*static ThemeList = {
        games: AssetsManager.getAssetsOfCollection('games'),
        animes: AssetsManager.getAssetsOfCollection('animes'),
        films: AssetsManager.getAssetsOfCollection('films'),
        musics: AssetsManager.getAssetsOfCollection('musics')
    }*/
    static ThemeList = {
        games: AssetsManager.getAssetFromGitlab('Game'),
        animes: AssetsManager.getAssetFromGitlab('Anime'),
        films: AssetsManager.getAssetFromGitlab('Film'),
        musics: AssetsManager.getAssetFromGitlab('Musique')
    }

    static areThemeLoaded() {
       const gamesLoaded = !!this.ThemeList.games.easy && !!this.ThemeList.games.medium && !!this.ThemeList.games.hard
       const animesLoaded = !!this.ThemeList.animes.easy && !!this.ThemeList.animes.medium && !!this.ThemeList.animes.hard
       const musicsLoaded = !!this.ThemeList.musics.easy && !!this.ThemeList.musics.medium && !!this.ThemeList.musics.hard
       const filmsLoaded = !!this.ThemeList.films.easy && !!this.ThemeList.films.medium && !!this.ThemeList.films.hard

        return gamesLoaded && animesLoaded && musicsLoaded && filmsLoaded
    }


    static getAssetFromGitlab(assetName) {
        //const url = `https://gitlab.com/RomainJolidon/blindtest-assets/-/raw/master/assets%20json/${assetName}.json`;
        const url = `https://gitlab.com/api/v4/projects/${projectId}/repository/files/assets%20json%2F${assetName}.json/raw?ref=master`
        let res = new DtoAsset();

        axios.get(url, {
            headers: {
                "PRIVATE-TOKEN": accessToken
            }
        }).then(value => {
            res.fromJson(value.data);
        });
        return res;
    }

    /** @param {string} collectionName
     *  @return {DtoAsset}
     * **/
    static getAssetsOfCollection(collectionName) {
        const asset = {};

        console.log(collectionName);
        firestore.collection(collectionName).get().then(doc => {
            console.log(doc);
            doc.docs.forEach(element => {
                element.ref.listCollections().then(subCollection => {
                    console.log(subCollection);
                })
            });
        }).catch(reason => console.error(reason))
        return new DtoAsset(asset);
    }

    /** @param {DtoAsset} assets
     * @param {string} collectionName
     * **/
    static setAssetsOfCollection(assets, collectionName) {
        assets.easy.forEach(asset => {
            asset.url.forEach(url => {
                firestore.collection(collectionName).doc('easy').collection(asset.title).add(url)
            })
        })
        assets.medium.forEach(asset => {
            asset.url.forEach(url => {
                firestore.collection(collectionName).doc('medium').collection(asset.title).add(url)
            })
        })
        assets.hard.forEach(asset => {
            asset.url.forEach(url => {
                firestore.collection(collectionName).doc('hard').collection(asset.title).add(url)
            })
        })
    }

    /** @param {string} collection
     * @param {string} assetName
     * @param {string} link
     * **/
    static HandleError(collection, assetName, link) {
        //TODO en cours de dev. trouver comment on peut supprimer un element d'un array
        /*
        const assetRef = firebase.firestore().collection(collection).doc(assetName)
        assetRef.update({
            url: firebase.firestore().FieldValue.delete()
        })*/
    }

    /** @param {$ObjMap} asset **/
    static suggestNewAsset(asset) {
        const uid = v4()
        firestore.collection('suggestions').doc(uid).set(asset)
    }

    static getSuggestions() {
        const assetList = [];

        firestore.collection('suggestions').get().then(doc => {
            doc.docs.forEach(element => {
                assetList.push(new DtoSuggestion(element.data(), element.id))
            })
        })
        return (assetList);
    }

    /** @param {$ObjMap} suggestion
     * @param {boolean} validate
     *  **/
    static HandleSuggestion(suggestion, validate) {
        //FIXME il ne s'est rien passé
        if (validate) {
            firestore.collection(suggestion.theme).doc(suggestion.name).get().then(doc => {
                const data = new DtoAsset(doc.data());
                data.url = data.url.concat(suggestion.url)
                firestore.collection(suggestion.theme).doc(suggestion.name).set(data.toJson())
            }).catch(err => {
                firestore.collection(suggestion.theme).doc(suggestion.name).set(new DtoAsset(suggestion).toJson())
            })
        }
        firestore.collection('suggestions').doc(suggestion.uid).delete()
    }
}

