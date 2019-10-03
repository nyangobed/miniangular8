import {PosParamBase} from '../base/PosParamBase';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable()
export class PosParamControlService {
    constructor() { }

    toFormGroup(posparams: PosParamBase<any>[] ) {
    const group: any = {};

    posparams.forEach(posparam => {
      group[posparam.key] = posparam.required ? new FormControl(posparam.value || '', Validators.required)
                                              : new FormControl(posparam.value || '');
    });
    return new FormGroup(group);
  }
}
