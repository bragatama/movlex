import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";

const Protected = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return null;
    }
    return <>{user ? children : <Navigate to={"/"} />}</>;
};

export default Protected;
