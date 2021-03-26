import './Welcome.scss'

import React from 'react'
import { Divider } from '@material-ui/core'

interface WelcomeProps {
  id: any
}

const Welcome: React.FC<WelcomeProps> = ({ id }) => {
  return (
    <div id={id} className='dc-uom-welcome'>
      <img
        id={`${id}_img`}
        src='https://www.datacor.com/hubfs/Datacor_Company_Logo_RGB_Primary_Light@2x-1.png'
        alt='Datacor_Company_Logo_RGB_Primary_Light@2x-1'
        title='Datacor_Company_Logo_RGB_Primary_Light@2x-1'
      />
      <Divider className='dc-uon-welcome-divider' />

      <div id={`${id}_message`} className='dc-uom-welcome-message'>
        <h1 id={`${id}_message_header`} className='dc-uom-welcome-header'>
          Welcome to the Datacor UOM converter!
        </h1>

        <h2
          id={`${id}_instructions_header`}
          className='dc-uom-welcome-instructions-header'
        >
          Instructions
        </h2>

        <div id={`${id}_instructions`} className='dc-uom-welcome-instructions'>
          <p>
            As you adjust the units in the left dropdown, the units in the right
            dropdown will be limited to the appropriate subset of options
          </p>
          <p>
            You can enter a value into either the right or left inputs and a
            conversion will take place
          </p>
          <p>
            If you change the units of either the left or right dropdowns, the
            left value is maintained but the right is updated
          </p>
        </div>

        <h2 id={`${id}_message_end`} className='dc-uom-welcome-end'>
          Happy converting!
        </h2>
      </div>

      <Divider className='dc-uon-welcome-divider' />
    </div>
  )
}

export default Welcome
