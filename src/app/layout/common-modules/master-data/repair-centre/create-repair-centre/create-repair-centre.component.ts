import { RepairCentre } from './../../../../../entities/repair-centre';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-repair-centre',
  templateUrl: './create-repair-centre.component.html',
  styleUrls: ['./create-repair-centre.component.scss'],
  animations: [routerTransition()]
})
export class CreateRepairCentreComponent implements OnInit {
  model: RepairCentre;
  public isUpdate: boolean = false;


  constructor(private stewardService: HttpStewardService<any, any>,
              private notify: Notify,
              private route: ActivatedRoute,
              private router: Router) {
      this.model = new RepairCentre();
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          if (params['id'] != null) {
              this.isUpdate = true;
              this.fetchErrorCodes(params['id']);
          }
      });
  }

  fetchErrorCodes(id: number) {
      let params: Map<any, string> = new Map();
      let inst = this;
      //fetch device make list
      this.stewardService.put('device_error' + id, params).subscribe((response) => {
        //   //(response);
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
          this.stewardService.put('device_error', this.model).subscribe((response) => {
            //   //(response);
              if (response.code == 200) {
                  inst.notify.showSuccess(response.message);
                  form.resetForm();
                  inst.router.navigate(['/common-modules/master-data/error-codes']);
              } else {
                  inst.notify.showWarning(response.message);
              }
          }, error => {
            //   //(error);
          });
      } else {
          this.stewardService.send('device_error', this.model).subscribe((response) => {
              // //(response);
              if (response.code == 201) {
                  inst.notify.showSuccess(response.message);
                  form.resetForm();
                  inst.router.navigate(['/common-modules/master-data/error-codes']);
              } else {
                  inst.notify.showWarning(response.message);
              }
          }, error => {
            //   //(error);
          });
      }
  }

}
