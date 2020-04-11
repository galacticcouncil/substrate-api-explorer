import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { text } from '@storybook/addon-knobs'

import { ExploreApiBreadcrumbs } from 'components'

storiesOf('COMPONENTS|ExploreApiBreadcrumbs', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('default', () => {
    const urlKnob = text(
      'apiexplorer.polkalert.com/explore-api/',
      'query/staking',
      'other'
    )

    return (
      <div style={{ padding: '24px' }}>
        <ExploreApiBreadcrumbs match={{ url: `/explore-api/${urlKnob}` }} />
      </div>
    )
  })
