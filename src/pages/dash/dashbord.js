// import React, { useEffect, useState } from 'react';
// import Topheader from '../topheader/topheader';
// import './dash.css';

// import { FaStar } from 'react-icons/fa';
// import axios from 'axios';
// const Dashbord = () => {

//   const [contractors, setContractors] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [locations, setLocations] = useState([]);

 
  
  
//   useEffect(() => {
//     const fetchContractors = async () => {
//       try {
//         const response = await axios.get('http://localhost:4500/api/contractorsalldata');
//         const updatedData = response.data.map(tutor => ({
//           ...tutor,
//           subject: JSON.parse(tutor.subject) // Parse the JSON string
//         }));     
//         setContractors(updatedData);
   
//       } catch (error) {
//         console.error('Error fetching contractor data:', error);
//       } 
//     };

//     fetchContractors();
//   }, []);

//   useEffect(() => {
//     const fetchContractors = async () => {
//       try {
//         const response = await axios.get('http://localhost:4500/api/subjectsalldata');
            
//         setSubjects(response.data);
   
//       } catch (error) {
//         console.error('Error fetching contractor data:', error);
//       } 
//     };

//     fetchContractors();
//   }, []);
//   useEffect(() => {
//     const fetchContractors = async () => {
//       try {
//         const response = await axios.get('http://localhost:4500/api/locationalldata');
         
//         setLocations(response.data);
   
//       } catch (error) {
//         console.error('Error fetching contractor data:', error);
//       } 
//     };

//     fetchContractors();
//   }, []);

//   const [currentPage, setCurrentPage] = useState(1);
//   const tutorsPerPage = 6;

//   const indexOfLastTutor = currentPage * tutorsPerPage;
//   const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
//   const currentTutors = contractors.slice(indexOfFirstTutor, indexOfLastTutor);

//   const totalPages = Math.ceil(contractors.length / tutorsPerPage);
//   return (
//     <>
//       <Topheader />
//       <div className="searchsection-wrapper">
//   <div className="searchsection container">
//     <div className="row">
//       <div className="col-lg-3">
//         <div className="form-group">
//           <label>Select Class</label>
//           <select className="form-control">
//             <option>1</option>
//             <option>2</option>
//             <option>3</option>
//             <option>4</option>
//             <option>5</option>
//           </select>
//         </div>
//       </div>

//       <div className="col-lg-3">
//         <div className="form-group">
//           <label>Select Subject</label>
//           <select className="form-control">
//           <option>Choose..</option>

//             {subjects.map((items,index)=>(
//               <option>{items.name}</option>
            
//             ))}
            
//           </select>
//         </div>
//       </div>

//       <div className="col-lg-3">
//         <div className="form-group">
//           <label>Location</label>
//           <select className="form-control">
//           <option>Choose..</option>

//           {locations.map((items,index)=>(
//               <option>{items.town}</option>
            
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="col-lg-3 d-flex justify-content-center">
//         <button className="search-btn" >Search</button>
//       </div>
//     </div>
//   </div>
// </div>



// <div className="container mt-4">
//       <h4 className="mb-4 font-weight-bold">Featured</h4>
//       <div className="row">
//         {currentTutors.map((tutor, index) => (
//           <div className="col-md-4 mb-3" key={index}>
//             <div className="card tutor-card p-2 h-100">
//               <div className="row no-gutters align-items-center">
//                 <div className="col-3 text-center">
//                 <img src={tutor.photo} alt={tutor.first_name} className="img-fluid rounded tutor-img" />
//                 </div>
//                 <div className="col-6">
//                   <h6 className="font-weight-bold mb-1">{tutor.first_name} {tutor.last_name}</h6>
//                   {/* <p className="mb-1 text-muted">{tutor.subject}</p> */}
//                   <div className="small text-muted">
//                   {tutor.subject?.map((subj, i) => (
//                     <span key={i}>{subj.name}{i < tutor.subject.length - 1 ? ', ' : ''}</span>
//                   ))}
//                 </div>
//                   <p className="mb-0 tutor-desc">{tutor.town}</p>
//                 </div>
//                 <div className="col-3 text-right mb-5">
//                   <div className="d-flex align-items-center justify-content-end">
//                     <FaStar className="text-warning mr-1" />
//                     <span className="font-weight-bold">{tutor.rating}</span>
//                   </div>
//                   <p className="mb-0 small text-muted">
//                     <span className="font-weight-bold">{tutor.reviews}</span> review
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Buttons */}
//       <div className="d-flex justify-content-center mt-3">
//         <button
//           className="btn btn-sm btn-secondary mx-1"
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             className={`btn btn-sm mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           className="btn btn-sm btn-secondary mx-1"
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Dashbord;


import React, { useEffect, useState } from 'react';
import Topheader from '../topheader/topheader';
import './dash.css';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashbord = () => {
  const [contractors, setContractors] = useState([]);
  const [filteredContractors, setFilteredContractors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/contractorsalldata');
        const updatedData = response.data.map(tutor => ({
          ...tutor,
          subject: JSON.parse(tutor.subject)
        }));
        setContractors(updatedData);
        setFilteredContractors(updatedData); // show all initially
      } catch (error) {
        console.error('Error fetching contractor data:', error);
      }
    };
    fetchContractors();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/subjectsalldata');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/locationalldata');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleSearch = () => {
    const filtered = contractors.filter(tutor => {
      const subjectMatch = selectedSubject
        ? tutor.subject?.some(s => s.name === selectedSubject)
        : true;
      const locationMatch = selectedLocation
        ? tutor.town === selectedLocation
        : true;
      return subjectMatch && locationMatch;
    });

    setFilteredContractors(filtered);
    setCurrentPage(1); // Reset to page 1 after search
  };

  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 6;
  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = filteredContractors.slice(indexOfFirstTutor, indexOfLastTutor);
  const totalPages = Math.ceil(filteredContractors.length / tutorsPerPage);

  return (
    <>
      <Topheader />
      <div className="searchsection-wrapper">
        <div className="searchsection container">
          <div className="row">
            <div className="col-lg-3">
              <div className="form-group">
                <label>Select Class</label>
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="form-group">
                <label>Select Subject</label>
                <select
                  className="form-control"
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                >
                  <option value="">Choose..</option>
                  {subjects.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="form-group">
                <label>Location</label>
                <div style={{ overflow: 'auto', height: 'auto' }}>

                <select
                  className="form-control"
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                >
                  <option value="">Choose..</option>
                  {locations.map((item, index) => (
                    <option key={index} value={item.town}>
                      {item.town}
                    </option>
                  ))}
                </select>
              </div>
              </div>
            </div>

            <div className="col-lg-3 d-flex justify-content-center">
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h4 className="mb-4 font-weight-bold">Featured</h4>
        <div className="row">
          {currentTutors.map((tutor, index) => (

            <div className="col-md-4 mb-3" key={index}>
              <div className="card tutor-card p-2 h-100">
                <div className="row no-gutters align-items-center">
                  <div className="col-3 text-center">
                    <img src={tutor.photo} alt={tutor.first_name} className="img-fluid rounded tutor-img" />
                  </div>
                  <div className="col-6">
                  {/* <Link to='/package'> */}

                    <h6 className="font-weight-bold mb-1">{tutor.first_name} {tutor.last_name}</h6>
                    {/* </Link> */}
                    <div className="small text-muted">
                      {tutor.subject?.map((subj, i) => (
                        <span key={i}>
                          {subj.name}{i < tutor.subject.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                    <p className="mb-0 tutor-desc">{tutor.town}</p>
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

export default Dashbord;
