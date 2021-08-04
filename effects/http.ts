import { serve, ServerRequest } from "https://deno.land/std@0.103.0/http/server.ts";
import redirectToRandomPlantPage from '../usecases/redirectToRandomPlantPage.js';

// Beaucoup de page manquante alors qu'elle existe sur wikipedia, ptete en utilisant leur api search on
// aurait moins de page manquante ?
// //https://fr.wikipedia.org/wiki/Sp%C3%A9cial:ApiSandbox#action=query&format=json&list=search&utf8=1&srsearch=Calepine%20irreguliere

type start = () => void
export const start:start = async () => {
  const server = serve({ port: 1234 });
  console.log(`HTTP webserver running.  Access it at:  http://localhost:1234/`);

  for await (const request of server) {
    redirectToRandomPlantPage(request)
  }

  return server
}

type redirectToWikipediaPage = (request: ServerRequest) => (pageName: string) => void
export const redirectToWikipediaPage:redirectToWikipediaPage = request => pageName => {
  const WIKIPEDIA_BASE_URL = 'https://fr.wikipedia.org/wiki/'

  const headers = new Headers()
  headers.set('Location', WIKIPEDIA_BASE_URL + pageName)

  request.respond({ status: 302, headers });
}
