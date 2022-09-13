import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom";
 
function IsCandidate( { children } ) {
  
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  if (isLoading) return <p><img src={'https://c.tenor.com/y6RVjd7Dz8sAAAAC/loading-waiting.gif'}/></p>;
 
  if (!isLoggedIn || user.userType!=='candidate') {

    return <Navigate to="/" />;
  } else {

    return children;
  }
}
 
export default IsCandidate