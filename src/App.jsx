import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Home } from "./pages/Home";
import { Profile } from './pages/Profile.jsx';
import MisTransportes from './pages/MisTransportes.jsx';


function App() {

  return (
    <div className="flex w-full h-screen relative">
    
        <AuthProvider>
          <Routes>

            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/mis-transportes" 
              element={
                <ProtectedRoute>
                  <MisTransportes />
                </ProtectedRoute>
              } 
            />

            <Route path="/login" element={<Login />} />
            
            <Route path="/register" element={<Register />} />
          
          </Routes>
        </AuthProvider>
    </div>
  )
}

export default App
