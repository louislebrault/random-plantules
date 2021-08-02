import { serve } from "https://deno.land/std@0.103.0/http/server.ts";
import { getRandomPlantName } from './main.js'

// Beaucoup de page manquante alors qu'elle existe sur wikipedia, ptete en utilisant leur api search on
// aurait moins de page manquante ?
// //https://fr.wikipedia.org/wiki/Sp%C3%A9cial:ApiSandbox#action=query&format=json&list=search&utf8=1&srsearch=Calepine%20irreguliere

const server = serve({ port: 1234 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:1234/`);

for await (const request of server) {
  const headers = new Headers()

  const location = 'https://fr.wikipedia.org/wiki/' + await getRandomPlantName()

  headers.set('Location', location)

  request.respond({ status: 302, headers });
}
