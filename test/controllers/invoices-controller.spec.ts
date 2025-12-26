import 'mocha';
import * as request from 'supertest';
import * as sinon from 'sinon';
import * as express from 'express';
import axios from 'axios';
import { InvoiceController } from '../../src/controllers/invoices-controller';
import { AbstractCsvStrategy } from '../../src/strategies/abstract-csv-strategy';
import { IInvoiceDTO, IZenApiConfig } from '../../src/models/zen-api';

describe('BaseBatchController via InvoiceController', () => {
  let app: express.Express;
  let controller: InvoiceController;
  let csvStrategyMock: sinon.SinonStubbedInstance<AbstractCsvStrategy<IInvoiceDTO>>;
  let axiosPostStub: sinon.SinonStub;
  let axiosGetStub: sinon.SinonStub;

  const mockConfig: IZenApiConfig = {
    uri: 'http://api.fake.zenvia',
  };

  before(() => {
    csvStrategyMock = {
      generate: sinon.stub(),
    } as unknown as sinon.SinonStubbedInstance<AbstractCsvStrategy<IInvoiceDTO>>;

    controller = new InvoiceController(mockConfig, csvStrategyMock as any);

    app = express();
    app.use(express.json());

    app.post('/invoices', controller.create.bind(controller));
    app.get('/invoices', controller.list.bind(controller));
    app.get('/invoices/:batchId', controller.get.bind(controller));
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('POST /invoices', () => {
    it('should create a batch successfully returning 200', async () => {
      const payload = [{ invoiceNumber: '999', totalAmount: '100,00' }] as any;
      const csvOutput = 'invoiceNumber;totalAmount\n999;100,00';
      const zenviaResponse = { id: 'batch-inv-1', status: 'PROCESSING' };

      csvStrategyMock.generate.returns(csvOutput);
      axiosPostStub = sinon.stub(axios, 'post').resolves({ data: zenviaResponse });

      const res = await request(app)
        .post('/invoices')
        .set('x-api-token', 'valid-token')
        .send(payload);

      if (res.status !== 200) throw new Error(`Status ${res.status}`);

      sinon.assert.calledOnceWithExactly(csvStrategyMock.generate, payload);
      sinon.assert.calledOnce(axiosPostStub);

      const [url, , config] = axiosPostStub.firstCall.args;

      // Validação Crítica: ResourceName 'invoice' gera 'invoice-batches'
      if (url !== 'http://api.fake.zenvia/invoice-batches') {
        throw new Error(`Invalid URL: ${url}`);
      }

      if (config.headers['x-api-token'] !== 'valid-token') {
        throw new Error('Invalid Token Header');
      }
    });

    it('should return 500 when axios fails', async () => {
      csvStrategyMock.generate.returns('csv');
      sinon.stub(axios, 'post').rejects(new Error('Network Error'));
      sinon.stub(console, 'error');

      const res = await request(app)
        .post('/invoices')
        .set('x-api-token', 'token')
        .send([{ invoiceNumber: '888' }]);

      if (res.status !== 500) throw new Error(`Status ${res.status}`);
      if (res.body.error !== 'Error processing invoice') throw new Error('Invalid error message');
    });
  });

  describe('GET /invoices', () => {
    it('should list batches passing query params', async () => {
      const zenviaList = { items: [] };
      axiosGetStub = sinon.stub(axios, 'get').resolves({ data: zenviaList });

      await request(app)
        .get('/invoices?page=1&size=50')
        .set('x-api-token', 'token-list')
        .expect(200)
        .expect(zenviaList);

      sinon.assert.calledOnce(axiosGetStub);
      const [url, config] = axiosGetStub.firstCall.args;

      if (url !== 'http://api.fake.zenvia/invoice-batches') throw new Error('Invalid URL');
      if (config.params.page !== '1' || config.params.size !== '50') throw new Error('Invalid Params');
    });
  });

  describe('GET /invoices/:batchId', () => {
    it('should get batch details by id', async () => {
      const batchDetails = { id: 'b-inv-999', status: 'FINISHED' };
      axiosGetStub = sinon.stub(axios, 'get').resolves({ data: batchDetails });

      await request(app)
        .get('/invoices/b-inv-999')
        .set('x-api-token', 'token-get')
        .expect(200)
        .expect(batchDetails);

      sinon.assert.calledOnce(axiosGetStub);
      const [url] = axiosGetStub.firstCall.args;

      if (url !== 'http://api.fake.zenvia/invoice-batches/b-inv-999') {
        throw new Error(`Invalid URL: ${url}`);
      }
    });
  });
});
