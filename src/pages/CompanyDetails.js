import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';


function CompanyDetailsPage(props) {
    const [company, setCompany] = useState(null);
    // Get the URL parameter `:companyId` 
    const { companyId } = useParams();

    const storedToken = localStorage.getItem("authToken");


    const getCompany = () => {
        axios
            .get(`https://jobsomely.herokuapp.com/api/companies/${companyId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneCompany = response.data;
                setCompany(oneCompany);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getCompany();
        // eslint-disable-next-line
    }, []);


    return (
        <div className="CompanyDetails" style={{ backgroundColor: 'rgb(234, 243, 248) ' }} >
            <div className="p-5 bg-image" style={{ backgroundImage: `url(/job-somely-home-header81.png)`, height: '300px', backgroundRepeat: 'no-repeat', backgroundSize: "cover" }} />
            {company && (
                <div className="mx-5">
                    <div className="card mb-5 mx-md-5 shadow-5-strong shadow-lg" id="no-scale" style={{ marginTop: "-75px", backgroundColor: 'rgb(255, 225, 148) ', background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(10px)" }}>
                        <div className=" py-4">
                            <div className="container">
                                <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
                                    <div className="text-center col-md-5 ">
                                        <div className="py-5">
                                            <div>
                                                <h2 style={{ color: 'rgb(34, 28, 148)' }}>{company.name}</h2>
                                            </div>
                                            <div>
                                                <p style={{ color: 'rgb(71, 19, 33)' }} ><strong style={{ color: 'rgb(34, 28, 148)' }}>Company Location:</strong> {company.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-start col-md-6 px-5">
                                        <p style={{ color: 'rgb(34, 28, 148)' }}><strong>Company Description:</strong></p>
                                        <p style={{ whiteSpace: 'pre-wrap', color: 'rgb(71, 19, 33)' }}>{company.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <NavLink className="mx-2" to="/companies">
                                    <Button variant="outline-success" style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}>Back to Companies</Button>
                                </NavLink>


                                <NavLink className="mx-2" to="/jobs">
                                    <Button variant="outline-success" style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}>Back to Jobs</Button>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                </div>

            )
            }

            <div className="container mt-5">
                <div className="album my-5 pb-2 px-4 shadow-lg" style={{ backgroundColor: 'rgb(255, 225, 148)' }}>

                    <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4 mb-5">


                        {company &&
                            company.jobs.map((job) => (
                                <div key={job._id} className="col">
                                    <Card className="pagecard mx-2 shadow-lg" style={{ backgroundColor: 'rgb(234, 243, 248)' }}>
                                        <Card.Header className="fw-bold" as="h5" style={{ color: 'rgb(34, 28, 148)' }}>{job.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Title style={{ color: 'rgb(34, 28, 148)' }}>Level: {job.level}</Card.Title>
                                            <Card.Text style={{ color: 'rgb(71, 19, 33)' }}>
                                                Skills: {job.skills}
                                            </Card.Text>
                                            <Button style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }} ><NavLink to={`/jobs/${job._id}`}><p className=" m-0" style={{ color: 'rgb(41, 52, 98)' }}>More Details</p></NavLink></Button>

                                        </Card.Body>
                                    </Card>

                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CompanyDetailsPage;