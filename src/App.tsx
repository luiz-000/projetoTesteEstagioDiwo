import { BrowserRouter as Router , Route , Routes} from 'react-router-dom'

import './App.css'

import Principal from './pages/Principal/Principal.tsx'

function App() {

  return (
    <Router>
      <Routes>
        
        <Route path='/' element={ <Principal/> }> </Route>
        
      </Routes>
    </Router>
  )
}

export default App
