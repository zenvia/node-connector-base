/* tslint:disable curly */
import * as request from 'supertest';
import * as sinon from 'sinon';
import * as app from '../../src/app';
import * as webhookHandler from '../../src/handlers/webhook-handler';
import { App } from 'supertest/types';

describe('/webhook endpoint', () => {

  let appInit: App;
  let webhookHandlerStub: sinon.SinonStub<[webhook: any], Promise<void>>;

  before(async () => {
    appInit = await app.init();
    webhookHandlerStub = sinon.stub(webhookHandler, 'webhookHandler').resolves();
  });

  after(() => {
    webhookHandlerStub.restore();
  });

  describe('Success responses', () => {

    it('should return success on handle webhook', (done) => {
      const payload = {
        from: 'FROM_IDENTIFIER',
        message: 'SOME_MESSAGE',
      };

      const token = 'WEBHOOK_TOKEN';

      request(appInit)
      .post('/v1/webhook')
      .set('x-auth-token', token)
      .send(payload)
      .expect(204)
      .end((err, res) => {
        if (err) done(err);
        res.status.should.equal(204);
        done();
      });
    });

  });

});
