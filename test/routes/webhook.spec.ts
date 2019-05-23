/* tslint:disable curly */
import * as request from 'supertest';
import * as sinon from 'sinon';
import * as app from '../../src/app';
import * as webhookHandler from '../../src/handlers/webhook-handler';

describe('/webhook endpoint', () => {

  let appInit;
  let webhookHandlerStub;

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

      request(appInit)
      .post('/v1/webhook/87ba5bf1-d9a7-4ca5-a75d-8a6cdfde6bbd')
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
