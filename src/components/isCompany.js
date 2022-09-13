import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom";
 
function IsCompany( { children } ) {
  
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  console.log(user)

  if (isLoading) return <p><img src={'https://c.tenor.com/y6RVjd7Dz8sAAAAC/loading-waiting.gif'}/></p>;
 
  if (!isLoggedIn || user.userType !== 'company') {

    return <Navigate to="/" />;
  } else {

    return children;
  }
}
 
export default IsCompany;