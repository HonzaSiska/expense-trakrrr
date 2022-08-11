import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import { Redirect } from 'react-router-dom'
//styles
import './App.css';

//components
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Graphs from './components/graphs/Graphs';

//pages
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Create from './pages/create/Create';


function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <main className="App">
      { authIsReady && (
        <BrowserRouter>
        <Navbar/>
        <div className="container">
          
          {user &&  <Sidebar/>}
          <Routes>
            <Route path='/' element={user ? <Dashboard/> : <Navigate to='/login'/>} />
            <Route path='/login' element={!user  ?<Login/>: <Navigate to='/'/>} />
            <Route path='/signup' element={!user ? <Signup/>: <Navigate to='/'/>} />
            <Route path='/create' element={user ? <Create/> : <Navigate to='/'/>} />
          </Routes>
          { user && <Graphs/>}
        </div> 
      </BrowserRouter>
      )}
    </main>
  );
}

export default App;
