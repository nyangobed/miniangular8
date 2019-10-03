import {DeviceModel} from "./device-model";

export class Apps {
    modelId: DeviceModel;
    appId: number;
    appName: string;
    appVersion: number;
    description: string;
    notesFilepath: string;
    releaseDate: Date;
    action: string;
    actionStatus: string;
    intrash: string;
}