import { serve } from "https://deno.land/std@0.103.0/http/server.ts";
import { getRandomPlantName } from './main.js'

const server = serve({ port: 1234 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:1234/`);

for await (const request of server) {
  const headers = new Headers()

  const location = 'https://fr.wikipedia.org/wiki/' + await getRandomPlantName()

  headers.set('Location', location)

  request.respond({ status: 302, headers });
}
