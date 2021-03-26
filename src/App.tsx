import './styles/App.scss'

import React from 'react'

import Converter from './components/converter/Converter'
import Welcome from './components/welcome/Welcome'

interface AppProps {
  i18n: any
}

const App: React.FC<AppProps> = () => {
  return (
    <div className='dc-uom'>
      <Welcome id='dc_welcome' />
      <Converter id='dc_converter' />
    </div>
  )
}

export default App
