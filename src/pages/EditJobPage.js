import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';


function EditJobPage(props) {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("")
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [level, setLevel] = useState("");
    const [location, setLocation] = useState("");

    const { jobId } = useParams();
    const navigate = useNavigate();


    const storedToken = localStorage.getItem("authToken");

    const [place, setPlace] =useState(location);

    useEffect(() => {
        axios
            .get(`https://jobsomely.herokuapp.com/api/jobs/${jobId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneJob = response.data;
                setTitle(oneJob.title);
                setCompany(oneJob.company.name)
                setDescription(oneJob.description);
                setSkills(oneJob.skills);
                setLevel(oneJob.level);
                setLocation(oneJob.location);
                setPlace(oneJob.location)
            })
            .catch((error) => console.log(error));

    }, [jobId, storedToken]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            title: title,
            description: description,
            skills: skills,
            level: level,
            location: location
        };

        // Make a PUT request to update the job
        axios
            .put(
                `https://jobsomely.herokuapp.com/api/jobs/${jobId}`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                // Once the request is resolved successfully and the project
                // is updated we navigate back to the details page
                navigate(`/jobs/${jobId}`)
            });
    };

    const deleteJob = () => {
        // Make a DELETE request to delete the job
        axios
            .delete(
                `https://jobsomely.herokuapp.com/api/jobs/${jobId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(() => {
                // Once the delete request is resolved successfully

                navigate("/jobs");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="text-center">

            <div className="p-5 bg-image" style={{ backgroundImage: `url(/job-somely-header4.png)`, height: '300px', backgroundRepeat: 'no-repeat', backgroundSize: "cover" }} />


            <div className="card mx-4 mb-5 mx-md-5 bg-light bg-opacity-75 shadow-5-strong shadow-lg" id="no-scale" style={{ marginTop: "-100px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-4">Edit The Job Opportunity</h2>

                            <Form onSubmit={handleFormSubmit}>
                                <div className="row">
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <label className="form-label">Job Title</label>
                                            <input type="text"
                                                name="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)} className="form-control" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <label className="form-label">Company Name</label>
                                            <input type="text"
                                                name="company"
                                                value={company}
                                                disabled className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <label className="form-label">Job Description</label>
                                            <textarea
                                                type="text"
                                                name="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)} cols="30" rows="4" wrap="hard" className="form-control" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <label className="form-label">Required Skills</label>
                                            <input
                                                type="text"
                                                name="skills"
                                                value={skills}
                                                onChange={(e) => setSkills(e.target.value)} className="form-control" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <label className="form-label">Level</label>
                                            <input
                                                type="text"
                                                name="level"
                                                value={level}
                                                onChange={(e) => setLevel(e.target.value)} className="form-control" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <label className="form-label">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={location}
                                                onChange={(e) => { setPlace(location);
                                                    setLocation(e.target.value)}} className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button className="bg-gradient text-white px-3 mx-4 mb-4" variant="danger" onClick={deleteJob}>Delete The Job</Button>
                                    <Button type="submit"
                                        className="bg-gradient text-white px-5 mb-4">Save Changes</Button>

                                </div>

                            </Form>
                            <div>
                                    <iframe width="600" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${place}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                        </iframe><a href="https://fmovies-online.net"></a>
                                        </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default EditJobPage;