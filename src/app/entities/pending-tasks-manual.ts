import {Devices} from "./devices-list-model";
import {Schedule} from "./schedules-model";

export class DeviceTasks {
    taskId: number;
    downloadStatus: string;
    startDownloadTime: Date;
    endDownloadTime: Date;
    intrash: string;
    deviceId: Devices;
    scheduleId: Schedule;
}


