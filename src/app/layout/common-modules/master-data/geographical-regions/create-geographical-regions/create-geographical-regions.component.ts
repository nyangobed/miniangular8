
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Notify} from '../../../../../shared/classes/notify';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {routerTransition} from '../../../../../router.animations';
import { Regions } from '../../../../../entities/regions-model';

@Component({
  selector: 'app-create-geographical-regions',
  templateUrl: './create-geographical-regions.component.html',
  styleUrls: ['./create-geographical-regions.component.scss'],
    animations: [routerTransition()]
})
export class CreateGeographicalRegionsComponent implements OnInit {
    model: Regions;
    public isUpdate: boolean = false;
    id: any;

    constructor(private stewardService: HttpStewardService<any, any>,
                private notify: Notify,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location) {
        this.model = new Regions();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchRegions(params['id']);
            }
        });
    }

    fetchRegions(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get('atlas/regions/' + id, params).subscribe((response) => {
            // //(response);
            if (response.code == 200) {
                inst.model = response.data;

            } else {
                this.isUpdate = false;
                inst.notify.showWarning(response.message);
            }
        });
    }

    onCreateRegions(form: NgForm) {
        let inst = this;
        if (this.isUpdate) {
            this.stewardService.put('atlas/regions', this.model).subscribe((response) => {
                // //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/common-modules/master-data/geographical-regions']);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                // //(error);
            });
        } else {
            this.stewardService.post('atlas/regions', this.model).subscribe((response) => {
                // //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/common-modules/master-data/geographical-regions']);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                // //(error);
            });
        }
    }
    goBack() {
        // window.history.back();
        this.location.back();
    
        // //( 'goBack()...' );
      }

}
