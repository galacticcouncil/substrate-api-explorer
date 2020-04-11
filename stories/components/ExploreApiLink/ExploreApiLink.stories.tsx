import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { text } from '@storybook/addon-knobs'

import { ExploreApiLink } from 'components'

storiesOf('COMPONENTS|ExploreApiLink', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('default', () => {
    const nameKnob = text('name', 'fooBar', 'props')
    const descriptionKnob = text(
      'description',
      'This is the description',
      'props'
    )

    return (
      <div style={{ maxWidth: 800, padding: '24px' }}>
        <ExploreApiLink name={nameKnob} description={descriptionKnob} />
      </div>
    )
  })
