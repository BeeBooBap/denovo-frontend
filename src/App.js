import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import ViewAllCases from './pages/ViewAllCases/ViewAllCases'
import Case from '../src/pages/Casepage/Case'
import Dashboard from '../src/pages/Dashboard/Dashboard'
import NewMatter from './pages/NewMatter/NewMatter'
import Navbar from '../src/components/NavBar/NavBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
          <Route 
              path="/"
              element={<Dashboard />}
            />
            <Route 
              path="/view-all"
              element={<ViewAllCases />}
            />
            <Route 
              path="/:handle"
              element={<Case />}
            />
            <Route 
              path="/new-matter"
              element={<NewMatter />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
