import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {TdDigitsPipe} from '@covalent/core/common';
import {multi, single} from './data';
import {HttpStewardService} from '../../shared/services/http-steward.service';
import {Notify} from '../../shared/classes/notify';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    single: any[];
    multi: any[];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    yAxisLabel = 'Statistics';

    colorScheme: any = {
        domain: ['#1565C0', '#03A9F4', '#FFA726', '#FFCC80'],
    };

    // line, area
    autoScale = true;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, public router: Router) {
        Object.assign(this, {single});
        // Chart Multi
        this.multi = multi.map((group: any) => {
            group.series = group.series.map((dataItem: any) => {
                dataItem.name = new Date(dataItem.name);
                return dataItem;
            });
            return group;
        });
    }

    ngOnInit() {
        // const inst = this;
        // this.stewardService.get('dashboard').subscribe(response => {
        //         //(response);
        //         if (response.code === 200) {
        //             inst.single = response.data.single;
        //             inst.multi = response.data.multi;
        //         } else if (response.code === 401) {
        //             localStorage.clear();
        //             this.router.navigate(['/login']);
        //         } else if (response.code === 404) {
        //             localStorage.clear();
        //             this.router.navigate(['/login']);
        //         } else if (response.code === 500) {
        //             localStorage.clear();
        //             this.router.navigate(['/login']);
        //         } else {
        //             //(response);
        //         }
        //     },
        //     error => {
        //         //(error);
        //     });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    axisDigits(val: any): any {
        return new TdDigitsPipe().transform(val);
    }
}
