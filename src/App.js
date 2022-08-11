import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'

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
  return (
    <main className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="container">
          
          <Sidebar/>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/create' element={<Create/>} />
          </Routes>
          <Graphs/>
        </div>
        
        
      </BrowserRouter>
    </main>
  );
}

export default App;
