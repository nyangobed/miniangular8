import {Product} from "./product-model";
import {ITdDynamicElementConfig} from "@covalent/dynamic-forms";

export class ParamConfig {
    fileOutputName: string;
    paramDefId: string;
    params: string;
    paramType: string;
    productId: Product;
    elements: ITdDynamicElementConfig[] = [];
}

