// import React, { useEffect, useState } from 'react';
// import './Slotbooking.css';
// import Topheader from '../topheader/topheader';
// import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// const SlotBooking = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [currentSubject, setCurrentSubject] = useState(null);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [weekStartDate, setWeekStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

        
//         const firstname =localStorage.getItem("firstname")
//         const lastname =localStorage.getItem("lastname")

//   const totalSelected = JSON.parse(localStorage.getItem("totalSelected") || "{}");



//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4500/api/contractorsbyid/${id}`);
//         const tutorData = response?.data;
//         if (typeof tutorData.subject === 'string') {
//           tutorData.subject = JSON.parse(tutorData.subject);
//         }
//         setSubjects(tutorData.subject || []);
//         setSelectedSubjects(tutorData.subject?.map(s => s.name) || []);
//       } catch (error) {
//         console.error('Error fetching subjects:', error);
//       }
//     };
//     fetchSubjects();
//   }, [id]);

//   const toggleSubject = (subject) => {
//     setSelectedSubjects(prev =>
//       prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
//     );
//   };

//   const getWeekDates = (date) => {
//     const start = startOfWeek(date, { weekStartsOn: 1 });
//     return Array.from({ length: 7 }, (_, i) => addDays(start, i));
//   };

//   const handleSlotSelect = ({ startTime, endTime }) => {
//     if (!currentSubject) {
//       toast.error("Please select a subject first.");
//       return;
//     }

//     const formattedDate = format(selectedDate, 'EEEE dd MMM yyyy');
//     const storedCounts = totalSelected;
//     const maxAllowed = storedCounts[currentSubject] || 0;
//     const subjectSlots = selectedSlots.filter(slot => slot.subject === currentSubject);

//     if (subjectSlots.length >= maxAllowed) {
//       toast.success(`You can only select ${maxAllowed} slots for ${currentSubject}.`);
//       return;
//     }

//     const alreadySelected = selectedSlots.some(slot =>
//       slot.subject === currentSubject &&
//       slot.startTime === startTime &&
//       slot.endTime === endTime &&
//       slot.day === formattedDate
//     );

//     if (alreadySelected) return;

//     const newSlot = {
//       day: formattedDate,
//       startTime,
//       endTime,
//       subject: currentSubject,
//     };

//     setSelectedSlots(prev => [...prev, newSlot]);
//   };

//   const removeSlot = (index) => {
//     const updated = [...selectedSlots];
//     updated.splice(index, 1);
//     setSelectedSlots(updated);
//   };

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4500/api/appointments/?start_gte=&start_lte=&service=&contractor=${id}&recipient=&location=`);
//       console.log( "appointment????????taruns",response.data);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };
//     fetchLocations();
//   }, []);

//   const postService = async () => {
//     if (!currentSubject) {
//       toast.error("Please select a subject first.");
//       return;
//     }
//     const serviceData = {
//       name: `${firstname} ${lastname} `,
//       dft_charge_type: "hourly",
//       dft_charge_rate: "0",
//       dft_contractor_rate: "0",
//       conjobs: [
//         {
//           contractor: id
//         }
//       ],

//       rcrs: [
//         {
//             paying_client: 4390378 
//         }
//     ],
//     };
//     try {
//       const serviceRes = await axios.post('http://localhost:4500/api/services/', serviceData);
//       const serviceId = serviceRes.data.id;
//       console.log("✅ Service created:", serviceId);
//       const appointmentPayloads = selectedSlots.map((slot, index) => {
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
//       localStorage.setItem("slots",JSON.stringify(selectedSlots))
//       setTimeout(() => {
//         navigate('/paymentgetway');
//       }, 2000);
//     } catch (error) {
//       console.error('❌ Error:', error.response?.data || error.message);
//       toast.error('Failed to create service or appointments.');
//     }
//   };
  
  
  
//   return (
//     <>
//       <Toaster />
//       <Topheader />
//       <div className="slot-booking-container container">
//         <h2>Book Classes</h2>

//         <div className="row">
//           <div className="col-lg-6">
//             {subjects.length > 0 && (
//               <div className="subjects">
//                 {[...new Map(subjects.map((s) => [s.name, s])).values()].map((subject, i) => (
//                   <button
//                     key={i}
//                     className={`subject-btn ${currentSubject === subject.name ? 'active' : ''}`}
//                     onClick={() => setCurrentSubject(subject.name)}
//                   >
//                     {subject.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="col-lg-6">
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

//         <p className="info-text">
//           Your class limit per subject:
//           {Object.entries(totalSelected).map(([subject, count]) => (
//             <span key={subject}> {subject}: {count} | </span>
//           ))}
//         </p>

//         <div className="calendar-week">
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
//           {[
//             { startTime: '9:00', endTime: '10:00' },
//             { startTime: '11:00', endTime: '12:00' },
//             { startTime: '12:00', endTime: '13:00' },
//             { startTime: '13:00', endTime: '14:00' },
//             { startTime: '15:30', endTime: '16:30' },
//             { startTime: '16:30', endTime: '17:30' },
//             { startTime: '18:00', endTime: '19:00' },
//             { startTime: '19:00', endTime: '20:00' },
//           ].map((slot, i) => (
//             <button key={i} className="slot-btn" onClick={() => handleSlotSelect(slot)}>
//               {slot.startTime} - {slot.endTime}
//             </button>
//           ))}
//         </div>

//         <div className="selected-slots">
//           <div className="row slotselect">
//             {selectedSlots.map((slot, index) => (
//               <div key={index} className="slot-card col-lg-4">
//                 <span>{slot.day}</span>
//                 <div className="slot-time">
//                   <span className="icon">⏰</span>
//                   <span className="time-text">{slot.startTime} - {slot.endTime}</span>
//                 </div>
//                 <div className="slot-subject">{slot.subject}</div>
//                 <button className="slot-remove" onClick={() => removeSlot(index)}>✕</button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="action-buttons">
//           <button className="assessment-btn">Free Assessment</button>
//           <button className="book-btn" onClick={postService}>Book Now</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SlotBooking;



import React, { useEffect, useState } from 'react';
import './Slotbooking.css';
import Topheader from '../topheader/topheader';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const SlotBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [weekStartDate, setWeekStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");
  const studentid = localStorage.getItem("studentid");
  const totalSelected = JSON.parse(localStorage.getItem("totalSelected") || "{}");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/contractorsbyid/${id}`);
        const tutorData = response?.data;
        if (typeof tutorData.subject === 'string') {
          tutorData.subject = JSON.parse(tutorData.subject);
        }
        setSubjects(tutorData.subject || []);
        setSelectedSubjects(tutorData.subject?.map(s => s.name) || []);
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
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  const getWeekDates = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const handleSlotSelect = ({ startTime, endTime }) => {
    if (!currentSubject) {
      toast.error("Please select a subject first.");
      return;
    }

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const storedCounts = totalSelected;
    const maxAllowed = storedCounts[currentSubject] || 0;
    const subjectSlots = selectedSlots.filter(slot => slot.subject === currentSubject);

    if (subjectSlots.length >= maxAllowed) {
      toast.success(`You can only select ${maxAllowed} slots for ${currentSubject}.`);
      return;
    }

    const alreadySelected = selectedSlots.some(slot =>
      slot.subject === currentSubject &&
      slot.startTime === startTime &&
      slot.endTime === endTime &&
      slot.day === formattedDate
    );

    if (alreadySelected) return;

    const isBooked = bookedAppointments.some(appointment => {
      const start = parseISO(appointment.start);
      const finish = parseISO(appointment.finish);
      const apptDate = format(start, 'yyyy-MM-dd');
      const apptStartTime = format(start, 'H:mm');
      const apptEndTime = format(finish, 'H:mm');
      return (
        apptDate === formattedDate &&
        apptStartTime === startTime &&
        apptEndTime === endTime &&
        appointment.topic === currentSubject
      );
    });

    if (isBooked) {
      toast.error(`This slot (${startTime} - ${endTime}) on ${formattedDate} for ${currentSubject} is already booked.`);
      return;
    }

    const newSlot = {
      day: formattedDate,
      startTime,
      endTime,
      subject: currentSubject,
    };

    setSelectedSlots(prev => [...prev, newSlot]);
  };

  const removeSlot = (index) => {
    const updated = [...selectedSlots];
    updated.splice(index, 1);
    setSelectedSlots(updated);
  };

  // const postService = async () => {
  //   if (!currentSubject) {
  //     toast.error("Please select a subject first.");
  //     return;
  //   }

  //   const serviceData = {
  //     name: `${firstname} ${lastname}`,
  //     dft_charge_type: "hourly",
  //     dft_charge_rate: "0",
  //     dft_contractor_rate: "0",
  //     conjobs: [{ contractor: id }],
  //     rcrs: [{ recipient: 4395131 }],
  //   };

  //   try {





  //     const serviceRes = await axios.post('http://localhost:4500/api/services/', serviceData);
  //     const serviceId = serviceRes.data.id;

  //     const appointmentPayloads = selectedSlots.map((slot, index) => {
  //       const date = new Date(slot.day);
  //       const startTimeParts = slot.startTime.split(':').map(Number);
  //       const endTimeParts = slot.endTime.split(':').map(Number);

  //       const start = new Date(date);
  //       start.setHours(startTimeParts[0], startTimeParts[1], 0, 0);

  //       const finish = new Date(date);
  //       finish.setHours(endTimeParts[0], endTimeParts[1], 0, 0);

  //       return {
  //         start: start.toISOString(),
  //         finish: finish.toISOString(),
  //         topic: slot.subject || `demo${index + 1}`,
  //         status: "planned",
  //         service: serviceId,
  //         contractor: id
  //       };
  //     });

  //     await axios.post('http://localhost:4500/api/appointments/', appointmentPayloads);
  //     toast.success('Service and appointments created successfully!');
  //     localStorage.setItem("slots", JSON.stringify(selectedSlots));
  //     setTimeout(() => navigate('/paymentgetway'), 2000);
  //   } catch (error) {
  //     console.error('❌ Error:', error.response?.data || error.message);
  //     toast.error('Failed to create service or appointments.');
  //   }
  // };



  const postService = async () => {
    if (!currentSubject) {
      toast.error("Please select a subject first.");
      return;
    }
  
    try {
     
  
     
  
      // Step 3: Create Service
      const serviceData = {
        name: `${firstname} ${lastname}`,
        dft_charge_type: "hourly",
        dft_charge_rate: "0",
        dft_contractor_rate: "0",
        conjobs: [{ contractor: id }],
        rcrs: [{ recipient: studentid }],
      };
  
      const serviceRes = await axios.post('http://localhost:4500/api/services/', serviceData);
      const serviceId = serviceRes.data.id;
      console.log("✅ Service created:", serviceRes.data);
  
      // Step 4: Create Appointments
      const appointmentPayloads = selectedSlots.map((slot, index) => {
        const date = new Date(slot.day);
        const startTimeParts = slot.startTime.split(':').map(Number);
        const endTimeParts = slot.endTime.split(':').map(Number);
  
        const start = new Date(date);
        start.setHours(startTimeParts[0], startTimeParts[1], 0, 0);
  
        const finish = new Date(date);
        finish.setHours(endTimeParts[0], endTimeParts[1], 0, 0);
  
        return {
          start: start.toISOString(),
          finish: finish.toISOString(),
          topic: slot.subject || `demo${index + 1}`,
          status: "planned",
          service: serviceId,
          contractor: id
        };
      });
  
      await axios.post('http://localhost:4500/api/appointments/', appointmentPayloads);
      console.log("✅ Appointments created");
  
      // Final step
      toast.success('Service and appointments created successfully!');
      localStorage.setItem("slots", JSON.stringify(selectedSlots));
      setTimeout(() => navigate('/paymentgetway'), 2000);
  
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message);
      toast.error('Failed to create service or appointments.');
    }
  };
  

  return (
    <>
      <Toaster />
      <Topheader />
      <div className="slot-booking-container container">
        <h2>Book Classes</h2>

        <div className="row">
          <div className="col-lg-6">
            {subjects.length > 0 && (
              <div className="subjects">
                {[...new Map(subjects.map((s) => [s.name, s])).values()].map((subject, i) => (
                  <button
                    key={i}
                    className={`subject-btn ${currentSubject === subject.name ? 'active' : ''}`}
                    onClick={() => setCurrentSubject(subject.name)}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="col-lg-6">
            <div className="subject-filter">
              <button className="filter-btn" onClick={() => setFilterOpen(true)}>Filter</button>
            </div>
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
                  <li key={i} className="subject-item" onClick={() => toggleSubject(subj.name)}>
                    <span>{subj.name}</span>
                    <span className="subject-icon">
                      {selectedSubjects.includes(subj.name) ? '✅' : '⭕'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <p className="info-text">
          Your class limit per subject:
          {Object.entries(totalSelected).map(([subject, count]) => (
            <span key={subject}> {subject}: {count} | </span>
          ))}
        </p>

        <div className="calendar-week">
          <label>Available Slots</label>
          <div className="current-month">{format(weekStartDate, 'MMMM yyyy')}</div>
          <div className="week-nav">
            <button className="nav-btn" onClick={() => setWeekStartDate(prev => addDays(prev, -7))}>←</button>
            <div className="week-days">
              {getWeekDates(weekStartDate).map((date, idx) => {
                const isPast = date < new Date().setHours(0, 0, 0, 0);
                return (
                  <div
                    key={idx}
                    className={`day-cell ${isSameDay(date, selectedDate) ? 'active' : ''} ${isPast ? 'disabled' : ''}`}
                    onClick={() => {
                      if (!isPast) setSelectedDate(date);
                    }}
                    style={{ cursor: isPast ? 'not-allowed' : 'pointer', opacity: isPast ? 0.5 : 1 }}
                  >
                    <div className="day-name">{format(date, 'EEE')}</div>
                    <div className="day-date">{format(date, 'dd')}</div>
                  </div>
                );
              })}
            </div>
            <button className="nav-btn" onClick={() => setWeekStartDate(prev => addDays(prev, 7))}>→</button>
          </div>
        </div>

        <div className="slots-grid">
          {[{ startTime: '9:00', endTime: '10:00' }, { startTime: '11:00', endTime: '12:00' },
            { startTime: '12:00', endTime: '13:00' }, { startTime: '13:00', endTime: '14:00' },
            { startTime: '15:30', endTime: '16:30' }, { startTime: '16:30', endTime: '17:30' },
            { startTime: '18:00', endTime: '19:00' }, { startTime: '19:00', endTime: '20:00' }]
            .map((slot, i) => (
              <button key={i} className="slot-btn" onClick={() => handleSlotSelect(slot)}>
                {slot.startTime} - {slot.endTime}
              </button>
            ))}
        </div>

        <div className="selected-slots">
          <div className="row slotselect">
            {selectedSlots.map((slot, index) => (
              <div key={index} className="slot-card col-lg-4">
                <span>{slot.day}</span>
                <div className="slot-time">
                  <span className="icon">⏰</span>
                  <span className="time-text">{slot.startTime} - {slot.endTime}</span>
                </div>
                <div className="slot-subject">{slot.subject}</div>
                <button className="slot-remove" onClick={() => removeSlot(index)}>✕</button>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button className="assessment-btn">Free Assessment</button>
          <button className="book-btn" onClick={postService}>Book Now</button>
        </div>
      </div>
    </>
  );
};

export default SlotBooking;

