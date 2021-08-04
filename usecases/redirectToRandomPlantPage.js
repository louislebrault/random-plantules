import { getNames } from '../effects/plants.js'
import { redirectToWikipediaPage } from '../effects/http.ts'
import { pipeAsync, splitNames, takeRandomItem } from '../helpers/utils.ts'

const redirectToRandomPlantPage = request => pipeAsync(
  getNames,
  splitNames,
  takeRandomItem,
  redirectToWikipediaPage(request)
)()

export default redirectToRandomPlantPage
