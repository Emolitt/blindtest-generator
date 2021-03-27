export default class DtoAsset {
    constructor(obj) {
        this.name = obj.name
        this.url = obj.url
    }

    toJson() {
        return {
            name: this.name,
            url: this.url
        }
    }
}
