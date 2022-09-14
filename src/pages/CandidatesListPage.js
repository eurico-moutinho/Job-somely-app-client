import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Card, Button, Image } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"


function CandidatesListPage() {
  const [candidates, setCandidates] = useState([]);

  const storedToken = localStorage.getItem("authToken");
  const { isLoggedIn } = useContext(AuthContext);


  const getAllCandidates = () => {
    axios
      .get(`https://awful-red-kimono.cyclic.app/api/candidates`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) =>{
        console.log(response.data)
         setCandidates(response.data)})
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCandidates();
    // eslint-disable-next-line
  }, [storedToken]);


  return (
    <div className="CandidatesListPage">
      <header className="row">

        <div className="col">

          <Image src="/job-somely-header3.png" className="shadow-lg background-cover img-fluid fluid mx-auto d-block opacity-80" alt="candidates header" />

        </div>
      </header>
      <div className="container">

        <div className="my-5">
          <h2 className="mb-4 fw-bold">Candidates</h2>
          <p>Great work places should work with great candidates. Here you will find the largest high quality candidate pool in the world. All candidates are hand picked and vetted.</p>
        </div> <hr />
      </div>
      <div className="container mt-5">
        <div className="album my-5 pb-2 px-4 bg-primary bg-opacity-25 shadow-lg">

          <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-4 g-4 mb-5">

            {candidates.map((candidate) => {
              return (
                <div className="Candidates col" key={candidate._id} >
                  <Card className="pagecard shadow-lg" >
                    <Card.Img variant="top" className="rounded-circle rounded m-auto my-2" style={{ width: '120px' }} src={candidate.image} />
                    <Card.Header className="fw-bold" as="h5">{candidate.firstName} {candidate.lastName}</Card.Header>
                    <Card.Body>
                      <Card.Title>Primary Role:</Card.Title>
                      <Card.Text>
                        {candidate.role}
                      </Card.Text>
                      {isLoggedIn && (
                        <Button className="bg-gradient" variant="primary"><NavLink to={`/candidates/${candidate._id}`}><p className="text-white m-0">More Details</p></NavLink></Button>)}
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

export default CandidatesListPage;