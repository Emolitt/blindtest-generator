import {APIHelper} from "../services/APIHelper";
import {DtoAsset} from "./DtoAsset";

export default class GitlabAssetsDto {
    static getByFileName(name: string) {
        return APIHelper.get(`https://gitlab.com/RomainJolidon/blindtest-assets/-/raw/master/assets%20json/${name}.json`)
            .then(data => new DtoAsset().fromJson(data));
    }
}