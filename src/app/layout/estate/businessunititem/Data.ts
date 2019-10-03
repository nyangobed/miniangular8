
import {BusinessUnitItem} from "../../../entities/param-business-unit-item-model";

export interface Data {
    content: BusinessUnitItem[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    sort: boolean;
    first: number;
    numberOfElements: number;
    size: number;
    number: number;
}