import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Chart } from 'chart.js';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    constructor(private httpStewardService: HttpStewardService<any, any>) {}

    /** declare the chart variable */
    chart: Array<any>;

    /** STORE THE TOTALS FOR DISPLAY ON THE DASHBOARD */
    dashTotal = [];
    dashShipped = [];
    shipped: number;

    ngOnInit() {

        /** FETCH DATA FOR OTHER GRAPHS */
        this.httpStewardService
            .fetchDashboard('atlas/repair/status')
            .subscribe(response => {

                /** GET THE DATA AND STORE IT IN A VARIABLE */
                const xLabel = response['content']['0'];

                /** GET THE OBJECT KEYS */
                const xAxis = Object.keys(xLabel);

                /** LOOP USING KEYS TO FETCH DATA */
                const ingenico = xAxis.map(ing => xLabel[ing]);
                const tracom = xAxis.map(trc => xLabel[trc]);
                const pending_delivery = xAxis.map(pd => xLabel[pd]);
                const pending_repair = xAxis.map(pr => xLabel[pr]);
                const delivered_devices = xAxis.map(dd => xLabel[dd]);
                const repair_inProgress = xAxis.map(rip => xLabel[rip]);
                const repairable = xAxis.map(rep => xLabel[rep]);
                const unrepairable = xAxis.map(unr => xLabel[unr]);

                /** LOOP THROUGH THE KEYS TO GET THE INDEXES AND VALUE */
                const _ingenico = xAxis.map((value, index) => {
                    return ingenico[index].Ingenico;
                });
                const _tracom = xAxis.map((value, index) => {
                    return tracom[index].Tracom;
                });
                const pendingDelivery = xAxis.map((value, index) => {
                    return pending_delivery[index].pending_delivery;
                });
                const pendingRepair = xAxis.map((value, index) => {
                    return pending_repair[index].Pending_repair;
                });
                const deliveredDevices = xAxis.map((value, index) => {
                    return delivered_devices[index].delivered_devices;
                });
                const inProgress = xAxis.map((value, index) => {
                    return repair_inProgress[index].repair_in_progress;
                });
                const repaired = xAxis.map((value, index) => {
                    return repairable[index].Repaired;
                });
                const unrepaired = xAxis.map((value, index) => {
                    return unrepairable[index].Unrepairable;
                });

                /** Create the chart and define its type with other parameters */
                this.chart = new Chart('canvas', {
                    type: 'bar',
                    data: {
                        labels: xAxis,
                        datasets: [
                            {
                                label: 'Tracom',
                                data: _tracom,
                                backgroundColor: '#22a7f0',
                                borderColor: '#22a7f0',
                                borderWidth: 2
                            },
                            {
                                label: 'Ingenico',
                                data: _ingenico,
                                backgroundColor: '#db0a5b',
                                borderColor: '#db0a5b',
                                borderWidth: 2
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Repair Centre Data'
                        },
                        scales: {
                            xAxes: [
                                {
                                    display: true
                                }
                            ],
                            yAxes: [
                                {
                                    display: true
                                }
                            ]
                        }
                    }
                });

                /** Create the chart and define its type with other parameters */
                this.chart = new Chart('canvas-line', {
                    type: 'line',
                    data: {
                        labels: xAxis,
                        datasets: [
                            {
                                label: 'Pending Repair',
                                data: pendingRepair,
                                backgroundColor: '#ec644b',
                                borderColor: '#ec644b',
                                fill: false
                            },
                            {
                                label: 'In Progress',
                                data: inProgress,
                                backgroundColor: '#2e3131',
                                borderColor: '#2e3131',
                                fill: false
                            },
                            {
                                label: 'Repaired',
                                data: repaired,
                                backgroundColor: '#0E8732',
                                borderColor: '#0E8732',
                                fill: false
                            },
                            {
                                label: 'Unrepairable',
                                data: unrepaired,
                                backgroundColor: '#FF0101',
                                borderColor: '#FF0101',
                                fill: false
                            },
                            {
                                label: 'Pending Delivery',
                                data: pendingDelivery,
                                backgroundColor: '#19b5fe',
                                borderColor: '#19b5fe',
                                fill: false
                            },
                            {
                                label: 'Delivered',
                                data: deliveredDevices,
                                backgroundColor: '#00e640',
                                borderColor: '#00e640',
                                fill: false
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Repair Progress Chart'
                        },
                        scales: {
                            xAxes: [
                                {
                                    display: true
                                }
                            ],
                            yAxes: [
                                {
                                    display: true
                                }
                            ]
                        }
                    }
                });
            });

        /** FETCH PIE CHART DATA TO DISPLAY REPAIR LEVEL */
        this.httpStewardService
            .fetchDashboard('atlas/repair/level/status')
            .subscribe(response => {

                /** GET THE DATA AND STORE IT IN A VARIABLE */
                const levelData = response['data'];

                /** GET ALL THE OBJECT VALUES NOT STARTING WITH LEVEL */
                const _totals = Object.keys(levelData).map(res => {
                    const lvl = res.startsWith('level');
                    if (!lvl) {
                        return levelData[res];
                    }
                });

                /** GET DATA IN TERMS OF TOTALS */
                const totals = _totals.filter(res => res >= 0);



                /** STORE THE TOTALS IN THE DASHBOARD TOTALS ARRAY */
                this.dashTotal = totals;


                /** GET ALL THE OBJECT VALUES STARTING WITH LEVEL */
                const lbl = Object.keys(levelData).map(res => {
                    const lvl = res.startsWith('level');
                    if (lvl) {
                        return levelData[res];
                    }
                });

                /** GET SPECIFIC LEVEL DATA */
                const _levels = lbl.filter(res => res !== undefined);

                /** GET THE VALUE OF THE SHIPPED TERMINALS AND ADD IT TO THE DASHBOARD TOTALS. */
                this.shipped = _levels[1];
                this.dashTotal.push(this.shipped);


                /** GET LEVEL KEYS */
                const objKeys = Object.keys(levelData);

                /** FILTER KEYS TO GET THE LEVEL */
                const filterKeys = objKeys.filter(res => res.startsWith('level'));


                /** Create the chart and define its type with other parameters */
                this.chart = new Chart('canvas-pie', {
                    type: 'pie',
                    data: {
                        labels: filterKeys,
                        datasets: [
                            {
                                data: _levels,
                                backgroundColor: [
                                    '#f1a9a0',
                                    '#f03434',
                                    '#d5b8ff',
                                    '#7befb2',
                                    '#6bb9f0'
                                ],
                                borderColor: [
                                    '#f1a9a0',
                                    '#f03434',
                                    '#d5b8ff',
                                    '#7befb2',
                                    '#6bb9f0'
                                ]
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        borderAlign: 'inner',
                        title: {
                            display: true,
                            text: 'Repair Level Data'
                        }
                    }
                });
            });
    }
}
