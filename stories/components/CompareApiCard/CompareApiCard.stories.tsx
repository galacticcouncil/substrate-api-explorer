import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { CompareApiCard } from 'components'

storiesOf('COMPONENTS|CompareApiCard', module).add('default', () => {
  const nameKnob = text('name', 'fooBar', 'props')
  const pathKnob = text('path', 'api.query.foo.bar', 'props')
  const existsMainKnob = boolean('exists.main', true, 'props')
  const existsComparisonKnob = boolean('exists.comparison', true, 'props')
  const mainApiTypeKnob = text('mainApiType', 'number', 'props')
  const comparisonApiTypeKnob = text('comparisonApiType', 'string', 'props')
  const descriptionKnob = text(
    'description',
    'This is the description.',
    'props'
  )
  const isNewKnob = boolean('states.isNew', true, 'props')
  const isAlteredKnob = boolean('states.isAltered', true, 'props')

  return (
    <div style={{ maxWidth: 800, padding: '24px' }}>
      <CompareApiCard
        name={nameKnob}
        path={pathKnob}
        exists={{ main: existsMainKnob, comparison: existsComparisonKnob }}
        mainApiParams={[{ name: 'foo' }, { name: 'bar' }]}
        comparisonApiParams={[{ name: 'baz' }, { name: 'qux' }]}
        mainApiType={mainApiTypeKnob}
        comparisonApiType={comparisonApiTypeKnob}
        description={descriptionKnob}
        states={{
          isNew: isNewKnob,
          isAltered: isAlteredKnob
        }}
      />
    </div>
  )
})
