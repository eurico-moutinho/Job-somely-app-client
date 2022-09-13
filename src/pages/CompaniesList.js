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
      .get(`${process.env.REACT_APP_API_URL}/api/companies`,
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
    <div className="CompaniesListPage">
      <header className="row">

        <div className="col">

          <Image src="/job-somely-header2.png" className="shadow-lg background-cover img-fluid fluid mx-auto d-block opacity-80" alt="companies header" />

        </div>
      </header>
      <div className="container">

        <div className="my-5">
          <h2 className="mb-4 fw-bold">Companies</h2>
          <p>We are only working with the best companies all ovver the world. Companies are eveluated on their office, salary and culture.</p>
          <p>They are all great places to work and we can vouch for them.</p>
        </div> <hr />
      </div>
      <div className="container mt-5">
        <div className="album my-5 pb-2 px-4 bg-primary bg-opacity-25 shadow-lg">

          <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4 mb-5">

            {companies.map((company) => {
              return (
                <div className="col" key={company._id}>
                  <Card className="pagecard mx-2 shadow-lg" >
                    <Card.Header className="fw-bold" as="h5">{company.name}</Card.Header>
                    <Card.Body>
                      <Card.Title>Location: { }</Card.Title>
                      <Card.Text>
                        {company.address}
                      </Card.Text>
                      {isLoggedIn && (
                        <Button className="bg-gradient" variant="primary"><NavLink to={`/companies/${company._id}`}><p className="text-white m-0">More Details</p></NavLink></Button>)}
                      {!isLoggedIn && (
                        <Button className="bg-gradient" variant="primary"><NavLink to={`/login`}><p className="text-white m-0">More Details</p></NavLink></Button>)}
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompaniesListPage;