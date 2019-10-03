import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../entities/product-model";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Notify} from "../../../../shared/classes/notify";
import {NgForm} from "@angular/forms";
import {routerTransition} from "../../../../router.animations";

@Component({
    selector: 'app-createproduct',
    templateUrl: './createproduct.component.html',
    styleUrls: ['./createproduct.component.scss'],
    animations: [routerTransition()]
})
export class CreateproductComponent implements OnInit {
    model: Product;
    public isUpdate: boolean = false;


    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, private router: Router) {
        this.model = new Product();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchProduct(params['id']);
            }
        });
    }

    fetchProduct(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get("products/" + id, params).subscribe((response) => {
            //(response);
            if (response.code == 200) {
                inst.model = response.data;

            } else {
                this.isUpdate = false;
                inst.notify.showWarning(response.message);
            }
        });
    }
    onCreateProduct(form: NgForm) {
        let inst = this;
        if (this.isUpdate) {
            this.stewardService.put("products", this.model).subscribe((response) => {
                //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/masterrecords/products'])
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        } else {
            this.stewardService.post("products", this.model).subscribe((response) => {
                //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/masterrecords/products'])
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        }
    }

}
