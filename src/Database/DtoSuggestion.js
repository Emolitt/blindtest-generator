export default class DtoAsset {
    constructor(obj, uid) {
        this.uid = uid
        this.name = obj.name
        this.theme = obj.theme
        this.url = obj.url
    }
}
