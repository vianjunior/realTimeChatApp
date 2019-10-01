import React from 'react'
import { Stack, Router, Scene } from 'react-native-router-flux'

import Inicial from './views/Inicial'

const Rotas = () => (
  <Router>
    <Stack hideNavBar={true}>
      <Scene key='inicial' component={Inicial} headerMode='none' initial />
    </Stack>
  </Router>
)

export default Rotas