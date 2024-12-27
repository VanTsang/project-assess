import React from'react'
import { BrowserRouter as Router} from'react-router-dom'
import RouterConfig from './router/routerConfig'
import { Provider } from'react-redux'
import { store } from './store'
function App() {
  

  return (
    <Provider store={store}>
    <Router>
      <RouterConfig />
    </Router>
    </Provider>
  )
}

export default App
