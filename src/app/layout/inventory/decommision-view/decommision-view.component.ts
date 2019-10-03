import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {Product} from '../../../entities/product-model';
import {BusinessItem} from '../../../entities/param-business-unit';
import {ParamConfig} from '../../../entities/param-template';
import {Apps} from '../../../entities/apps-model';
import {ViewParamBase} from '../../../shared/base/viewParamBase';
import {Devices} from '../../../entities/devices-list-model';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {ActivatedRoute} from '@angular/router';
import {ReleaseEntity} from '../../../entities/release-entity';
import {NgForm} from '@angular/forms';
import {BusinessUnitItem} from '../../../entities/param-business-unit-item-model';

@Component({
    selector: 'app-decommision-view',
    templateUrl: './decommision-view.component.html',
    styleUrls: ['./decommision-view.component.scss'],
    animations: [routerTransition()]
})
export class DecommisionViewComponent implements OnInit {
 products: Array<Product>;
    bizzUnits: any[];
    bizzUnit: BusinessItem;
    posparams: Array<any>;
    simpleSelected: any = {};
    params: Array<ParamConfig>;
    apps: Array<Apps>;

    filed: File[] = [];
    
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    device: Devices;
    
    public model: ReleaseEntity;
    businessUnit: BusinessUnitItem;
    
    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.viewparam = new Array();
        this.device = new Devices();
        this.model = new ReleaseEntity([], "", "Repair");;
        this.businessUnit = new BusinessUnitItem();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchDevice(params['id']);
                this.fetchBusinessUnit(params['id']);
                this.model.ids.push(params['id']);
            }
        });
    }

    fetchDevice(id: number): any {
        let inst = this;
        this.stewardService.get("devices/" + id).subscribe(response => {
            if (response.code == 200) {
                inst.device = response.data;
                
                let order: number = 1;
                
                inst.viewparam.push({
                    value: response.data.serialNo,
                    label: "Serial Number",
                    order: order,
                });

                inst.viewparam.push({
                    value: response.data.modelId.make.make,
                    label: "Manufacturer",
                    order: order,
                });

                inst.viewparam.push({
                    value: response.data.modelId.deviceType.type,
                    label: "Type",
                    order: order,
                });
                inst.viewparam.push({
                    value: response.data.modelId.model,
                    label: "Model",
                    order: order,
                });
            } else {
                this.notify.showWarning("Sorry record not found");
            }
        });
    }
    
    fetchBusinessUnit(id: any): void {
        let inst = this;
        let order = 0;
        this.stewardService.get("business-units/unititems/device/" + id).subscribe(response => {
            if (response.code == 200) {
                this.businessUnit = response.data;
                inst.viewparam.push({
                    value: this.businessUnit.unitSource.productId.productName,
                    label: "Business Unit",
                    order: order,
                });

                inst.viewparam.push({
                    value: this.businessUnit.name,
                    label: "Estate Name",
                    order: order,
                });
            } else {
                this.notify.showWarning("Sorry record not found");
            }
        });
    }
    
    processDecommission(form: NgForm) {
        this.stewardService.delete("devices/decommission", this.model).subscribe(response => {
            if (response.code == 200) {                
                form.resetForm();
                this.notify.showSuccess(response.message);
                //                 this.router.navigate(["/devices/release"]);
            } else {
                if (response.data != null) {
                    let msg: string = "";
                    for (let m of response.data) {
                        msg += m + "\n";
                    }
                    this.notify.showWarning(msg);
                } else {
                    this.notify.showWarning(response.message);
                }
            }
        });
    }
}
