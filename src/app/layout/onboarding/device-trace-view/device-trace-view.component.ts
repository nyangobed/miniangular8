import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FTPLogs} from '../../../entities/ftp-logs-model';
import {ViewParamBase} from '../../../shared/base/viewParamBase';
import {saveAs} from 'file-saver/FileSaver';

@Component({
    selector: 'app-device-trace-view',
    templateUrl: './device-trace-view.component.html',
    styleUrls: ['./device-trace-view.component.scss']
})
export class DeviceTraceViewComponent<T> implements OnInit {

    ftpLogs: FTPLogs;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    constructor(public dialogRef: MatDialogRef<DeviceTraceViewComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.ftpLogs = data.data;
    }

    ngOnInit() {
        let order: number = 1;
        let inst = this;
        inst.viewparam = new Array();
        for (let data of inst.objectKeys(inst.ftpLogs)) {
            if (inst.ftpLogs[data] != '' && (typeof inst.ftpLogs[data]) != 'object') {
                if (data.toLowerCase() == 'datetimeadded') {
                    inst.viewparam.push({
                        value: new Date(inst.ftpLogs[data]).toLocaleString(),
                        label: data.toLowerCase(),
                        order: order,
                    });
                } else {
                    inst.viewparam.push({
                        value: inst.ftpLogs[data],
                        label: data.toLowerCase(),
                        order: order,
                    });
                }
            }
            order++;
        }
    }

    downloadFile() {
        let message = 'Message : '+this.ftpLogs.message + ' \n Terminal Serial : ' + this.ftpLogs.terminalSerial + ' \n Log Date Time : ' + new Date(this.ftpLogs.dateTimeAdded).toLocaleString() + ' \n Stack Trace : ' + this.ftpLogs.stacktrace;
        const blob = new Blob([message], {type: 'text/plain'});
        saveAs(blob, this.ftpLogs.terminalSerial+"_log.txt");
    }

}
