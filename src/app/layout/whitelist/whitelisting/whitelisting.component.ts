import {Component, OnInit, NgModule} from '@angular/core';
import {WhitelistWrapper} from '../../../entities/wrappers/whitelist-wrapper';
import {DeviceMake} from '../../../entities/device-make';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {DeviceModel} from '../../../entities/device-model';
import {NgForm, NgModel} from '@angular/forms';
import {GlobalParams} from '../../../shared/services/globalparams';

@Component({
    selector: 'app-whitelisting',
    templateUrl: './whitelisting.component.html',
    styleUrls: ['./whitelisting.component.scss'],
    animations: [routerTransition()]
})
export class WhitelistingComponent implements OnInit {

    model: WhitelistWrapper;
    makes: Array<DeviceMake>;
    models: Array<DeviceModel>;
    makeId: string;
    templateUrl: string;
    _uploadFile: any;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private globalParam: GlobalParams) {
        this.model = new WhitelistWrapper();
        this.makes = new Array();
        this.models = new Array();
        this.makeId = "";
        this.templateUrl = globalParam.baseUrl + "device/whitelist/whitelist-template.csv?access_token=" + localStorage.getItem('access_token');
    }

    ngOnInit() {
        let params: Map<any, string> = new Map();
        let inst = this;
        params.set("actionStatus", "Approved");
        params.set("size", "1000");
        params.set("sort", "makeId,desc");
        //fetch device make list
        this.stewardService.get("device/make", params).subscribe((response) => {
            if (response.code == 200) {
                inst.makes = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    loadModels() {
        let params: Map<any, string> = new Map();
        let inst = this;
        params.set("actionStatus", "Approved");
        params.set("size", "1000");
        params.set("sort", "modelId,desc");
        params.set("makeId", this.makeId);
        //fetch device make list
        this.stewardService.get("device/model", params).subscribe((response) => {
            if (response.code == 200) {
                inst.models = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    save(form: NgForm) {
        let inst = this;
        //(this.model);
        
        this.stewardService.postFormData("device/whitelist", this.model).subscribe((response) => {
            if (response.code == 200){
                inst.notify.showWarning(response.message);
                form.resetForm();
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    fileSelected(files: Array<File>) {
        //        console.debug(files[0]);
        this.model.file = files[0];
    }

    disableElement(elem: NgModel) {
        console.debug(elem);
        elem.control.disable();
        //        elem.disable();
    }

}
