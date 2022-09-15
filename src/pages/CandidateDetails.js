import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Button, Image } from 'react-bootstrap';


function CandidateDetailsPage(props) {
    const [candidate, setCandidate] = useState(null);
    const [message, setMessage] = useState("");
    // Get the URL parameter `:candidateId` 
    const { candidateId } = useParams();
    console.log(candidateId)

    const storedToken = localStorage.getItem("authToken");


    const getCandidate = () => {
        setMessage("");
        axios
            .get(`https://jobsomely.herokuapp.com/api/candidates/${candidateId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setMessage("");
                const oneCandidate = response.data;
                setCandidate(oneCandidate);
            })
            .catch((error) => {
                setMessage("Oops! This candidate does not exist :(");
                console.log(error)
            });
    };

    useEffect(() => {
        getCandidate();
        // eslint-disable-next-line
    }, []);


    return (
        <div className="CandidateDetails" style={{ backgroundColor: 'rgb(234, 243, 248) ' }}>
            <div className="p-5 bg-image" style={{ backgroundImage: `url(/job-somely-header5.png)`, height: '300px', backgroundRepeat: 'no-repeat', backgroundSize: "cover" }} />
            {message &&
                <div className="mx-5">
                    <div className="card mb-5 mx-md-5 shadow-5-strong shadow-lg" id="no-scale" style={{ marginTop: "-75px", backgroundColor: 'rgb(34, 28, 148)', background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
                        <div className="my-5 py-4" style={{ backgroundColor: 'rgb(234, 243, 248) ' }}>
                            <div className="container  mt-2 px-4 " style={{ backgroundColor: 'rgb(234, 243, 248) ' }}>
                                <div className="row wow fadeIn">
                                    <div className="col">
                                        <h1 className="text-center">{message}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            {
                candidate && (
                    <div className="mx-5">
                        <div className="card mb-5 mx-md-5  shadow-5-strong shadow-lg" id="no-scale" style={{ marginTop: "-100px", backgroundColor: 'rgb(255, 225, 148)', background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(50px)" }}>
                            <div className="my-5 py-4">
                                <div className="container dark-grey-text mt-2 px-4 5">
                                    <div className="row wow fadeIn">
                                        <div className="col-md-3">
                                            <Image src={candidate.imageUrl} alt="candidate" className="rounded-circle rounded shadow-lg img-fluid w-100" />
                                        </div>
                                        <div className="text-start col-md-5 pt-5">
                                            <div className="p-4">
                                                <div className="mb-3">
                                                    <h2 style={{ color: 'rgb(34, 28, 148)' }}>{candidate.firstName} {candidate.lastName}</h2>
                                                </div>
                                                <div className="lead">
                                                    <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Primary Role:</strong> {candidate.role}</p>


                                                    <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Skills:</strong> {candidate.skills}</p>
                                                    <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>{candidate.firstName} {candidate.lastName}'s </strong> <a target="_blank" href={`${candidate.linkedin}`} > LinkedIn Profile</a></p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="text-start col-md-4 pt-5">
                                            <div className="p-4">
                                                <div className="mb-3 pt-4">
                                                    <h2> </h2>
                                                </div>
                                                <div className="lead">
                                                    <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Email:</strong> {candidate.email}</p>
                                                    <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Phone Number:</strong> {candidate.phone}</p>
                                                    <p style={{ color: 'rgb(71, 19, 33)' }}><strong style={{ color: 'rgb(34, 28, 148)' }}>Current Location:</strong> {candidate.location}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-start col-md-3 mb-4" />

                                        <div className="text-start col-md-8 mb-4 ps-4">

                                            <p className="lead font-weight-bold" style={{ color: 'rgb(34, 28, 148)' }}><strong>About:</strong></p>
                                            <p style={{ whiteSpace: 'pre-wrap', color: 'rgb(71, 19, 33)' }}>{candidate.about}</p>

                                        </div>



                                        <div className="my-4">
                                            <NavLink to="/candidates">
                                                <Button style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }} >Back to Candidates</Button>
                                                {/* <Button ><p className="m-0" style={{ color: 'rgb(41, 52, 98)' }}>More Details</p>/Button>)} */}
                                            </NavLink>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
        </div >
    )
}

export default CandidateDetailsPage;