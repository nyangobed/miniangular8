import {Users} from "./users-model";

export class AuditTrail {
    logId: number;
    occurenceTime: Date;
    user: Users;
    activityType: string;
    status: string;
    entityName: string;
    entityId: string;
    description: string;
    notes: string;
    source: string;
    ipAddress: string;
    
}
