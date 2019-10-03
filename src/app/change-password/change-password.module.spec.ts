
import {ChangeComponentModule} from "./change-password.module";

describe('ChangeComponentModule', () => {
    let changeComponentModule: ChangeComponentModule;

    beforeEach(() => {
        changeComponentModule = new ChangeComponentModule();
    });

    it('should create an instance', () => {
        expect(changeComponentModule).toBeTruthy();
    });
});
