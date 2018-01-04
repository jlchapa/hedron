import { combineReducers } from 'redux'
import { ignoreActions } from 'redux-ignore'

import sketchesReducer from './sketches/reducer'
import projectReducer from './project/reducer'
import inputsReducer from './inputs/reducer'
import nodesReducer from './nodes/reducer'
import inputLinkReducer from './inputLinks/reducer'
import midiReducer from './midi/reducer'
import clockReducer from './clock/reducer'
import availableModulesReducer from './availableModules/reducer'
import displaysReducer from './displays/reducer'
import macroReducer from './macros/reducer'
import uiReducer from './ui/reducer'

const ignoreList = [
  'CLOCK_PULSE', 'CLOCK_BEAT_INC',
  'CLOCK_BPM_UPDATE', 'INPUT_FIRED',
  'NODE_VALUE_UPDATE'
]

const rootReducer = combineReducers({
  nodes: ignoreActions(nodesReducer, ['CLOCK_PULSE', 'CLOCK_BEAT_INC',
    'CLOCK_BPM_UPDATE']),
  availableModules: ignoreActions(availableModulesReducer, ignoreList),
  sketches: ignoreActions(sketchesReducer, ignoreList),
  project: ignoreActions(projectReducer, ignoreList),
  inputs: ignoreActions(inputsReducer, ignoreList),
  inputLinks: ignoreActions(inputLinkReducer, ignoreList),
  clock: ignoreActions(clockReducer, ['INPUT_FIRED', 'NODE_VALUE_UPDATE']),
  midi: ignoreActions(midiReducer, ignoreList),
  displays: ignoreActions(displaysReducer, ignoreList),
  macros: ignoreActions(macroReducer, ignoreList),
  ui: ignoreActions(uiReducer, ignoreList)
})

export default rootReducer
