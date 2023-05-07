import React, { useState, useEffect } from 'react';

function Summary() {
  const id = window.location.pathname.split("/")[2];
  console.log(id);
  const [shows, setShows] = useState([]);
  const [showform, setShowform] = useState(false);
  const [formdata, setFormdata] = useState({
    name:"",
    phone:"",
    tickets:""
  });
  const handleChange = (e) =>{
    setFormdata({...formdata,[e.target.name]:e.target.value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formdata', JSON.stringify(formdata));
    setShowform(false);
    alert("Ticket Booked Successfully");
  }
  async function getShows() {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await response.json();
    console.log(data);
    setShows(data);
  }
  useEffect(() => {
    getShows();
    if (localStorage.getItem('formdata')) {
      const data = JSON.parse(localStorage.getItem('formdata'));
      console.log(data);
      setFormdata(data);
    }
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center my-3">
        <div className="col-sm-12 col-md-5">
          <div className="card my-3 mx-auto" style={{ maxWidth: '18rem' }}>
            <img src={shows.image ? shows.image.medium : "https://via.placeholder.com/210x295?text=No+Image"} className="card-img-top" alt="..." />
            <div className="card-body text-center">
              <h2 className="card-title">{shows.name}</h2>
              <p className="card-text">Language: {shows.language}</p>
              <p className="card-text">Schedule: {shows.schedule ? shows.schedule.days : "No days"} {shows.schedule ? shows.schedule.time : "No time"}</p>
              <p className="card-text">{shows.summary}</p>
              <button onClick={()=>setShowform(!showform)} className="btn btn-primary">Book Ticket</button>
            </div>
          </div>
        </div>
        {showform &&
          <div className="col-sm-12 col-md-7">
            <div className="card my-3 mx-auto" style={{ maxWidth: '36rem' }}>
              <div className="card-body">
                <h2 className="card-title">Book Ticket</h2>
                <hr />
                <h4 className="card-title">Show Name</h4>
                <input className='form-control mb-3' type='text' name="showname" value={shows.name} readOnly />
                <hr />
                <h4 className="card-title">Show Time</h4>
                <input className='form-control mb-3' type='text' name="showtime" value={shows.schedule ? shows.schedule.days : "No days"} readOnly />
                <hr />
                <h4 className="card-title">Show Language</h4>
                <input  className='form-control mb-3' type='text' name="showlanguage" value={shows.language} readOnly />
                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
                  </div>
                  <div className
                  ="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tickets">Tickets</label>
                    <input type="number" className="form-control" id="tickets" name="tickets" onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary my-2">Submit</button>
                </form>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
export default Summary;
