import world from './engine/world.js'
import { screen, ipcRenderer } from 'electron'
import { displaysListUpdate } from './store/displays/actions'
let store

const updateDisplays = () => {
  const displays = screen.getAllDisplays()
  ipcRenderer.send('update-displays', displays)
  store.dispatch(displaysListUpdate(displays))
}

export const initiateScreens = (injectedStore) => {
  store = injectedStore
  updateDisplays()
}

screen.on('display-added', updateDisplays)
screen.on('display-removed', updateDisplays)
screen.on('display-metrics-changed', updateDisplays)

export const sendOutput = (index) => {
  const display = screen.getAllDisplays()[index]

  let outputWin = window.open('', 'modal')

  ipcRenderer.send('reposition-output-window', display)

  outputWin.document.write('<div style="width:100vw;height:100vh;"></div>')
  outputWin.document.body.style.margin = '0'
  outputWin.document.body.style.cursor = 'none'

  outputWin.addEventListener('beforeunload', () => {
    world.stopOutput()
  })

  setTimeout(() => {
    world.setOutput(outputWin)
  }, 1000)
}

ipcRenderer.on('send-output', (e, index) => {
  sendOutput(index)
})

export const openDevTools = () => {
  ipcRenderer.send('open-dev-tools')
}
