import Fastify from 'fastify';
import proxy from '@fastify/http-proxy';

import scrambler from 'json-scrambler';

import 'dotenv/config';

const MAX_PAYLOAD_SIZE = 1048576 * 10;

// Proxy options
const PROXY_PORT = process.env.PROXY_PORT || 4000;
const PROXY_UPSTREAM = process.env.PROXY_UPSTREAM || 'http://localhost:3000';

// Scrambler options
const SCRAMBLER_CHAOS = process.env.SCRAMBLER_CHAOS || 10;

const scramblerOptions = {
  chaos: SCRAMBLER_CHAOS,
  scrambleStructureOnly: true
};

const fastify = Fastify({
  logger: true,
  bodyLimit: MAX_PAYLOAD_SIZE
});

fastify.register(proxy, {
  upstream: PROXY_UPSTREAM,
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

fastify.listen({ port: PROXY_PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});