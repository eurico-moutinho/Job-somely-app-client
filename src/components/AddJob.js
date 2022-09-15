import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';


function AddJob(props) {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("")
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [level, setLevel] = useState("");
    const [location, setLocation] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    const [place, setPlace] = useState('Lisbon');

    const getCompany = () => {
        axios
            .get(`https://jobsomely.herokuapp.com/api/mycompany`,
                { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                const oneCompany = response.data;
                setCompany(oneCompany.name);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getCompany();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMsg("");

        const requestBody = {
            title: title,
            description: description,
            skills: skills,
            level: level,
            location: location
        };

        axios
            .post(
                `https://jobsomely.herokuapp.com/api/jobs`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const newJobId = response.data._id;
                navigate(`/jobs/${newJobId}`);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="text-center" style={{ backgroundColor: 'rgb(234, 243, 248) ' }}>

            <div className="p-5 bg-image" style={{ backgroundImage: `url(/job-somely-header4.png)`, height: '300px', backgroundRepeat: 'no-repeat', backgroundSize: "cover" }} />


            <div className="card mx-4 mb-5 mx-md-5  shadow-5-strong shadow-lg" id="no-scale" style={{ marginTop: "-100px", backgroundColor: 'rgb(255, 225, 148)', background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-4" style={{ color: 'rgb(34, 28, 148)' }}>Add Job Opportunities</h2>
                            {errorMsg &&
                                <p classNameName="error">
                                    {errorMsg}
                                </p>
                            }
                            <Form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" style={{ color: 'rgb(34, 28, 148)' }}>Job Title</label>
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
                                            <label className="form-label" style={{ color: 'rgb(34, 28, 148)' }}>Company Name</label>
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
                                            <label className="form-label" style={{ color: 'rgb(34, 28, 148)' }}>Job Description</label>
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
                                            <label className="form-label" style={{ color: 'rgb(34, 28, 148)' }}>Required Skills</label>
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
                                            <label className="form-label" style={{ color: 'rgb(34, 28, 148)' }}>Level</label>
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
                                            <label className="form-label" style={{ color: 'rgb(34, 28, 148)' }}>Location</label>

                                            <input
                                                type="text"
                                                name="location"
                                                value={location}
                                                onChange={(e) => {
                                                    setPlace(location);
                                                    setLocation(e.target.value)
                                                }} className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button type="submit" className=" px-5 mb-4"
                                        style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }} >Save Changes</Button>

                                </div>
                            </Form>

                            <div>
                                <iframe width="600" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${place}&t=&z=13&ie=UTF8&iwloc=&output=embed`}>
                                </iframe><a href="https://fmovies-online.net"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default AddJob;