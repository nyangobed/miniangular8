import { Component, OnInit } from '@angular/core';
import {Currency} from '../../../../../entities/currency-model';
import {ViewParamBase} from '../../../../../shared/base/viewParamBase';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Notify} from '../../../../../shared/classes/notify';
import {ActivatedRoute} from '@angular/router';
import {routerTransition} from '../../../../../router.animations';
import { Regions } from '../../../../../entities/regions-model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-geographical-regions',
  templateUrl: './view-geographical-regions.component.html',
  styleUrls: ['./view-geographical-regions.component.scss'],
    animations: [routerTransition()]
})
export class ViewGeographicalRegionsComponent implements OnInit {
    model: Regions;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, private location: Location) {
        this.model = new Regions();
        this.viewparam = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchRegions(params['id']);
            }
        });
    }

    fetchRegions(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        // fetch device make list
        this.stewardService.getRegions('atlas/regions/' + id, params).subscribe((response) => {
            // //(response);
            if (response.code == 200) {
                inst.model = response.data;
                let order: number = 1;
                for (let data of inst.objectKeys(inst.model)) {
                    if (inst.model[data] != '') {
                        inst.viewparam.push({
                            value: inst.model[data],
                            label: data.toLowerCase(),
                            order: order,
                        });
                    }
                    order++;
                }

            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }
    goBack() {
        // window.history.back();
        this.location.back();
    
        //( 'goBack()...' );
      }

}
