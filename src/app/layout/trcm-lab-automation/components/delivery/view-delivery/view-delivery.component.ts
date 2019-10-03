import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../../models/repair/delivery';
import { routerTransition } from '../../../../../router.animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Notify } from '../../../../../shared/classes/notify';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
  selector: 'app-view-delivery',
  templateUrl: './view-delivery.component.html',
  styleUrls: ['./view-delivery.component.scss'],
  animations: [routerTransition()]
})
export class ViewDeliveryComponent implements OnInit {
  myForm: FormGroup;
  updateData: Delivery;
  Delivery: Delivery;
  submitted = false;
  isUpdate: boolean;
  id: number;
  deliveryStat = [
    'Pending',
    'Delivered'
      
  ] 

  constructor(
      private fb: FormBuilder,
      private notify: Notify,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private httpStewardService: HttpStewardService<any, any>
  ) {
      this.updateData = new Delivery();
      this.Delivery = new Delivery();
  }

  ngOnInit() {
      /** call the form function */
      this.createForm();

      /**
       *
       * Retrieve data being edited
       *
       */
      this.activatedRoute.params.subscribe(params => {
          if (params["id"] != null) {
              this.isUpdate = true;
              this.httpStewardService
                  .get("atlas/delivery/" + params["id"])
                  .subscribe(form => {
                      this.id = params["id"];
                      this.Delivery = form.data;
                      this.myForm
                          .get("deliveryStatus")
                          .setValue(this.Delivery.deliveryStatus);
                      this.myForm
                          .get("location")
                          .setValue(this.Delivery.location);
                      this.myForm
                          .get("deliveredBy")
                          .setValue(this.Delivery.deliveredBy);
                      
                      this.updateData.id = this.Delivery.id
                  });
          }
      });
  }

  /** Function that is used to create the update form */
  createForm() {
      this.myForm = this.fb.group({
          deliveryStatus: "",
          location: "",
          deliveredBy: "",
      });
  }

  /** GET THE FORM CONTROLS THAT HELP TO GET VALIDATIONS AND OTHER METHODS */
  get f() {
      return this.myForm.controls;
  }

  /** REDIRECT TO THE DIAGNOSIS DATATABLE AFTER UPDATE */
  goTo() {
      this.router.navigate([
          "../../../trcm-lab-automation/components/delivery"
      ]);
  }

  /** SUBMIT THE FORM WITH UPDATED VALUES */
  onSubmit() {
      this.submitted = true;

      /** PARSE THE FORM DATA TO THE UPDATEDATA MODEL */
      this.updateData.deliveryStatus = this.myForm.get("deliveryStatus").value;
      this.updateData.location = this.myForm.get("location").value;
      this.updateData.deliveredBy = this.myForm.get("deliveredBy").value;


      this.httpStewardService
          .put("atlas/delivery", this.updateData)
          .subscribe(data => {
              if (data.code === 200) {
                  this.notify.showSuccess("Data Updated Successfully");
              } else {
                //   this.notify.showWarning(
                //       "Oops Something went horribly wrong! Try again later."
                //   );
                  this.notify.showWarning(data.message);
              }
          });

      /** NAVIGATE TO THE DELLIVERY PAGE */
      this.goTo();
  }
}
