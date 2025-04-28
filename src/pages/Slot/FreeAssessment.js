// import React, { useEffect, useState } from 'react';
// import './Slotbooking.css';
// import Topheader from '../topheader/topheader';
// import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// const FreeAssessment = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [weekStartDate, setWeekStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
//   const firstname =localStorage.getItem("firstname")
//   const lastname =localStorage.getItem("lastname")
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4500/api/contractorsbyid/${id}`);
//         const tutorData = response?.data;
//         if (typeof tutorData.subject === 'string') {
//           tutorData.subject = JSON.parse(tutorData.subject);
//         }
//         setSubjects(tutorData.subject || []);
//         setSelectedSubjects(tutorData.subject?.length ? [tutorData.subject[0].name] : []);
//       } catch (error) {
//         console.error('Error fetching subjects:', error);
//       }
//     };
//     fetchSubjects();
//   }, [id]);

//   const toggleSubject = (subject) => {
//     if (selectedSubjects.includes(subject)) {
//       setSelectedSubjects([]); // Deselect if clicked again
//     } else {
//       setSelectedSubjects([subject]); // Select only one subject at a time
//     }
//   };

//   const getWeekDates = (date) => {
//     const start = startOfWeek(date, { weekStartsOn: 1 });
//     return Array.from({ length: 7 }, (_, i) => addDays(start, i));
//   };

//   const handleSlotSelect = (slotTime) => {
//     if (selectedSlot) {
//       alert("You can only select one slot for a free assessment.");
//       return;
//     }

//     const formattedDate = format(selectedDate, 'EEEE dd MMM yyyy');
//     const slot = {
//       day: formattedDate,
//       startTime: slotTime.startTime,
//       endTime: slotTime.endTime,
//       subject: selectedSubjects[0] || "General",
//     };

//     setSelectedSlot(slot);
//   };

//   const removeSlot = () => {
//     setSelectedSlot(null);
//   };

//   const BookingAssessment = () => {
//     navigate('/bookingassessment');
//   };

//   const slotTimes = [
//     { startTime: '9:00', endTime: '10:00' },
//     { startTime: '11:00', endTime: '12:00' },
//     { startTime: '12:00', endTime: '13:00' },
//     { startTime: '13:00', endTime: '14:00' },
//     { startTime: '15:30', endTime: '16:30' },
//     { startTime: '16:30', endTime: '17:30' },
//     { startTime: '18:00', endTime: '19:00' },
//     { startTime: '19:00', endTime: '20:00' },
//   ];

// console.log("selectedSlot",selectedSlot);


//   const postService = async () => {
    
//     if (!selectedSlot) {
//       toast.error("Please select a subject first.");
//       return;
//     }
//     const serviceData = {
//       name: `${firstname} ${lastname} `,
//       dft_charge_type: "hourly",
//       dft_charge_rate: "95.00",
//       dft_contractor_rate: "30.00"
//     };
  
//     try {
//       // Step 1: Create the service
//       const serviceRes = await axios.post('http://localhost:4500/api/services/', serviceData);
//       const serviceId = serviceRes.data.id;
//       console.log("✅ Service created:", serviceId);
  
//       const appointmentPayloads = selectedSlot.map((slot, index) => {
//         const date = new Date(slot.day); // 'Thursday 24 Apr 2025'
//         const startTimeParts = slot.startTime.split(':').map(Number);
//         const endTimeParts = slot.endTime.split(':').map(Number);
  
//         const start = new Date(date);
//         start.setHours(startTimeParts[0]);
//         start.setMinutes(startTimeParts[1]);
//         start.setSeconds(0);
//         start.setMilliseconds(0);
  
//         const finish = new Date(date);
//         finish.setHours(endTimeParts[0]);
//         finish.setMinutes(endTimeParts[1]);
//         finish.setSeconds(0);
//         finish.setMilliseconds(0);
  
//         return {
//           start: start.toISOString(),
//           finish: finish.toISOString(),
//           topic: slot.subject || `demo${index + 1}`,
//           status: "planned",
//           service: serviceId,
//           contractor: id
//         };
//       });
//       const res = await axios.post('http://localhost:4500/api/appointments/', appointmentPayloads);
//       console.log('✅ Appointments created:', res.data);
//       toast.success('Service and appointments created successfully!');
//       localStorage.setItem("slots",JSON.stringify(selectedSlot))
//       setTimeout(() => {
//         navigate('/bookingassessment');
//       }, 2000);
//     } catch (error) {
//       console.error('❌ Error:', error.response?.data || error.message);
//       toast.error('Failed to create service or appointments.');
//     }
//   };
  

//   return (
//     <>
//     <Toaster/>
//       <Topheader />
//       <div className="slot-booking-container container">
//         <h2>Book Free Assessment</h2>

//         <div className="row">
//           <div className="col-lg-6">
//             {subjects.length > 0 && (
//               <div className="subjects">
//                 {[...new Map(subjects.map((s) => [s.name, s])).values()].map((subject, i) => (
//                   <button
//                     key={i}
//                     className={`subject-btn ${selectedSubjects.includes(subject.name) ? 'active' : ''}`}
//                     onClick={() => toggleSubject(subject.name)}
//                   >
//                     {subject.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="col-lg-6 text-right">
//             <div className="subject-filter">
//               <button className="filter-btn" onClick={() => setFilterOpen(true)}>Filter</button>
//             </div>
//           </div>
//         </div>

//         {filterOpen && (
//           <div className="filter-modal">
//             <div className="filter-popup-white">
//               <div className="filter-header">
//                 <h4>Choose Subject</h4>
//                 <button className="done-btn" onClick={() => setFilterOpen(false)}>Done</button>
//               </div>
//               <ul className="subject-list">
//                 {subjects.map((subj, i) => (
//                   <li key={i} className="subject-item" onClick={() => toggleSubject(subj.name)}>
//                     <span>{subj.name}</span>
//                     <span className="subject-icon">
//                       {selectedSubjects.includes(subj.name) ? '✅' : '⭕'}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         <div className="calendar-week mt-4">
//           <label>Available Slots</label>
//           <div className="current-month">{format(weekStartDate, 'MMMM yyyy')}</div>
//           <div className="week-nav">
//             <button className="nav-btn" onClick={() => setWeekStartDate(prev => addDays(prev, -7))}>←</button>
//             <div className="week-days">
//               {getWeekDates(weekStartDate).map((date, idx) => (
//                 <div
//                   key={idx}
//                   className={`day-cell ${isSameDay(date, selectedDate) ? 'active' : ''}`}
//                   onClick={() => setSelectedDate(date)}
//                 >
//                   <div className="day-name">{format(date, 'EEE')}</div>
//                   <div className="day-date">{format(date, 'dd')}</div>
//                 </div>
//               ))}
//             </div>
//             <button className="nav-btn" onClick={() => setWeekStartDate(prev => addDays(prev, 7))}>→</button>
//           </div>
//         </div>

//         <div className="slots-grid">
//           {slotTimes.map((slot, i) => (
//             <button
//               key={i}
//               className="slot-btn"
//               onClick={() => handleSlotSelect(slot)}
//               disabled={!!selectedSlot}
//             >
//               {slot.startTime} - {slot.endTime}
//             </button>
//           ))}
//         </div>

//         {selectedSlot && (
//           <div className="selected-slots mt-4">
//             <h4>Selected Slot</h4>
//             <div className="slot-card col-lg-4">
//               <span>{selectedSlot.day}</span>
//               <div className="slot-time">
//                 <span className="icon">⏰</span>
//                 <span className="time-text">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
//               </div>
//               <div className="slot-subject">{selectedSlot.subject}</div>
//               <button className="slot-remove" onClick={removeSlot}>✕</button>
//             </div>
//           </div>
//         )}

//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//           <button
//             className="assessment-btn-free"
//             // data-toggle="modal"
//             // data-target="#exampleModalLong1"
//             disabled={!selectedSlot}
//             onClick={postService}
//           >
//             Book Free Assessment
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="exampleModalLong1"
//         tabIndex={-1}
//         role="dialog"
//         aria-labelledby="exampleModalLongTitle"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">×</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <span>
//                 Do you want to block the class you selected with this teacher? A payment of AED100 will be required.
//               </span>
//             </div>
//             <div className="modal-footer center-footer">
//               <button type="button" className="wanttopaybutton" onClick={BookingAssessment}>
//                 Yes, I want to Pay Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FreeAssessment;




import React, { useEffect, useState } from 'react';
import './Slotbooking.css';
import Topheader from '../topheader/topheader';
import { format, startOfWeek, addDays, isSameDay, isBefore } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const FreeAssessment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [weekStartDate, setWeekStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");
  const studentid = localStorage.getItem("studentid");


  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/contractorsbyid/${id}`);
        const tutorData = response?.data;
        if (typeof tutorData.subject === 'string') {
          tutorData.subject = JSON.parse(tutorData.subject);
        }
        setSubjects(tutorData.subject || []);
        setSelectedSubjects(tutorData.subject?.length ? [tutorData.subject[0].name] : []);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, [id]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`http://localhost:4500/api/appointments/?contractor=${id}`);
        setBookedAppointments(res.data.results || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [id]);

  const toggleSubject = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects([subject]);
    }
  };

  const getWeekDates = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const handleSlotSelect = (slotTime) => {
    if (selectedSlot) {
      toast.error("You can only select one slot for a free assessment.");
      return;
    }

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const subject = selectedSubjects[0] || "General";

    // Check for past dates
    if (isBefore(selectedDate, new Date().setHours(0, 0, 0, 0))) {
      toast.error("Cannot select a past date.");
      return;
    }

    // Check for already booked slot
    const isBooked = bookedAppointments.some((appt) => {
      const apptDate = format(new Date(appt.start), 'yyyy-MM-dd');
      const apptStart = format(new Date(appt.start), 'HH:mm');
      const apptEnd = format(new Date(appt.finish), 'HH:mm');
      return apptDate === formattedDate &&
        apptStart === slotTime.startTime &&
        apptEnd === slotTime.endTime &&
        appt.topic === subject;
    });

    if (isBooked) {
      toast.error("Slot already booked for this subject.");
      return;
    }

    setSelectedSlot({
      day: format(selectedDate, 'EEEE dd MMM yyyy'),
      startTime: slotTime.startTime,
      endTime: slotTime.endTime,
      subject: subject,
    });
  };

  const removeSlot = () => {
    setSelectedSlot(null);
  };

  const slotTimes = [
    { startTime: '9:00', endTime: '10:00' },
    { startTime: '11:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '13:00' },
    { startTime: '13:00', endTime: '14:00' },
    { startTime: '15:30', endTime: '16:30' },
    { startTime: '16:30', endTime: '17:30' },
    { startTime: '18:00', endTime: '19:00' },
    { startTime: '19:00', endTime: '20:00' },
  ];

  const postService = async () => {
    if (!selectedSlot) {
      toast.error("Please select a slot before booking.");
      return;
    }

    const serviceData = {
      name: `${firstname} ${lastname}`,
      dft_charge_type: "hourly",
      dft_charge_rate: "0",
      dft_contractor_rate: "0",
      conjobs: [{ contractor: id }],
      rcrs: [{ recipient: studentid }],
    };

    try {
      const serviceRes = await axios.post('http://localhost:4500/api/services/', serviceData);
      const serviceId = serviceRes.data.id;
      const slot = selectedSlot;
      const date = new Date(slot.day);
      const [startHour, startMin] = slot.startTime.split(':').map(Number);
      const [endHour, endMin] = slot.endTime.split(':').map(Number);

      const start = new Date(date);
      start.setHours(startHour, startMin, 0, 0);
      const finish = new Date(date);
      finish.setHours(endHour, endMin, 0, 0);

      const appointmentPayload = [{
        start: start.toISOString(),
        finish: finish.toISOString(),
        topic: slot.subject || "Free Assessment",
        status: "planned",
        service: serviceId,
        contractor: id,
      }];

      await axios.post('http://localhost:4500/api/appointments/', appointmentPayload);
      toast.success("Assessment booked successfully!");
      localStorage.setItem("slots", JSON.stringify(selectedSlot));
      setTimeout(() => {
        navigate('/bookingassessment');
      }, 1500);
    } catch (error) {
      console.error("Error booking assessment:", error);
      toast.error("Failed to book assessment. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <Topheader />
      <div className="slot-booking-container container">
        <h2>Book Free Assessment</h2>

        <div className="row">
          <div className="col-lg-6">
            {subjects.length > 0 && (
              <div className="subjects">
                {[...new Map(subjects.map(s => [s.name, s])).values()].map((subject, i) => (
                  <button
                    key={i}
                    className={`subject-btn ${selectedSubjects.includes(subject.name) ? 'active' : ''}`}
                    onClick={() => toggleSubject(subject.name)}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {filterOpen && (
          <div className="filter-modal">
            <div className="filter-popup-white">
              <div className="filter-header">
                <h4>Choose Subject</h4>
                <button className="done-btn" onClick={() => setFilterOpen(false)}>Done</button>
              </div>
              <ul className="subject-list">
                {subjects.map((subj, i) => (
                  <li key={i} onClick={() => toggleSubject(subj.name)}>
                    <span>{subj.name}</span>
                    <span className="subject-icon">{selectedSubjects.includes(subj.name) ? '✅' : '⭕'}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="calendar-week mt-4">
          <label>Available Slots</label>
          <div className="current-month">{format(weekStartDate, 'MMMM yyyy')}</div>
          <div className="week-nav">
            <button onClick={() => setWeekStartDate(prev => addDays(prev, -7))}>←</button>
            <div className="week-days">
              {getWeekDates(weekStartDate).map((date, idx) => (
                <div
                  key={idx}
                  className={`day-cell ${isSameDay(date, selectedDate) ? 'active' : ''} ${isBefore(date, new Date().setHours(0, 0, 0, 0)) ? 'disabled' : ''}`}
                  onClick={() => {
                    if (!isBefore(date, new Date().setHours(0, 0, 0, 0))) {
                      setSelectedDate(date);
                    }
                  }}
                >
                  <div className="day-name">{format(date, 'EEE')}</div>
                  <div className="day-date">{format(date, 'dd')}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setWeekStartDate(prev => addDays(prev, 7))}>→</button>
          </div>
        </div>

        <div className="slots-grid">
          {slotTimes.map((slot, i) => (
            <button
              key={i}
              className="slot-btn"
              onClick={() => handleSlotSelect(slot)}
              disabled={!!selectedSlot}
            >
              {slot.startTime} - {slot.endTime}
            </button>
          ))}
        </div>

        {selectedSlot && (
          <div className="selected-slots mt-4">
            <h4>Selected Slot</h4>
            <div className="slot-card col-lg-4">
              <span>{selectedSlot.day}</span>
              <div className="slot-time">
                ⏰ {selectedSlot.startTime} - {selectedSlot.endTime}
              </div>
              <div className="slot-subject">{selectedSlot.subject}</div>
              <button className="slot-remove" onClick={removeSlot}>✕</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button
            className="assessment-btn-free"
            onClick={postService}
            disabled={!selectedSlot}
          >
            Book Free Assessment
          </button>
        </div>
      </div>
    </>
  );
};

export default FreeAssessment;

