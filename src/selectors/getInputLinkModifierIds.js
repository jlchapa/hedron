export default (state, id) => {
  const link = state.inputLinks[id]

  if (!link.input) return undefined

  if (link.nodeType === 'shot') {
    if (link.input.type === 'audio') {
      return link.modifierIds.filter(id => {
        return state.nodes[id].key !== 'threshold'
      })
    } else {
      return undefined
    }
  }

  return link.modifierIds.filter(id => {
    const modType = state.nodes[id].type
    return !modType || modType === link.input.type
  })
}
