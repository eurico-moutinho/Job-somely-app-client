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
      .get(`https://jobsomely.herokuapp.com/api/candidates`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log(response.data)
        setCandidates(response.data)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCandidates();
    // eslint-disable-next-line
  }, [storedToken]);


  return (
    <div className="CandidatesListPage" style={{ backgroundColor: 'rgb(234, 243, 248) ' }} >
      <header className="row">

        <div className="col">

          <Image src="/job-somely-header31.jpg" className="shadow-lg background-cover img-fluid fluid mx-auto d-block opacity-80" alt="candidates header" />

        </div>
      </header>
      <div className="container">

        <div className="my-5">
          <h2 className="mb-4 fw-bold" style={{ color: 'rgb(34, 28, 148)' }}>Candidates</h2>
          <p style={{ color: 'rgb(71, 19, 33)' }}>Let the right people know you’re open to work.</p>
        </div> <hr />
      </div>
      <div className="container mt-5">
        <div className="album my-5 pb-2 px-4 shadow-lg" style={{ backgroundColor: 'rgb(255, 225, 148)' }}>

          <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-4 g-4 mb-5">

            {candidates.map((candidate) => {
              return (
                <div className="Candidates col" key={candidate._id} >

                  <Card className="pagecard shadow-lg" style={{ backgroundColor: 'rgb(234, 243, 248)' }} >
                    <Card.Img variant="top" className="rounded-circle rounded m-auto my-2" style={{ width: '120px' }} src={candidate.imageUrl} />
                    <Card.Header className="fw-bold" as="h5" style={{ color: 'rgb(34, 28, 148)' }}>{candidate.firstName} {candidate.lastName}</Card.Header>

                    <Card.Body>
                      <Card.Title style={{ color: 'rgb(34, 28, 148)' }}>Primary Role:</Card.Title>
                      <Card.Text style={{ color: 'rgb(71, 19, 33)' }}>
                        {candidate.role}
                      </Card.Text >
                      {isLoggedIn && (
                        <Button style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}><NavLink to={`/candidates/${candidate._id}`}><p className="m-0" style={{ color: 'rgb(41, 52, 98)' }}>More Details</p></NavLink></Button>)}
                      {!isLoggedIn && (
                        <Button style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}><NavLink to={`/login`}><p className="m-0" style={{ color: 'rgb(41, 52, 98)' }}>More Details</p></NavLink></Button>)}
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