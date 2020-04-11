import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { text, boolean } from '@storybook/addon-knobs'

import { CompareApiLink } from 'components'

storiesOf('COMPONENTS|CompareApiLink', module)
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
    const addedKnob = boolean('states.added', true, 'props')
    const deletedKnob = boolean('states.deleted', true, 'props')
    const updatedKnob = boolean('states.updated', true, 'props')

    return (
      <div style={{ maxWidth: 800, padding: '24px' }}>
        <CompareApiLink
          name={nameKnob}
          description={descriptionKnob}
          states={{
            added: addedKnob,
            deleted: deletedKnob,
            updated: updatedKnob
          }}
        />
      </div>
    )
  })
