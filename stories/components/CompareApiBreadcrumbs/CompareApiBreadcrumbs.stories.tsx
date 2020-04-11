import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { text } from '@storybook/addon-knobs'

import { CompareApiBreadcrumbs } from 'components'

storiesOf('COMPONENTS|CompareApiBreadcrumbs', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('default', () => {
    const apiNameKnob = text(
      'apiName',
      'wss://kusama-rpc.polkadot.io/',
      'props'
    )
    const urlKnob = text(
      'apiexplorer.polkalert.com/compare-api/',
      'query/staking',
      'other'
    )

    return (
      <div style={{ padding: '24px' }}>
        <CompareApiBreadcrumbs
          apiName={apiNameKnob}
          match={{ url: `/compare-api/${urlKnob}` }}
        />
      </div>
    )
  })
