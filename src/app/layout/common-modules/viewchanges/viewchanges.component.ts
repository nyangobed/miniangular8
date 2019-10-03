import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../router.animations";
import {HttpStewardService} from "../../../shared/services/http-steward.service";
import {ActivatedRoute} from "@angular/router";
import {Notify} from "../../../shared/classes/notify";

@Component({
    selector: 'app-viewchanges',
    templateUrl: './viewchanges.component.html',
    styleUrls: ['./viewchanges.component.scss'],
    animations: [routerTransition()]
})
export class ViewchangesComponent implements OnInit {

    changes: Array<string>;
    selectedIds: Array<any>;
    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.changes = new Array();
        this.selectedIds = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchUserChanges(params['id']);
                this.selectedIds.push(params['id']);
            }
        });
    }

    fetchUserChanges(id: number): void {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get("users/" + id + "/changes", params).subscribe((response) => {
            // //(response);
            if (response.code == 200) {
                this.changes = response.data;
            } else {
                inst.notify.showWarning(response.message);
            }
        });

    }

}
