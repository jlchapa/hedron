import { connect } from 'react-redux'
import Param from '../../components/Param'
import { nodeOpenToggle } from '../../store/nodes/actions'

const mapStateToProps = (state, ownProps) => {
  const param = state.nodes[ownProps.nodeId]
  return {
    title: param.title,
    isOpen: param.isOpen
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onOpenClick: () => { dispatch(nodeOpenToggle(ownProps.nodeId)) }
})

const ParamContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Param)

export default ParamContainer