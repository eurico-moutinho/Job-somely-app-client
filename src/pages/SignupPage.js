import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Image, Form } from 'react-bootstrap';
import { AuthContext } from '../context/auth.context';



function SignupPage(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("candidate");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, username, userType };

    axios.post(`https://awful-red-kimono.cyclic.app/api/signup`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();

        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="SignUpPage" style={{ backgroundColor: 'rgb(234, 243, 248) ' }} >
      <div className="container py-5 h-100" >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10" >
            <div className="card shadow-lg" id="no-scale" >
              <div className="row g-0" style={{ backgroundColor: 'rgb(255, 225, 148)' }}>
                <div className="col-md-6 col-lg-5 d-none d-md-block"  >
                  <Image src="/job-somely-sign-up2.jpg" alt="signup form" className="img-fluid h-100 rounded shadow-lg" />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <Form onSubmit={handleSignupSubmit}>

                      <div className="feature-icon d-flex align-items-center mb-3 pb-1">

                        {/* <Image className="mx-auto" src="/job-somely-logo1.png" width={"100"} /> */}
                        {/* <h2 className="text-center" style={{ color: 'rgb(46, 45, 64)' }}>Jobsomely</h2> */}
                      </div>


                      <h5 className="fw-normal mb-3 pb-3  fw-bold" style={{ color: 'rgb(46, 45, 64)' }}>Create your account</h5>
                      {errorMessage && <p className="error-message text-danger fw-bold ">{errorMessage}</p>}

                      <div className="form-outline mb-4">
                        <label className="form-label" style={{ color: 'rgb(46, 45, 64)' }}>Username</label>
                        <input type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg"
                          placeholder="Jobsomely" required />



                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" style={{ color: 'rgb(46, 45, 64)' }}>Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg"
                          placeholder="jobsomely@jobsomely.com" required />


                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" style={{ color: 'rgb(46, 45, 64)' }}>Password</label>
                        <input type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg"
                          placeholder="********" required />


                      </div>
                      <div className="form-outline my-4">
                        <label className="form-label" style={{ color: 'rgb(46, 45, 64)' }}>Please Select User Type</label>
                        <select className="form-control form-control-lg form-select" value={userType} onChange={(e) => setUserType(e.target.value)}>
                          <option value="candidate" >Candidate</option>
                          <option value="company">Company</option>
                        </select>

                      </div>

                      <div className="pt-1 mb-4">
                        <Button className=" btn-lg w-100" type="submit" style={{ borderRadius: "40px", color: 'rgb(255, 225, 148)', border: "solid", backgroundColor: 'rgb(41, 52, 98)' }} >Register</Button>
                      </div>
                      <p className="mb-4 pb-lg-2" style={{ color: 'rgb(46, 45, 64)' }}>Already have an account? Click
                        <NavLink to={"/login"}> Login</NavLink> to login.</p>
                      <div>
                        <NavLink to="#!" className="small text-muted" style={{ color: 'rgb(46, 45, 64)' }}>Terms of use.</NavLink>
                        <NavLink to="#!" className="small text-muted" style={{ color: 'rgb(46, 45, 64)' }}>Privacy policy</NavLink>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default SignupPage;
