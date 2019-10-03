import {PosParamBase} from "./PosParamBase";

export class TextboxPosParam extends PosParamBase<string>{
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}

