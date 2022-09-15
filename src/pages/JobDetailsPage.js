import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"


function JobDetailsPage(props) {
    const [job, setJob] = useState(null);
    const [message, setMessage] = useState("")
    // Get the URL parameter `:jobId` 
    const { jobId } = useParams();

    const storedToken = localStorage.getItem("authToken");

    const { user } = useContext(AuthContext);
    const isOwner = (obj) => (typeof (user) !== 'undefined' && obj.owner === user._id)

    const [place, setPlace] = useState('');

    const getJob = () => {
        axios
            .get(`https://jobsomely.herokuapp.com/api/jobs/${jobId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneJob = response.data;
                setJob(oneJob);
                setPlace(oneJob.location)
            })
            .catch((error) => console.log(error));
    };

    const applyJob = () => {
        setMessage("");
        axios
            .post(`https://jobsomely.herokuapp.com/api/apply/${jobId}`, {},
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                setMessage("An error occurred");
                console.log(error);
            });
    };


    useEffect(() => {
        getJob();
        // eslint-disable-next-line
    }, []);


    return (
        <div className="JobDetails" style={{ backgroundColor: 'rgb(234, 243, 248) ' }}>
            <div className="p-5 bg-image" style={{ backgroundImage: `url(/)`, height: '300px', backgroundRepeat: 'no-repeat', backgroundSize: "cover" }} />
            {job && (
                <div className="mx-5">
                    <div className="card mb-5 mx-md-5 shadow-5-strong shadow-lg" id="no-scale" style={{ marginTop: "-75px", backgroundColor: 'rgb(255, 225, 148)', backdropFilter: "blur(10px)" }}>
                        <div className="py-4">
                            <div className="container">
                                <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
                                    <div className="text-center col-md-5 ">
                                        <div className="py-5">
                                            <div className="mb-5">
                                                <h2 style={{ color: 'rgb(34, 28, 148)' }}>{job.title}</h2>
                                            </div>
                                            <div>
                                                <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Company:</strong> {job.company.name}</p>
                                                <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Level:</strong> {job.level}</p>
                                                <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Skills:</strong> {job.skills}</p>
                                                <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Location:</strong> {job.location}</p>
                                                {isOwner(job) &&
                                                    <div className="pt-3">
                                                        <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Applicants:</strong></p>
                                                        <div>
                                                            {job.applicants.map((applicant) => {
                                                                return (<p key={applicant._id}><NavLink to={`/candidates/${applicant._id}`}>{applicant.firstName + " " + applicant.lastName}</NavLink></p>)
                                                            })}
                                                        </div>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-start col-md-6 px-5">
                                        <p ><strong style={{ color: 'rgb(34, 28, 148)' }}>Job Description:</strong></p>
                                        <p style={{ whiteSpace: 'pre-wrap', color: 'rgb(71, 19, 33)' }}>{job.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center col-md-10">
                            <NavLink className="mx-4" to="/jobs">
                                <Button style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }} ><p className=" m-0" style={{ color: 'rgb(41, 52, 98)' }}>Back to Jobs</p></Button>
                            </NavLink>

                            {user.userType === "candidate" &&
                                <Button onClick={applyJob} style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }} >Apply the Job</Button>}
                            {/* // <Button variant="outline-success" onClick={applyJob} style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}  ><p className=" m-0" style={{ color: 'rgb(41, 52, 98)' }}>Apply the Job</p></Button>
                            // <Button variant="outline-success" onClick={applyJob} style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }}>Apply the Job</Button> */}
                            {isOwner(job) && <NavLink to={`/jobs/edit/${jobId}`}>
                                <Button style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }} >Edit Job</Button>
                            </NavLink>}
                        </div>
                        <p>{message}</p>
                    </div>
                    <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-8 g-20">

                        <iframe width="600" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${place}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                        </iframe><a href="https://fmovies-online.net"></a>

                    </div>
                </div>

            )
            }

        </div >
    );
}

export default JobDetailsPage;