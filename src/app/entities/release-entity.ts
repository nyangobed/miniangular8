export class ReleaseEntity {
    ids: Array<number>;
    notes: string;
    status: string

    constructor(ids: Array<number>, notes: string, status: string) {
        this.ids = ids;
        this.notes = notes;
        this.status = status;

    }
}