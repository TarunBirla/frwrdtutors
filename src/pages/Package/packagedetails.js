import React, { useState } from 'react';
import Topheader from '../topheader/topheader';
import { Link, useParams } from 'react-router-dom';
import './Package.css'; // Include custom styles

const Packagedetails = () => {
  const { type } = useParams();

  const subjects = [
    { name: 'English', total: 6 },
    { name: 'Physics', total: 6 },
  ];

  const [values, setValues] = useState({
    English: 2,
    Physics: 1,
  });

  const handleChange = (subject, value) => {
    setValues((prev) => ({ ...prev, [subject]: value }));
  };

  const packages = [
    {
      type: 'BASIC',
      classes: '6 Classes',
      features: [
        '60 min classes',
        '6 classes covering 1 Half Term',
        'No free cancellations',
      ],
      color: 'basic-card',
    },
    {
      type: 'Silver',
      classes: '6 Classes',
      features: [
        '60 min classes',
        '6 classes covering 1 Half Term',
        'No free cancellations',
      ],
      color: 'silver-card',
    },
    {
      type: 'Gold',
      classes: '12 Classes',
      features: [
        '60 min classes',
        '12 classes covering 1 Full Term',
        '1st Preference Weekends',
        'Post Lesson Reports',
        'End of Term Report',
        '2 Free reschedules',
      ],
      color: 'gold-card',
      popular: true,
    },
    {
      type: 'Platinum',
      classes: '12 Classes',
      features: [
        '60 min classes',
        '12 classes covering 1 Full Term',
        '1st Preference Weekends',
        'Post Lesson Reports',
        'End of Term Report',
        '2 Free reschedules',
      ],
      color: 'platinum-card',
      popular: true,
    },
  ];

  const selectedPackage = packages.find(
    (pkg) => pkg.type.toLowerCase() === type.toLowerCase()
  );

  if (!selectedPackage) {
    return (
      <div className="package-container">
        <h4>Package not found</h4>
      </div>
    );
  }

  return (
    <>
      <Topheader />
      <div className="package-container ">
        <div className="row">
          {/* Left: Package Card */}
          <div className="col-lg-4">
            <h4 className="mb-4 font-weight-bold">{selectedPackage.type} Package</h4>
            <div className="package-grid justify-content-center">
              <div className={`package-card ${selectedPackage.color}`}>
                <div className="package-header">
                  <h4>{selectedPackage.type.toUpperCase()}</h4>
                  <span className="class-count">{selectedPackage.classes}</span>
                </div>
                <ul className="feature-list">
                  {selectedPackage.features.map((feature, i) => (
                    <li key={i}>✔ {feature}</li>
                  ))}
                </ul>
                {selectedPackage.popular && (
                  <div className="badge">Most Popular</div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Subject Sliders */}
          <div className="col-lg-8">
            <div className="row mt-5">
              {subjects.map((subject) => (
                <div key={subject.name} className="col-lg-6 mb-4">
                  <div
                    className={`slider-card ${
                      subject.name === 'English' ? 'active-border' : ''
                    }`}
                  >
                    <div className="d-flex justify-content-between mb-2">
                      <h6>{subject.name}</h6>
                      <span>
                        <Link to='/slotbooking'>
                        {values[subject.name]}/{subject.total}
                        </Link>
                      </span>
                    </div>
                    <input
                      type="range"
                      className="form-range custom-range"
                      min="0"
                      max={subject.total}
                      value={values[subject.name]}
                      onChange={(e) =>
                        handleChange(subject.name, parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packagedetails;
