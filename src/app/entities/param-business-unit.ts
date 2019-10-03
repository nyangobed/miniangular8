import {Product} from "./product-model";

export class BusinessItem {
    productId: Product;
    unitId: number;
    levelNo: number;
    unitName: string;
    status: string;
    creationDate: Date;
    action: string;
    actionStatus: string;
    intrash: string;
}