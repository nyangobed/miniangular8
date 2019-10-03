import { Component, OnInit } from '@angular/core';
import { ErrorCodes } from '../../../../../entities/error-codes-model';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { routerTransition } from '../../../../../router.animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-error-codes',
  templateUrl: './create-error-codes.component.html',
  styleUrls: ['./create-error-codes.component.scss'],
  animations: [routerTransition()]
})
export class CreateErrorCodesComponent implements  OnInit {
    model: ErrorCodes;
    public isUpdate: boolean = false;
    id: any;


    constructor(private stewardService: HttpStewardService<any, any>,
                private notify: Notify,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location) {
        this.model = new ErrorCodes();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
               this.fetchErrorCodes(params['id']);
            }
        });
    
//    this.route.params.subscribe(params => {
//     if (params['id'] != null) {
//       this.stewardService.get('device_error/' + params['id']).subscribe((editDevices) => {
//         this.id = params['id'];
//         this.model = editDevices.data;
//         ////('this device model', this.model);

//         this.model.get('code').setValue(editDevices.data.code);
//         this.model.get('codeName').setValue(editDevices.data.codeName);
//         this.model.get('description').setValue(editDevices.data.description);
        
//       });

//     }

//  });
    }

    fetchErrorCodes(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.getDevices('atlas/device_error/' + id, params).subscribe((response) => {
            // //(response);
            if (response.code == 200) {
                inst.model = response.data;

            } else {
                this.isUpdate = false;
                inst.notify.showWarning(response.message);
            }
        });
    }

    onCreateErrorCodes(form: NgForm) {
        let inst = this;
        if (this.isUpdate) {
            this.stewardService.put('atlas/device_error', this.model).subscribe((response) => {
                // //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/common-modules/master-data/error-codes']);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                // //(error);
            });
        } else {
            this.stewardService.post('atlas/device_error', this.model).subscribe((response) => {
                // //(this.model);
                if (response.code == 201) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/common-modules/master-data/error-codes']);
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
