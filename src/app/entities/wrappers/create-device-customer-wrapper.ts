import {TerminalIdCurrency} from './terminal-id-currency';

export class CreateDeviceCustomerWrapper {
    merchantName: string;
    merchantReference: string;
    outletNumber: string;
    address: string;
    location: string;
    phone: string;
    postilionIp: string;
    postilionPort: number;
    tmsServerIp: string;
    tmsServerPort: number;
    tsyncIp: string;
    tsyncPort: number;
    adminPassword: string;
    merchantPassword: string;
    receiptProfile: string;
    transactionCounter: number;
    multicurrency: Array<TerminalIdCurrency>;
}

