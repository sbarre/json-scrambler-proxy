import Fastify from 'fastify';
import proxy from '@fastify/http-proxy';

import scrambler from 'json-scrambler';

import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const MAX_PAYLOAD_SIZE = 1048576 * 10;

// Proxy options
const UPSTREAM = process.env.UPSTREAM || 'http://localhost:4000';
// const PREFIX = process.env.PREFIX || '/';

// Scrambler options
const CHAOS = process.env.CHAOS || 10;

const scramblerOptions = {
  chaos: CHAOS,
  scrambleStructureOnly: true
};

const fastify = Fastify({
  logger: true,
  bodyLimit: MAX_PAYLOAD_SIZE
});

fastify.register(proxy, {
  upstream: UPSTREAM,
  prefix: '/',
  disableRequestLogging: true,
  proxyPayloads: false
}).after(err => {
  if (err) throw err;
});

fastify.addHook('onSend', (request, reply, payload, done) => {
  const data = [];
  payload.on('data', chunk => data.push(chunk));
  payload.on('end', () => {
    const body = Buffer.concat(data).toString('utf8');
    const scrambledBody = scrambler(body, scramblerOptions);
    done(null, scrambledBody);
  })
});

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});