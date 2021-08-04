import { getNames } from '../effects/plants.js'
import { redirectToWikipediaPage } from '../effects/http.js'
import { pipeAsync, splitNames, takeRandomItem } from '../helpers/utils.ts'

const redirectToRandomPlantPage = request => pipeAsync(
  getNames,
  splitNames,
  takeRandomItem,
  redirectToWikipediaPage(request)
)()

export default redirectToRandomPlantPage
