// In any component where you need to use authentication
import { useAuth } from '../context/AuthContext';

const SomeComponent = () => {
    const { authToken, login, logout } = useAuth();

    // You can use authToken, login, or logout here as needed
    console.log("Authentication Token:", authToken);
    return (
        <div>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
};
