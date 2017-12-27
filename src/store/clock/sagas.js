import { takeEvery, put, call } from 'redux-saga/effects'
import * as a from './actions'
import { inputFired } from '../inputs/actions'
import now from 'performance-now'

let deltaInc = Math.PI * 2 / 48
let pulses, delta, beats, lastBar

export const clockReset = () => {
  pulses = 0
  delta = 0
  beats = 0
  lastBar = now()
}

export const newPulse = () => {
  pulses++
  delta += deltaInc
  if (pulses > 23) {
    pulses = 0
    beats++
    if (beats > 3) {
      beats = 0
    }
  }
  return { pulses, beats, delta }
}

export const calcBpm = () => {
  let newBar = now()
  let msperbar = newBar - lastBar
  lastBar = newBar
  return Math.round(240000 / msperbar)
}

export function* clockUpdate () {
  const info = yield call(newPulse)
  yield put(inputFired('lfo', info.delta, { type: 'lfo' }))

  if (info.pulses === 0) {
    yield put(a.clockBeatInc())

    if (info.beats === 0) {
      const bpm = yield call(calcBpm)
      yield put(a.clockBpmUpdate(bpm))
    }
  }
}

export function* watchClock () {
  yield takeEvery('CLOCK_PULSE', clockUpdate)
  yield takeEvery('CLOCK_RESET', clockReset)
}

clockReset()