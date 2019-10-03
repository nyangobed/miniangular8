import {Schedule} from "./schedules-model";

export class Tasks {
    taskId: number;
    downloadStatus: string;
    startDownloadTime: Date;
    endDownloadTime: Date;
    intrash: string;
    scheduleId: Schedule;
}