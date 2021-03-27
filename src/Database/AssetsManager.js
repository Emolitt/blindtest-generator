import firebase from "./FirebaseConfig";
import DtoAsset from "./DtoAsset";
import { v4 } from "uuid";
import DtoSuggestion from "./DtoSuggestion";

export default class AssetsManager {

    static ThemeList = {
        games: AssetsManager.getAssetsOfCollection('games'),
        animes: AssetsManager.getAssetsOfCollection('animes'),
        films: AssetsManager.getAssetsOfCollection('films')
    }

    /** @param {string} collectionName **/
    static getAssetsOfCollection(collectionName) {
        const assetList = [];

        firebase.firestore().collection(collectionName).get().then(doc => {
            doc.docs.forEach(element => {
                assetList.push(new DtoAsset(element.data()))
            })
        })
        return (assetList);
    }

    /** @param {$ObjMap} assets
     * @param {string} collectionName
     * **/
    static setAssetsOfCollection(assets, collectionName) {
        assets.forEach(asset => {
            firebase.firestore().collection(collectionName).doc(asset.name).set(asset)
        })
    }

    /** @param {$ObjMap} asset **/
    static suggestNewAsset(asset) {
        const uid = v4()
        firebase.firestore().collection('suggestions').doc(uid).set(asset)
    }

    static getSuggestions() {
        const assetList = [];

        firebase.firestore().collection('suggestions').get().then(doc => {
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
            firebase.firestore().collection(suggestion.theme).doc(suggestion.name).get().then(doc => {
                const data = new DtoAsset(doc.data());
                data.url = data.url.concat(suggestion.url)
                firebase.firestore().collection(suggestion.theme).doc(suggestion.name).set(data.toJson())
            }).catch(err => {
                firebase.firestore().collection(suggestion.theme).doc(suggestion.name).set(new DtoAsset(suggestion).toJson())
            })
        }
        firebase.firestore().collection('suggestions').doc(suggestion.uid).delete()
    }
}

