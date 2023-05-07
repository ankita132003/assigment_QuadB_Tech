import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
function Home() {
  const [shows, setShows] = useState([]);

  let navigate = useNavigate(); 

  const handleClick = (id) =>{
    navigate(`/summary/${id}`);
    console.log("clicked");
  };
  async function getShows() {
    const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
    const data = await response.json();
    setShows(data);
  }
  useEffect(() => {
    getShows();    
  }, []);

  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {shows.map((show) => (
          <div className="col" key={show.show.id}>
            <div className="card h-100">
              <img
                src={
                  show.show.image
                    ? show.show.image.medium
                    : "https://via.placeholder.com/210x295?text=No+Image"
                }
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{show.show.name}</h5>
                <p className="card-text">
                  Language: {show.show.language}
                  <br />
                  {show.show.schedule.time}{" "}
                  <strong>{show.show.schedule.days}</strong>
                </p>
                <button
                  onClick={() => handleClick(show.show.id)}
                  className="btn btn-primary"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
