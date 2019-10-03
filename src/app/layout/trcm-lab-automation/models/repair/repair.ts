export interface Repair {
    id: number;
    devices: {
        serialnumber: string;
        partnumber: string;
        imeinumber: string;
        deviceContractStatus: string;
        deviceWarantyStatus: string;
        actionStatus: string;
        deviceowner: string;
    };
    deviceError: {
        code: string;
        codeName: string;
        description: string;
        createdOn: Date;
    };
    parts: {
        partNumber: string;
        partModel: string;
        partName: string;
        description: string;
        quantity: string;
        manufacturerName: string;
        createdOn: Date;
    };
    users: {
        email: string;
        fullName: string;
        phoneNumber: string;
    };
    levels: any;
    customers: string;
    clientName: string;
    reportedDefects: string;
    failureFound: string;
    repairCentre: string;
    batchNumber: string;
    createdOn: Date;
    comments: string;
    actions: string;
    qaTest: string;

    get: any;
}


export class RepairClass implements Repair {
    id: number;    devices: { serialnumber: string; partnumber: string; imeinumber: string; deviceContractStatus: string; deviceWarantyStatus: string; actionStatus: string; deviceowner: string; };
    deviceError: { code: string; codeName: string; description: string; createdOn: Date; };
    parts: { partNumber: string; partModel: string; partName: string; description: string; quantity: string; manufacturerName: string; createdOn: Date; };
    users: { email: string; fullName: string; phoneNumber: string; };
    levels: any;
    customers: string;
    clientName: string;
    reportedDefects: string;
    failureFound: string;
    repairCentre: string;
    batchNumber: string;
    createdOn: Date;
    comments: string;
    actions: string;
    qaTest: string;
    get: any;

    constructor(){}


}
