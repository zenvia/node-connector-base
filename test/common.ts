import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

process.env.TZ = 'UTC';
process.env.LOGGING_FORMATTER_DISABLED = 'true';
