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
            .get(`https://awful-red-kimono.cyclic.app/api/companies/${companyId}`,
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
        <div className="CompanyDetails">
            <div className="p-5 bg-image" style={{ backgroundImage: `url(/job-somely-header5.png)`, height: '300px', backgroundRepeat: 'no-repeat', backgroundSize: "cover" }} />
            {company && (
                <div className="mx-5">
                    <div className="card mb-5 mx-md-5 bg-light bg-opacity-75 shadow-5-strong shadow-lg" id="no-scale" style={{ marginTop: "-75px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
                        <div className=" py-4">
                            <div className="container">
                                <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
                                    <div className="text-center col-md-5 border">
                                        <div className="py-5">
                                            <div>
                                                <h2>{company.name}</h2>
                                            </div>
                                            <div>
                                                <p><strong>Company Location:</strong> {company.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-start col-md-6 px-5">
                                        <p><strong>Company Description:</strong></p>
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{company.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <NavLink className="mx-2" to="/companies">
                                    <Button className="bg-gradient text-white px-5 mb-4">Back to Companies</Button>
                                </NavLink>

                                <NavLink className="mx-2" to="/jobs">
                                    <Button className="bg-gradient text-white px-5 mb-4">Back to Jobs</Button>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                </div>

            )
            }

            <div className="container mt-5">
                <div className="album my-5 pb-2 px-4 bg-primary bg-opacity-25 shadow-lg">

                    <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4 mb-5">


                        {company &&
                            company.jobs.map((job) => (
                                <div key={job._id} className="col">
                                    <Card className="pagecard mx-2 shadow-lg">
                                        <Card.Header className="fw-bold" as="h5">{job.title}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>Level: {job.level}</Card.Title>
                                            <Card.Text>
                                                Skills: {job.skills}
                                            </Card.Text>
                                            <Button className="bg-gradient" variant="primary"><NavLink to={`/jobs/${job._id}`}><p className="text-white m-0">More Details</p></NavLink></Button>
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