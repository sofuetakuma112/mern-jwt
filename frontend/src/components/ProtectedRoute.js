import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (user === undefined) {
    // userステートの初期値はundefined
    return <p>Loading...</p>;
  }

  if (!user) {
    // user情報の取得に失敗した場合はステートはnull
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
