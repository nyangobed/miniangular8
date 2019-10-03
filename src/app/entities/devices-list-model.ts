import {BusinessUnitItem} from "./param-business-unit-item-model";
import {DeviceModel} from "./device-model";
import {UpdateLogList} from "./update-log-list-model";
import {SimCard} from "./sim-card-models";
import {DeviceCurrency} from "./device-currency";
import {Tasks} from "./task-model";

export class Devices {
    partNumber: string;
    unitItemId: BusinessUnitItem;
    modelId: DeviceModel;
    deviceId: number;
    serialNo: string;
    status: string;
    tid: string;
    creationDate: Date;
    action: string;
    actionStatus: string;
    intrash: string;
    deviceCurrency: DeviceCurrency;
    tmsUpdateLogsList: Array<UpdateLogList>;
    deviceSimcard: SimCard;
    tmsDeviceTaskList: Array<Tasks>;
}

