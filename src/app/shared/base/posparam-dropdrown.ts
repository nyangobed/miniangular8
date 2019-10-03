import {PosParamBase} from "./PosParamBase";

export class DropdownPosParam extends PosParamBase<string>{
    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}


