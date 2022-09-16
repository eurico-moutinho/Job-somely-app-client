import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Card, Button, Image } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"


function CompaniesListPage() {
  const [companies, setCompanies] = useState([]);

  const storedToken = localStorage.getItem("authToken");
  const { isLoggedIn } = useContext(AuthContext);

  const getAllCompanies = () => {
    axios
      .get(`https://jobsomely.herokuapp.com/api/companies`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => setCompanies(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCompanies();
    // eslint-disable-next-line
  }, [storedToken]);


  return (
    <div className="CompaniesListPage" style={{ backgroundColor: 'rgb(234, 243, 248) ' }} >
      <header className="row">

        <div className="col">

          <Image src="/job-somely-header21.jpg" className="shadow-lg background-cover img-fluid fluid mx-auto d-block opacity-80" alt="companies header" />

        </div>
      </header>
      <div className="container">

        <div className="my-5">
          <h2 className="mb-4 fw-bold" style={{ color: 'rgb(34, 28, 148)' }}>Companies</h2>
          <p style={{ color: 'rgb(71, 19, 33)' }}>A hiring platform to quickly find, connect with, and manage candidates.</p>
          <p style={{ color: 'rgb(71, 19, 33)' }}>Powerful collaboration and analytics tools to manage your candidate pipeline.</p>
        </div> <hr />
      </div>
      <div className="container mt-5">
        <div className="album my-5 pb-2 px-4 shadow-lg" style={{ backgroundColor: 'rgb(255, 225, 148)' }}>

          <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4 mb-5">

            {companies.map((company) => {
              return (
                <div className="col" key={company._id}>
                  <Card className="pagecard mx-2 shadow-lg" style={{ backgroundColor: 'rgb(234, 243, 248)' }} >
                    <Card.Header className="fw-bold" as="h5" style={{ color: 'rgb(34, 28, 148)' }}>{company.name}</Card.Header>
                    <Card.Body>
                      <Card.Title style={{ color: 'rgb(71, 19, 33)' }} >Location: { }</Card.Title>
                      <Card.Text style={{ color: 'rgb(34, 28, 148)' }}>
                        {company.address}
                      </Card.Text>
                      {isLoggedIn && (
                        <Button style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}><NavLink to={`/companies/${company._id}`}><p className=" m-0" style={{ color: 'rgb(41, 52, 98)' }}>More Details</p></NavLink></Button>)}
                      {!isLoggedIn && (
                        <Button style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}><NavLink to={`/login`}><p className=" m-0" style={{ color: 'rgb(41, 52, 98)' }}>More Details</p></NavLink></Button>)}

                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div >
  );
}

export default CompaniesListPage;