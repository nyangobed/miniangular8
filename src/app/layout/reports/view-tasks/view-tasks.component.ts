import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpStewardService} from "../../../shared/services/http-steward.service";
import {routerTransition} from "../../../router.animations";
import {Schedule} from "../../../entities/schedules-model";
import {ViewParamBase} from "../../../shared/base/viewParamBase";
import {Notify} from "../../../shared/classes/notify";
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-view-tasks',
    templateUrl: './view-tasks.component.html',
    styleUrls: ['./view-tasks.component.scss'],
    animations: [routerTransition()]
})
export class ViewTasksComponent implements OnInit {
    model: Schedule;
    viewparam: Array<ViewParamBase>;
    dtOptionsDeviceTasks: DataTables.Settings = {};
    objectKeys = Object.keys;
    dtTrigger: Subject<any> = new Subject();

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, protected modalService: NgbModal) {
        this.viewparam = new Array();
        this.model = new Schedule();
    }

    ngOnInit() {
        this.dtOptionsDeviceTasks = {
            pagingType: 'full_numbers',
            pageLength: 10
        };
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchSchedule(params['id']);
            }
        });
    }

    fetchSchedule(id: number) {
        let inst = this;
        let order: number = 1;
        this.stewardService.get("schedule/" + id).subscribe(response => {
            if (response.code == 200) {
                inst.model = response.data;

                inst.viewparam = new Array();

                inst.viewparam.push({value: inst.model.scheduleId, label: "Schedule ID", order: order});
                inst.viewparam.push({value: inst.model.noFiles, label: "No of Files", order: order});
                inst.viewparam.push({value: inst.model.scheduleType, label: "Schedule Type", order: order});
                inst.viewparam.push({value: inst.model.downloadType, label: "Download Type", order: order});
                inst.viewparam.push({value: inst.model.dirPath, label: "Files Path", order: order});
                inst.viewparam.push({value: new Date(inst.model.scheduledTime).toLocaleDateString(), label: "Schedule Time", order: order});
                this.dtTrigger.next();
            } else {
                this.notify.showWarning("Sorry record not found");
                //this.isUpdate = false;
            }
        });
    }

}
