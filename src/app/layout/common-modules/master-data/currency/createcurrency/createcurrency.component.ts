import { Component, OnInit } from '@angular/core';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Notify} from '../../../../../shared/classes/notify';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {routerTransition} from '../../../../../router.animations';
import {Currency} from '../../../../../entities/common-modules-currency-model';

@Component({
  selector: 'app-createcurrency',
  templateUrl: './createcurrency.component.html',
  styleUrls: ['./createcurrency.component.scss'],
    animations: [routerTransition()]
})
export class CreatecurrencyComponent implements OnInit {
    model: Currency;
    public isUpdate: boolean = false;


    constructor(private stewardService: HttpStewardService<any, any>,
                private notify: Notify,
                private route: ActivatedRoute,
                private router: Router) {
        this.model = new Currency();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchCurrency(params['id']);
            }
        });
    }

    fetchCurrency(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
      
        this.stewardService.get('ufs-common-modules/api/v1/currency/' + id, params).subscribe((response) => {
            // //(response);
            if (response.code == 200) {
                inst.model = response.data;

            } else {
                this.isUpdate = false;
                inst.notify.showWarning(response.message);
            }
        });
    }

    onCreateCurrency(form: NgForm) {
        let inst = this;
        if (this.isUpdate) {
            this.stewardService.put('ufs-common-modules/api/v1/currency', this.model).subscribe((response) => {
                // //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/common-modules/master-data/currency']);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                // //(error);
            });
        } else {
            this.stewardService.post('ufs-common-modules/api/v1/currency', this.model).subscribe((response) => {
                // //(response);
                if (response.code == 201) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/common-modules/master-data/currency']);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                // //(error);
            });
        }
    }

}
