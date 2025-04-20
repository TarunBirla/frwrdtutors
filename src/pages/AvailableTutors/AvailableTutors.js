import React, { useState } from 'react';
import './AvailableTutors.css';
import { FaStar } from 'react-icons/fa';
import tutor1 from '../../assets/image/tutor1.png';
import tutor2 from '../../assets/image/tutor2.png';
import tutor3 from '../../assets/image/tutor3.png';
import Topheader from '../topheader/topheader';
import { useNavigate } from 'react-router-dom';

const featuredTutors = [
  { image: tutor1, name: 'Alessandra', subjects: ['English', 'Physics'], desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 1 },
  { image: tutor2, name: 'Rama', subjects: ['Physics'], desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 3 },
  { image: tutor3, name: 'Darryl', subjects: ['Physics', 'English'], desc: 'I will prove that learning a new language is fun', rating: 5, reviews: 2 },
];

const AvailableTutors = () => {
  const navigate =useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 6;
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = featuredTutors.slice(indexOfFirstTutor, indexOfLastTutor);
  const totalPages = Math.ceil(featuredTutors.length / tutorsPerPage);
const selectTutor = () => {
  navigate('/assessment')
}
  return (
    <>
      <Topheader />

    <div className="container mt-4">
      <h4 className="mb-4 font-weight-bold">Available Tutor</h4>
      <div className="row">
        {currentTutors.map((tutor, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className="tutor-card h-100">
              <div className="d-flex align-items-start">
                <img src={tutor.image} alt={tutor.name} className="tutor-img mr-3" />
                <div className="flex-grow-1">
                  <h6 className="tutor-name mb-1">{tutor.name}</h6>
                  <div>
                    {tutor.subjects.map((subj, i) => (
                      <span className="subject-badge" key={i}>{subj}</span>
                    ))}
                  </div>
                  <p className="tutor-desc">{tutor.desc}</p>
                </div>
                <div className="text-right">
                  <div className="tutor-rating">
                    <FaStar  className='text-warning'/>
                    <strong>{tutor.rating}</strong>
                  </div>
                  <p className="small text-muted mb-0">
                    <strong>{tutor.reviews}</strong> review{tutor.reviews > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button className="select-btn" onClick={selectTutor}>Select Tutor</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
    </>

  );
};

export default AvailableTutors;
