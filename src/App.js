import "./custom.scss";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import JobsListPage from "./pages/JobsListPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import CompaniesListPage from "./pages/CompaniesList";
import CompanyDetailsPage from "./pages/CompanyDetails";
import CandidatesListPage from "./pages/CandidatesListPage";
import CandidateDetailsPage from "./pages/CandidateDetails";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AddEditCandidate from "./components/AddEditCandidate";
import AddEditCompany from "./components/AddEditCompany";
import AddJob from "./components/AddJob";
import EditJobPage from "./pages/EditJobPage";
import IsPrivate from "./components/isPrivate";
import IsCompany from "./components/isCompany";
import IsCandidate from "./components/isCandidate";
import IsAnon from "./components/isAnon";
import ErrorPage from "./components/ErrorPage";


function App() {

  return (
    <div className="App d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs/" element={<JobsListPage />} />
        <Route path="/jobs/:jobId" element={<IsPrivate><JobDetailsPage /></IsPrivate>} />
        <Route path="/companies" element={<IsPrivate><CompaniesListPage /></IsPrivate>} />
        <Route path="/companies/:companyId" element={<IsPrivate><CompanyDetailsPage /></IsPrivate>} />
        <Route path="/candidates" element={<IsCompany><CandidatesListPage /></IsCompany>} />
        <Route path="/candidates/:candidateId" element={<IsPrivate><CandidateDetailsPage /></IsPrivate>} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/myprofile" element={<IsCandidate><AddEditCandidate /></IsCandidate>} />
        <Route path="/mycompany" element={<IsCompany><AddEditCompany /></IsCompany>} />
        <Route path="/jobs/create" element={<IsCompany><AddJob /></IsCompany>} />
        <Route path="/jobs/edit/:jobId" element={<IsCompany><EditJobPage /></IsCompany>} />
        <Route path="*" element={ <ErrorPage /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;