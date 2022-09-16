import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { Container, Navbar, Nav, Image } from "react-bootstrap";


function NavBar() {
    let location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const logOutAndNavigate = () => {
        logOutUser();
        navigate("/");
    }



    return (
        <Navbar className="fw-bold" style={{ backgroundColor: 'rgb(255, 225, 148)' }} collapseOnSelect expand="lg" variant="dark">
            <Container >
                <Nav.Link href="/">
                    <Image src="/job-somely-logo1.png" height="30" className=" rounded d-inline-block align-text-top" alt="logo" />
                </Nav.Link>
                <Navbar.Brand href="/" style={{ color: 'rgb(76, 76, 109)' }} >Jobsomely</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav activeKey={location.pathname} className="me-auto">
                        <Nav.Link className="fw-bold" href="/jobs" style={{ color: 'rgb(76, 76, 109)' }} >Jobs</Nav.Link>
                        <Nav.Link className="fw-bold" href="/companies" style={{ color: 'rgb(76, 76, 109)' }} >Companies</Nav.Link>
                        <Nav.Link className="fw-bold" href="/candidates" style={{ color: 'rgb(76, 76, 109)' }} >Candidates</Nav.Link>
                    </Nav>
                    <Nav>
                        {isLoggedIn && (
                            <>
                                {user.userType === "candidate" && (
                                    <Nav.Link href="/myprofile" style={{ color: 'rgb(76, 76, 109)' }} >My Profile</Nav.Link>
                                )}
                                {user.userType === "company" && (
                                    <Nav.Link href="/mycompany" style={{ color: 'rgb(76, 76, 109)' }} >My Company</Nav.Link>
                                )}
                                <div className=" my-2 mx-2 px-2" style={{ color: 'rgb(76, 76, 109)' }} >{user && user.name}</div>
                                <Nav.Link onClick={logOutAndNavigate} style={{ color: 'rgb(76, 76, 109)' }}>Logout</Nav.Link>
                            </>
                        )}


                        {!isLoggedIn && (
                            <>
                                <Nav.Link href="/signup" style={{ color: 'rgb(76, 76, 109)' }}>Sign Up</Nav.Link>
                                <Nav.Link href="/login" style={{ color: 'rgb(76, 76, 109)' }}>Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;





