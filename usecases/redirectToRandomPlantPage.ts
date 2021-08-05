import { getNames } from '../effects/plants.ts'
import { redirectToWikipediaPage } from '../effects/http.ts'
import { pipeAsync, splitNames, takeRandomItem } from '../helpers/utils.ts'
import { ServerRequest } from "https://deno.land/std@0.103.0/http/server.ts";

export interface Input {
  request: ServerRequest
}

type Output = Promise<void>

type redirectToRandomPlantPage = (input: Input) => Output
const redirectToRandomPlantPage:redirectToRandomPlantPage = ({ request }) => pipeAsync(
  getNames,
  splitNames,
  takeRandomItem,
  redirectToWikipediaPage(request)
)('lol')

export default redirectToRandomPlantPage
