export interface JsonMusicUrl {
    name: string;
    link: string;
    start: number;
}

export interface JsonMusic {
    title: string;
    url: JsonMusicUrl[]
}

export class DtoAsset {
    easy: JsonMusic[];
    medium: JsonMusic[];
    hard: JsonMusic[];

    fromJson(obj) {
        this.easy = obj.easy;
        this.medium = obj.medium;
        this.hard = obj.hard;

        return this;
    }

    toJson() {
        return {
            easy: this.easy,
            medium: this.medium,
            hard: this.hard,
        }
    }

    flatMap() {
        return this.easy.concat(this.medium).concat(this.hard);
    }
}