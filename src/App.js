import React from 'react';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';

function App() {
  // const [user, setUser] = useState(null);

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        
      </Routes>
    </Router>
  
    
    // <div>
    //   {user ? (
    //     <Chat userId={user._id} receiverId="receiver_id_here" />
    //   ) : (
    //     <Login setUser={setUser} />
    //   )}
    // </div>
  );
}

export default App;
