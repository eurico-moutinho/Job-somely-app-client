import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink, useSearchParams } from "react-router-dom";
import { Card, Button, Image, Form } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"


function JobsListPage() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const title = searchParams.get("q");

  const getAllJobs = () => {
    axios
      .get(`https://jobsomely.herokuapp.com/api/jobs`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => setJobs(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    navigate(`/jobs/?q=${query}`);
    if (title !== '') {
      axios
        .get(`https://jobsomely.herokuapp.com/api/jobs`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
          setJobs(response.data.filter(job => { return job.title.toLowerCase().includes(title.toLowerCase()) }))
        })
        .catch((error) => console.log(error));
    } else { getAllJobs(); }
  }, [storedToken, title]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    navigate(`/jobs/?q=${query}`);
    setSearchParams(title)
  };

  const { isLoggedIn } = useContext(AuthContext);

  return (

    <div className="JobsListPage" style={{ backgroundColor: 'rgb(234, 243, 248) ' }}>
      <header className="row">

        <div className="col">

          <Image src="/job-somely-header1.jpg" className="shadow-lg background-cover img-fluid fluid mx-auto d-block opacity-90" alt="jobs header" />

        </div>
      </header>
      <div className="container">

        <div className="my-5">
          <h2 className="mb-4 fw-bold" style={{ color: 'rgb(34, 28, 148)' }}>Job Opportunities</h2>
          <p className=" mb-0 " style={{ color: 'rgb(71, 19, 33)' }}>An online job platform that targets your jobs to the right people..</p>
        </div> <hr />

        <div className="row my-5" >
          <div className="col-lg-4 mb-2-2 mb-lg-0"  >
            <div className="card card-style13" style={{ backgroundColor: 'rgb(245, 245, 245,0)' }}>
              <div className="card-body" >
                <span className="icon-circle green mb-4"><i className="ti-bar-chart"></i></span>
                <h3 className="h5 fw-bold" style={{ color: 'rgb(34, 28, 148)' }}>Post your job</h3>
                <p className="w-95 w-lg-100 display-30" style={{ color: 'rgb(71, 19, 33)' }}>Tell us what you’re looking for with easy-to-use job description templates and  <span style={{ color: 'rgb(34, 28, 148)' }}><strong>Jobsomely</strong></span> will find relevant candidates.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-2-2 mb-lg-0">
            <div className="card card-style13" style={{ backgroundColor: 'rgb(245, 245, 245,0)' }}>
              <div className="card-body">
                <span className="icon-circle orange mb-4"><i className="ti-ruler-pencil"></i></span>
                <h3 className="h5 fw-bold" style={{ color: 'rgb(34, 28, 148)' }}>Get great applicants, fast</h3>
                <p className="w-95 w-lg-100 display-30" style={{ color: 'rgb(71, 19, 33)' }}>People come to <span style={{ color: 'rgb(34, 28, 148)' }}><strong>Jobsomely</strong></span> data to match your job with a person’s skills, experience, and goals. This personalised targeting puts your job in front of relevant matches to make it easier for them to apply.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card card-style13" style={{ backgroundColor: 'rgb(245, 245, 245,0)' }}>
              <div className="card-body">
                <span className="icon-circle blue mb-4"><i className="ti-layers-alt"></i></span>
                <h3 className="h5 fw-bold" style={{ color: 'rgb(34, 28, 148)' }}>Access an engaged community</h3>
                <p className="w-95 w-lg-100 display-30" style={{ color: 'rgb(71, 19, 33)' }}>People come to <span style={{ color: 'rgb(34, 28, 148)' }}><strong>Jobsomely</strong></span>  every day to discover opportunities and build their careers. We put your job in front of the most qualified members — and those open to new opportunities.</p>
              </div>
            </div>
          </div>
        </div><hr />
      </div>
      <div className="container mt-5">
        <Form className="d-flex" onSubmit={handleFormSubmit}>
          <Form.Control
            type="search"
            value={query}
            placeholder="Search Job"
            className="me-2 border border-2"
            aria-label="Search"
            onChange={(e) => { setQuery(e.target.value) }}
          />

          <Button variant="outline-success" type='submit' style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}>Search</Button>
        </Form>
        <div className="album my-5 pb-2 px-4 shadow-lg" style={{ backgroundColor: 'rgb(255, 225, 148)' }}>

          <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4 mb-5">

            {jobs.map((job) => {
              return (
                <div key={job._id} className="col">
                  <Card className="pagecard mx-2 shadow-lg" style={{ backgroundColor: 'rgb(234, 243, 248)' }}>
                    <Card.Header className="fw-bold" as="h5" style={{ color: 'rgb(34, 28, 148)' }} >{job.title}</Card.Header>
                    <Card.Body>
                      <Card.Title style={{ color: 'rgb(34, 28, 148)' }} >Company: {job.company.name}</Card.Title>
                      <Card.Text style={{ color: 'rgb(71, 19, 33)' }} >
                        Level: {job.level}
                      </Card.Text>
                      {isLoggedIn && (
                        <Button style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}><NavLink to={`/jobs/${job._id}`}><p className=" m-0" style={{ color: 'rgb(41, 52, 98)' }}>More Details</p></NavLink></Button>)}
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
    </div>
  );
}


export default JobsListPage;