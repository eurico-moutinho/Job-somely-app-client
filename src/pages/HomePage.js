import { Button, Image } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { Card } from 'react-bootstrap';

function HomePage() {
  return (
    <div className="HomePage" style={{ backgroundColor: 'rgb(234, 243, 248) ' }} >
      <header>

        <div className="col">
          <Image src="/job-somely-home-header8123.png" className="background-cover img-fluid fluid mx-auto d-block w-100" alt="homepage header" />
        </div>
      </header>


      <div className='container'>
        <div className="row">
          <div className="feature col-md-9 text-center fw-bold  p-3">
            <h2 className=" opacity-75" style={{ color: 'rgb(214, 28, 78)' }}><span style={{ color: 'rgb(46, 45, 64)' }}><strong>A new job</strong></span> is closer than you think.</h2>
            <h3 className=" opacity-75" style={{ color: 'rgb(214, 28, 78)' }}> Win the race to <span style={{ color: 'rgb(46, 45, 64)' }}><strong>get the best candidates</strong></span> and <span style={{ color: 'rgb(46, 45, 64)' }}><strong>hire applicants</strong></span>   faster.</h3>
          </div>

          <div className="feature col-md-3 py-3 text-start">
            <NavLink to="/signup">
              <Button className="btn btn-outline-warning  btn-rounded fw-bold" style={{ borderRadius: "40px", color: 'rgb(41, 52, 98)', border: "solid", backgroundColor: 'rgb(255, 225, 148)' }} >Create an Account</Button>
            </NavLink>
          </div>

          <div className="album mt-5 pb-2 px-4">
            <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-3 g-4">
              <div className="col my-4" >
                <Card className="pagecard mx-2 border-0 " style={{ backgroundColor: 'rgb(245, 245, 245,0)' }} >
                  <Card.Body>
                    <Card.Title>
                      <Image src="/job-somely-icon6.png" style={{ height: "65px" }} />
                      <h4 style={{ color: 'rgb(46, 45, 64)' }}>Discover Employers</h4>
                    </Card.Title>

                    <Card.Text style={{ color: 'rgb(214, 28, 78)' }}>
                      Jobsomely brings you the latest insights into top companies to work for. Find out your future companies and apply for your next role.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col my-4" >
                <Card className="pagecard mx-2 border-0" style={{ backgroundColor: 'rgb(245, 245, 245,0)' }} >
                  <Card.Body>
                    <Card.Title>
                      <Image src="/job-somely-icon4.png" style={{ height: "65px" }} />
                      <h4 style={{ color: 'rgb(46, 45, 64)' }}>Job postings always up to date</h4>
                    </Card.Title>
                    <Card.Text style={{ color: 'rgb(214, 28, 78)' }}>
                      Job postings are always up to date and can be centrally created, edited, published and closed with softgarden. Your job postings are automatically published on your careers page.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col my-4" >
                <Card className="pagecard mx-2 border-0" style={{ backgroundColor: 'rgb(245, 245, 245,0)' }} >
                  <Card.Body>
                    <Card.Title>
                      <Image src="/job-somely-icon5.png" style={{ height: "65px" }} />
                      <h4 style={{ color: 'rgb(46, 45, 64)' }}>Search function</h4>
                    </Card.Title>
                    <Card.Text style={{ color: 'rgb(214, 28, 78)' }}>
                      A detailed search feature allows you to find suitable candidates. You filter your search using criteria such as job title, city and surrounding area, work experience and much more.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
            <div className="col" >
              <Image src="/job-somely-about1.jpg" className="background-cover img-fluid fluid mx-auto d-block" style={{ height: "400px" }} alt="homepage about1" />
            </div>
            <div className="col" >
              <h1 className='fw-bold mt-5 pt-5' style={{ color: 'rgb(46, 45, 64)' }}>Attract the best candidates for your team​</h1><br />
              <h3 style={{ color: 'rgb(214, 28, 78)' }} >Impress <span style={{ color: 'rgb(46, 45, 64)' }}><strong>applicants</strong></span> with fast and efficient recruiting processes.From application through to <span style={{ color: 'rgb(46, 45, 64)' }}><strong>hiring.</strong></span> </h3>
            </div>
          </div>
          <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
            <div className="col" >
              <h1 className='fw-bold mt-5 pt-5' style={{ color: 'rgb(46, 45, 64)' }}>Post & Pray with Multiposting</h1><br />
              <h3 style={{ color: 'rgb(214, 28, 78)' }} ><span style={{ color: 'rgb(46, 45, 64)' }}><strong> Post jobs</strong></span> in record time and publish them intelligently where they will be found by the right <span style={{ color: 'rgb(46, 45, 64)' }}><strong> candidates.</strong></span></h3>
            </div>
            <div className="col" >
              <Image src="/job-somely-about2.jpg" className="background-cover img-fluid fluid mx-auto d-block" style={{ height: "400px" }} alt="homepage about2" />
            </div>
          </div>
          <div className="row row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4">
            <div className="col" >
              <Image src="/job-somely-about3.jpg" className="background-cover img-fluid fluid mx-auto d-block" style={{ height: "400px" }} alt="homepage about1" />
            </div>
            <div className="col" >
              <h1 className='fw-bold mt-5 pt-5' style={{ color: 'rgb(46, 45, 64)' }}>Shorter onboarding and faster productivity</h1><br />
              <h3 style={{ color: 'rgb(214, 28, 78)' }} >Our <span style={{ color: 'rgb(46, 45, 64)' }}><strong>Employees</strong></span> hired through referrals start <span style={{ color: 'rgb(46, 45, 64)' }}><strong>their jobs</strong></span>   more quickly, settle in faster and are productive <span style={{ color: 'rgb(46, 45, 64)' }}><strong>in a shorter time.</strong></span></h3>
            </div>
          </div>
        </div>
      </div>
      {/* <Image src="/footer1.png" className="background-cover img-fluid fluid mx-auto d-block" alt="homepage footer" /> */}
    </div >
  );
}


export default HomePage; 