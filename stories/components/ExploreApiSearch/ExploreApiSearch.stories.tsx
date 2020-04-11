import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'

import { ExploreApiSearch } from 'components'

storiesOf('COMPONENTS|ExploreApiSearch', module).add('default', () => {
  const focusOnMountKnob = boolean('focusOnMount', true, 'props')
  const queryKnob = text('query', 'Default value', 'props')

  return (
    <div style={{ padding: '24px' }}>
      <ExploreApiSearch
        focusOnMount={focusOnMountKnob}
        query={queryKnob}
        storybookDemo
      />
    </div>
  )
})
