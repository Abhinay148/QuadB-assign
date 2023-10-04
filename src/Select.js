import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Select() {
  const [selectedLang, setSelectedLang] = useState('');
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchJobListings = async () => {
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=a1bf7c16&app_key=e8f3b944800322b67cc34736f9730164&results_per_page=20&what=${selectedLang}&content-type=application/json`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const jobListings = data.results;
      setJobsData(jobListings);
    } catch (error) {
      console.error("Error fetching job listings:", error);
    }
  };

  useEffect(() => {
    if (selectedLang) {
      setLoading(true);
      fetchJobListings()
        .finally(() => setLoading(false));
    } else {
      setJobsData([]);
    }
  }, [selectedLang]);

  const handleChange = (e) => {
    setSelectedLang(e.target.value);
   
  };



  const handleButton = () => {
    if (selectedLang) {
      setLoading(true);
      fetchJobListings()
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="select-container">
      <h2>Select a Programming Language</h2>
      <div className="select-form">
        <label htmlFor="language">Select</label>
        <select id="language" onChange={handleChange} value={selectedLang}>
          <option value="">Select</option>
          <option value="C">C</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
        </select>
        <button className="select-button" onClick={handleButton} disabled={loading}>
          {loading ? 'Loading...' : 'Confirm'}
        </button>
      </div>

      {jobsData.length > 0 && (
        <div className="job-list">
          <h3>Jobs for {selectedLang}:</h3>
          <ul>
            {jobsData.map((job) => (
              <li key={job.id}>
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </a>
                <Link onClick={()=>{localStorage.setItem("data",JSON.stringify(job))}} to={`/job/${job.id}`}>View Description</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      
    </div>
  );
}

export default Select;