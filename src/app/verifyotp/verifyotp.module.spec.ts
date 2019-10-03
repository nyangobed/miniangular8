import {VerifyotpModule} from './verifyotp.module';

describe('VerifyotpModule', () => {
  let verifyotpModule: VerifyotpModule;

  beforeEach(() => {
    verifyotpModule = new VerifyotpModule();
  });

  it('should create an instance', () => {
    expect(verifyotpModule).toBeTruthy();
  });
});


