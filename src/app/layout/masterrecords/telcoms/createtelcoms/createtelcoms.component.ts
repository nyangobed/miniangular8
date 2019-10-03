import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {Telco} from "../../../../entities/telcos-model";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-createtelcoms',
    templateUrl: './createtelcoms.component.html',
    styleUrls: ['./createtelcoms.component.scss'],
    animations: [routerTransition()]
})
export class CreatetelcomsComponent implements OnInit {
    model: Telco;
    public isUpdate: boolean = false;


    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, private router: Router) {
        this.model = new Telco();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchMno(params['id']);
            }
        });
    }

    fetchMno(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get("mno/" + id, params).subscribe((response) => {
            //(response);
            if (response.code == 200) {
                inst.model = response.data;

            } else {
                this.isUpdate = false;
                inst.notify.showWarning(response.message);
            }
        });
    }
    onCreateMNO(form: NgForm) {
        let inst = this;
        if (this.isUpdate) {
            this.stewardService.put("mno", this.model).subscribe((response) => {
                //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/masterrecords/telcoms']);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        } else {
            this.stewardService.post("mno", this.model).subscribe((response) => {
                //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/masterrecords/telcoms']);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        }
    }

}
