import {Product} from "./product-model";
import {Tasks} from "./task-model";

export class Schedule {
    scheduleId: number;
    dateTime: Date;
    status: string;
    noFiles: number;
    appId: number;
    scheduleType: string;
    scheduledTime: Date;
    downloadType: string;
    dirPath: string;
    action: string;
    actionStatus: string;
    intrash: string;
//    percentage: number;
    productId: Product;
    tmsDeviceTaskList:Array<Tasks>;
}


