import Axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';

function App() {

  return(
    <div>
      <h1>Welcome</h1>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default App;
