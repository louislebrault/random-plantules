import { uniq, keepTruthies, sortAlphab, pipeAsync } from '../helpers/utils.ts'
import { writePlantNamesFile } from '../effects/plants.js'
import plantNames from '../data/raw-plant-names.js'

const writeCleanPlantNamesFile = () => pipeAsync(
  uniq,
  keepTruthies,
  sortAlphab,
  writePlantNamesFile,
)(plantNames);

export default writeCleanPlantNamesFile
