import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import { ExploreApiConst } from 'components'

storiesOf('COMPONENTS|ExploreApiConst', module).add('default', () => {
  const nameKnob = text('name', 'bar', 'props')
  const pathKnob = text('path', 'api.query.foo.bar', 'props')
  const typeKnob = text('type', 'number', 'props')
  const descriptionKnob = text(
    'description',
    'This is the description.',
    'props'
  )
  const valueKnob = text('value', '123', 'props')

  return (
    <div style={{ maxWidth: 800, padding: '24px' }}>
      <ExploreApiConst
        name={nameKnob}
        path={pathKnob}
        type={typeKnob}
        description={descriptionKnob}
        value={valueKnob}
      />
    </div>
  )
})
