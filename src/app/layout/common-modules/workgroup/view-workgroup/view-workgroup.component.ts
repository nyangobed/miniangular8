import { Component, OnInit } from '@angular/core';
import { Workgroups } from '../../../../entities/work-groups-model';
import { ViewParamBase } from '../../../../shared/base/viewParamBase';
import { Roles } from '../../../../entities/roles-modules';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Notify } from '../../../../shared/classes/notify';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '../../../../router.animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-workgroup',
  templateUrl: './view-workgroup.component.html',
  styleUrls: ['./view-workgroup.component.scss'],
  animations: [routerTransition()]
})
export class ViewWorkgroupComponent implements OnInit {
  model: Workgroups;
  viewparam: Array<ViewParamBase>;
  roles: Array<Roles>;

  constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, protected router: Router, private location: Location) {
      this.model = new Workgroups();
      this.viewparam = new Array();
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          if (params['id'] != null) {
              this.fetchWorkgroups(params['id']);
          }
      });
  }
  fetchWorkgroups(id: number) {
      let params: Map<any, string> = new Map();
      let inst = this;
      this.stewardService.get('ufs-common-modules/api/v1/workgroup/' + id, params).subscribe((response) => {
          if (response.code == 200) {
              inst.model = response.data;
              inst.viewparam.push({
                  value: inst.model.groupName,
                  label: 'Workgroup Name',
                  order: 1,
              });
              inst.viewparam.push({
                  value: inst.model.description,
                  label: 'Description',
                  order: 2,
              });

              inst.viewparam.push({
                  value: new Date(inst.model.createdOn).toLocaleString(),
                  label: 'Created:',
                  order: 3,
              });

              inst.loadRoles(id);
          } else {
              inst.notify.showWarning(response.message);
          }
      });
  }

  loadRoles(id: number) {
      let params: Map<any, string> = new Map();
      let inst = this;
      this.stewardService.get('ufs-common-modules/api/v1/workgroup/roles/' + id, params).subscribe((response) => {
          //('checked roles', response);
          if (response.code === 200) {
              const data = response.data;
              //('Data:', data);
              data.forEach(role => {
                  this.roles.map(mp => {
                      // if (mp.roleId === this.model.workgroupRolesIds) {
                      //     mp.checked = true;
                      // }
                  });

              });

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

