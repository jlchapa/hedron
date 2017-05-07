import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Node from '../Node'
import Row from '../Row'
import Col from '../Col'
import ParamInputSelect from '../../containers/ParamInputSelect'
import ShotButton from '../../containers/ShotButton'
import Modifier from '../../containers/Modifier'

const Wrapper = styled(Node)`
  flex: 0 0 33.33%;
  width: 33.33%;
  padding: 0.5rem;
`

const Item = styled.div`

`

const Shot = ({ onClick, nodeId, modifierIds, title, sketchId, method }) => (
  <Wrapper>
    {title}
    <Row>
      <Col>
        <ShotButton sketchId={sketchId} method={method} nodeId={nodeId} />
      </Col>
      <ParamInputSelect nodeId={nodeId} />
    </Row>
    {modifierIds && modifierIds.map((id) => (
      <Item key={id}>
        <Modifier nodeId={id} />
      </Item>
    ))}
  </Wrapper>
)

Shot.propTypes = {
  title: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
  modifierIds: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  sketchId: PropTypes.string,
  method: PropTypes.string
}

export default Shot
