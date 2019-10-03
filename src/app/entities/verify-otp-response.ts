import {Users} from "./users-model";

export class VerifyOtpResponse {
    permissions: Array<string>;
    userDetails: Users;
}
