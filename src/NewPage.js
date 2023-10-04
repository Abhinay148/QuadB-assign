import React, { useState } from 'react';




export default function NewPage() {
   
    const job = JSON.parse(localStorage.getItem("data"));


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [resume, setResume] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    const handleApply = () => {
        const formData = {
            name,
            email,
            coverLetter,
            resume,
        };
        setPreviewData(formData);
    };

    const handleSubmit = () => {
        if (name && email && coverLetter) {
          alert('Application Submitted');
          setIsSubmitted(true);
        } else {
          alert('Please fill in all required fields.');
        }
      };

   

    return (
        <div>
            {(
                <div className="job-description">
                    <h3>Job Description:</h3>
                    <p>{job.description}</p>
                </div>
            )}

            {(
                <div className="apply-form">
                    <h3>Apply for {job.title}</h3>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    required />
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                    required/>
                    <label>Cover Letter:</label>
                    <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} 
                    required/>
                    <label>Resume (Upload):</label>
                    <input type="file" onChange={(e) => setResume(e.target.files[0])} />
                    <button onClick={handleApply}>Preview</button>
                </div>
            )}

            {previewData && (
                <div className="preview">
                    <h3>Preview of Your Application:</h3>
                    <p>Name: {previewData.name}</p>
                    <p>Email: {previewData.email}</p>
                    <p>Cover Letter:</p>
                    <p>{previewData.coverLetter}</p>
                    <p>Resume: {previewData.resume ? previewData.resume.name : 'Not uploaded'}</p>
                    <button onClick={handleSubmit}>Submit Application</button>
                </div>
            )}

            {isSubmitted && (
                <div className="success-message">
                    <p>Your application has been submitted successfully!</p>
                </div>
            )}
        </div>
    )
}