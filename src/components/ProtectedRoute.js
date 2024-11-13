import { Navigate } from 'react-router-dom';
import { getFromLocalStorage } from '../services/operations/SecureLocal';
function ProtectedRoute({ children }) {
    const isLoggedIn = getFromLocalStorage('isLoggedIn') === true; // Use localStorage for persistence
    return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
