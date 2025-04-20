import React, { useEffect, useState } from 'react';
import './Featured.css';
import tutor1 from '../../assets/image/tutor1.png';
import tutor2 from '../../assets/image/tutor2.png';
import tutor3 from '../../assets/image/tutor3.png';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const featuredTutors = [
  { image: tutor1, name: 'Alessandra', subject: 'English', desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 },
  { image: tutor2, name: 'Rama', subject: 'English', desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 },
  { image: tutor3, name: 'Darryl', subject: 'English', desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 },
  { image: tutor1, name: 'Alessandra', subject: 'English', desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 },
  { image: tutor2, name: 'Rama', subject: 'English', desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 },
  { image: tutor3, name: 'Darryl', subject: 'English', desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 },
  { image: tutor1, name: 'Alessandra', subject: 'English', desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 },
  { image: tutor2, name: 'Rama', subject: 'English', desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 },
  { image: tutor3, name: 'Darryl', subject: 'English', desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 }
];

const Featured = () => {


  useEffect(() => {
    const API_KEY = 'GhEB543PykIcKTtdHh_Ah4qqDE_KN597QEOHGPahsyU=';
    const url = 'https://secure.tutorcruncher.com/api/contractors';

    axios.get(url, {
      headers: {
        "Accept": "application/json",
        'Authorization' : `Bearer ${API_KEY}`   
        }
    })
    .then((response) => {
      console.log(response);
    })
     
      .catch(err => {
        console.error('Error fetching contractors:', err);
        // setError(err.message);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 6;

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = featuredTutors.slice(indexOfFirstTutor, indexOfLastTutor);

  const totalPages = Math.ceil(featuredTutors.length / tutorsPerPage);

  return (
    <div className="container mt-4">
      <h4 className="mb-4 font-weight-bold">Featured</h4>
      <div className="row">
        {currentTutors.map((tutor, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card tutor-card p-2 h-100">
              <div className="row no-gutters align-items-center">
                <div className="col-3 text-center">
                  <img src={tutor.image} alt={tutor.name} className="img-fluid rounded tutor-img" />
                </div>
                <div className="col-6">
                  <h6 className="font-weight-bold mb-1">{tutor.name}</h6>
                  <p className="mb-1 text-muted">{tutor.subject}</p>
                  <p className="mb-0 tutor-desc">{tutor.desc}</p>
                </div>
                <div className="col-3 text-right mb-5">
                  <div className="d-flex align-items-center justify-content-end">
                    <FaStar className="text-warning mr-1" />
                    <span className="font-weight-bold">{tutor.rating}</span>
                  </div>
                  <p className="mb-0 small text-muted">
                    <span className="font-weight-bold">{tutor.reviews}</span> review
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-sm btn-secondary mx-1"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-sm btn-secondary mx-1"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Featured;
