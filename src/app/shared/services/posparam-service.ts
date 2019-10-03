import {Injectable} from '@angular/core';
import {PosParamBase} from '../base/PosParamBase';
import {TextboxPosParam} from '../base/posparam-textbox';

@Injectable()
export class PosParamService {

    params: any[] = [];

    getParams() {
        const posparams: PosParamBase<any>[] =
            [

                new TextboxPosParam({
                    key: 'upperLimit',
                    label: 'Upper Limit',
                    type: 'number',
                    required: true,
                    order: 1
                })
                ,

                new TextboxPosParam({
                    key: 'lowerLimit',
                    label: 'Lower Limit',
                    type: 'number',
                    required: true,
                    order: 2
                })
            ];

        /*let order = 1;
        this.params.forEach(res => {
            if (res.controlType === 'textbox') {
                const value: any =
                    new TextboxPosParam({
                        key: res.key,
                        label: res.label,
                        type: res.datatype,
                        required: false,
                        order: order
                    });

                posparams.push(value);
            }
            order++;
        });*/

        // //(JSON.stringify(posparams));

        return posparams.sort((a, b) => a.order - b.order);
    }

    setParams(param: any[]) {
        this.params = param;
    }

}
