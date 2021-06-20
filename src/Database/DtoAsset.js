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

    constructor() {
    }

    fromJson(obj) {
        this.easy = obj.easy;
        this.medium = obj.medium;
        this.hard = obj.hard;
    }

    toJson() {
        return {
            easy: this.easy,
            medium: this.medium,
            hard: this.hard,
        }
    }

    flatMap() {
        return [];
    }
}