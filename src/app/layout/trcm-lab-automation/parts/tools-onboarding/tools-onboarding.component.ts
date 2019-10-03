import { Component, OnInit } from '@angular/core';
import { Parts } from '../entities/parts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Notify } from '../../../../shared/classes/notify';

@Component({
  selector: 'app-tools-onboarding',
  templateUrl: './tools-onboarding.component.html',
  styleUrls: ['./tools-onboarding.component.scss']
})
export class ToolsOnboardingComponent implements OnInit {
  Part = new Parts;
  addParts: FormGroup;
  submitted = false;
  // tslint:disable-next-line:no-inferrable-types
  public isUpdate: boolean = false;
  errorMsg = '';
  id: number;
  get: any;
  response: '';
  names = [];


  constructor(private router: Router, private stewardService: HttpStewardService<any, any>, private notify: Notify,
    private fb: FormBuilder, private activatedRoute: ActivatedRoute
    // private fb: FormBuilder, private onboardingService: PartsOnboardingService
  ) { }


  ngOnInit() {
    const inst = this;
    this.stewardService.get('manufacturers').subscribe((response) => {
      if (response.code === 200) {
        inst.names = response.data.content;

      } else {
        inst.notify.showWarning(response.message);
      }
    });

    this.addParts = this.fb.group({
      partNumber: ['', [Validators.required]],
      partModel: ['', [Validators.required]],
      partName: ['', [Validators.required]],
      description: ['', [Validators.required]],
   //   quantity: ['', [Validators.required]],
      manufacturerName: ['', [Validators.required]],
    });
    /**
 * Retrieve data being edited
 */
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != null) {
        this.isUpdate = true;
        this.stewardService.get('parts/' + params['id']).subscribe((addParts) => {
          this.id = params['id'];
          this.Part = addParts.data;
          //('this device model', this.addParts);
          this.addParts.get('partNumber').setValue(this.Part.partNumber);
          this.addParts.get('partModel').setValue(this.Part.partModel);
          this.addParts.get('partName').setValue(this.Part.partName);
          this.addParts.get('description').setValue(this.Part.description);
       //   this.addParts.get('quantity').setValue(this.Part.quantity);
          this.addParts.get('manufacturerName').setValue(this.Part.manufacturerName);
        });

      }

    });
  }

  get f() { return this.addParts.controls; }

  onSubmit() {
    this.addParts.value.parts_id = this.id;
    if (this.isUpdate) {
      const parts: Parts = new Parts();
      parts.parts_id = this.id;
      // parts.partNumber = this.addParts.value['partNumber'];
      // parts.partModel = this. addParts.value['partModel'];
      // parts.partName = this. addParts.value['partName'];
      // parts.description = this. addParts.value['description'];
      // parts.quantity = this. addParts.value['quantity'];
      // parts.manufacturerName = this. addParts.value['manufacturerName'];

      //(this.addParts.value);
      this.stewardService.put('parts', this.addParts.value)
        .subscribe(
          data => {});
      this.goTo();
    }else {
      this.stewardService.send('parts', this.addParts.value)
        .subscribe(
          data => {});
      this.goTo();
      // //(this.userModel);
    }
  }
  goTo() {
    this.router.navigate(['../../../trcm-lab-automation/parts']);
  }


}

