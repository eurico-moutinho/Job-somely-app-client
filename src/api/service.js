import axios from "axios";

const storedToken = localStorage.getItem("authToken");
 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "https://awful-red-kimono.cyclic.app/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});
 
const errorHandler = (err) => {
  throw err;
};
 
const getProfile = () => {
  return api.get("/candidates",
  { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((res) => res.data)
    .catch(errorHandler);
};
 
const uploadImage = (file) => {
  return( 
    api.post("/upload", file,
  { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(res => res.data)
    .catch(errorHandler))
};
 
const createProfile = (myprofile) => {
  return api.post("/candidates", myprofile,
  { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(res => res.data)
    .catch(errorHandler);
};
 
export default {
  getProfile,
  uploadImage,
  createProfile
};