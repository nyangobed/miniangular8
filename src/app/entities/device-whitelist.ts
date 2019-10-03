import {DeviceModel} from "./device-model";

export class DeviceWhitelist {    
    id: number;
    modelId: DeviceModel;
    serialNo: string;
    action: string;
    actionStatus: string;
    creationDate: Date;
}
