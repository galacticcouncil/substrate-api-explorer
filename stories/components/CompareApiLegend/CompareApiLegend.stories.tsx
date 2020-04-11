import React from 'react'
import { storiesOf } from '@storybook/react'

import { CompareApiLegend } from 'components'

storiesOf('COMPONENTS|CompareApiLegend', module).add('default', () => (
  <div style={{ padding: '24px' }}>
    <CompareApiLegend />
  </div>
))
