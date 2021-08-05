import { uniq, keepTruthies, sortAlphab, pipeAsync } from '../helpers/utils.ts'
import { writePlantNamesFile } from '../effects/plants.ts'
import plantNames from '../data/raw-plant-names.js'

const writeCleanPlantNamesFile = ({

}) => pipeAsync(
  uniq,
  keepTruthies,
  sortAlphab,
  joinNames,
  writePlantNamesFile,
)(plantNames);

export default writeCleanPlantNamesFile
