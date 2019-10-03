import { Component, OnInit } from '@angular/core';
import { Workgroups } from '../../../../entities/work-groups-model';
import { Roles } from '../../../../entities/roles-modules';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { GlobalParams } from '../../../../shared/services/globalparams';
import { Notify } from '../../../../shared/classes/notify';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { routerTransition } from '../../../../router.animations';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-workgroup',
  templateUrl: './create-workgroup.component.html',
  styleUrls: ['./create-workgroup.component.scss'],
  animations: [routerTransition()]
})
export class CreateWorkgroupComponent implements OnInit {
  model: Workgroups;
  roles: Roles[];
  public isUpdate: boolean = false;
  checkedRoles: number [] = [];

  constructor(private stewardService: HttpStewardService<any, any>, private globalParam: GlobalParams, private notify: Notify, private router: Router,
              private route: ActivatedRoute, private location: Location) {
      this.model = new Workgroups();
  }

ngOnInit() {
    this.route.params.subscribe(params => {
        if (params['id'] != null) {
            this.isUpdate = true;
            this.fetchWorkgroup(params['id']);
        }
    });
    const that = this;
    const params: Map<any, string> = new Map();
    params.set('actionStatus', 'Approved');
    this.stewardService.get('ufs-common-modules/api/v1/role', params).subscribe(resp => {
        // //('role', resp);
        that.roles = resp.data.content;
    });
}

  fetchWorkgroup(id: number) {
      let params: Map<any, string> = new Map();
      let inst = this;

      this.stewardService.get('ufs-common-modules/api/v1/workgroup/' + id, params).subscribe((response) => {
        //   //('workgroup', response);
          if (response.code === 200) {
              inst.model = response.data;
          } else {
              this.isUpdate = false;
              inst.notify.showWarning(response.message);
          }
      });

      this.stewardService.get('ufs-common-modules/api/v1/workgroup/roles/' + id, params).subscribe((response) => {
        //   //('fetched workgroup', response);
          if (response.code === 200) {
              const data = response.data;
            //   //('Data:', data);
              data.forEach(role => {
                  this.roles.map(mp => {
                      if (mp.roleId === role.roleId) {
                          mp.checked = true;
                      }
                  });

              });

          }else {
              this.isUpdate = false;
              inst.notify.showWarning(response.message);
          }
      });

  }

  addWorkgroups(form: NgForm) {

      this.roles.forEach(res => {
          if (res.checked) {
              this.checkedRoles.push(res.roleId);
          }
      });
      this.model.workgroupRolesIds = this.checkedRoles;
      let inst = this;

      if (this.model.workgroupRolesIds.length < 1) {
          inst.notify.showWarning('You havent selected any type roles yet');
      } else {
          if (this.isUpdate) {
            //   //('workgroups', this.model.workgroupRolesIds);
            //   //('model', this.model);
              this.stewardService.put('ufs-common-modules/api/v1/workgroup', this.model).subscribe((response) => {
                  //(response);
                  if (response.code === 200) {
                      inst.notify.showSuccess(response.message);
                      form.resetForm();
                      inst.router.navigate(['/common-modules/workgroups']);
                  } else {
                      inst.notify.showWarning(response.message);
                  }
              }, error => {
                  //(error);
              });
          } else {
              //('workgroups', this.model.workgroupRolesIds);
              // this.model.tenant
              this.stewardService.post('ufs-common-modules/api/v1/workgroup', this.model).subscribe((response) => {
                  //('response', response);
                  if (response.code === 201) {
                      inst.notify.showSuccess(response.message);
                      form.resetForm();
                      inst.router.navigate(['/common-modules/workgroups']);
                  } else {
                      inst.notify.showWarning(response.message);
                  }
              }, error => {
                  //(error);
              });
          }
      }

  }
  goBack() {
    // window.history.back();
    this.location.back();

    //( 'goBack()...' );
  }

}

