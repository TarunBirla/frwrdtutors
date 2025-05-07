


import React, { useEffect, useState } from 'react';
import './Slotbooking.css';
import Topheader from '../topheader/topheader';
import { format, startOfWeek, addDays, isSameDay, isBefore } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

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

  const [currentSubject, setCurrentSubject] = useState(null);
  const [filteredContractors, setFilteredContractors] = useState([]);

  
  const [slotlocalsave, setSlotLocalSave] = useState([]);

 

 
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
    const subject = selectedSubjects[0]

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
        appt.topic === currentSubject;
    });

    if (isBooked) {
      toast.error("Slot already booked for this subject.");
      return;
    }

    setSelectedSlot({
      day: format(selectedDate, 'EEEE dd MMM yyyy'),
      startTime: slotTime.startTime,
      endTime: slotTime.endTime,
      subject: currentSubject,
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
    const slotTutorData = JSON.parse(localStorage.getItem("slot&tutor"));
    localStorage.setItem("successshowdata", JSON.stringify(slotTutorData));

    if (!Array.isArray(slotTutorData) || slotTutorData.length === 0) {
      toast.error("No slot & tutor data found.");
      return;
    }

    try {
      for (const [index, entry] of slotTutorData.entries()) {
        const { slot, tutor } = entry;

        if (
          !tutor?.id ||
          !slot?.day ||
          !slot?.startTime ||
          !slot?.endTime ||
          !slot?.subject
        ) {
          console.warn("Skipping invalid entry:", entry);
          continue;
        }

        const serviceData = {
          name: `${firstname} ${lastname}`,
          dft_charge_type: "hourly",
          dft_charge_rate: "0",
          dft_contractor_rate: "0",
          conjobs: [{ contractor: tutor.id }],
          rcrs: [{ recipient: studentid }],
        };

        // Create service
        const serviceRes = await axios.post(
          "https://apifrwrd.smplyrefer.com/api/services/",
          serviceData
        );
        const serviceId = serviceRes.data.id;
        console.log(
          `✅ [${index}] Service created for tutor ${tutor.first_name}:`,
          serviceRes.data
        );

        // Prepare appointment payload
        const date = new Date(slot.day);
        const startParts = slot.startTime.split(":").map(Number);
        const endParts = slot.endTime.split(":").map(Number);

        const start = new Date(date);
        start.setHours(startParts[0], startParts[1], 0, 0);

        const finish = new Date(date);
        finish.setHours(endParts[0], endParts[1], 0, 0);

        const appointmentPayload = [
          {
            start: start.toISOString(),
            finish: finish.toISOString(),
            topic: slot.subject,
            status: "planned",
            service: serviceId,
            contractor: tutor.id,
          },
        ];

        // Create appointment
        await axios.post(
          "https://apifrwrd.smplyrefer.com/api/appointments/",
          appointmentPayload
        );
        console.log(
          `✅ [${index}] Appointment created for tutor ${tutor.first_name}`
        );
      }
      localStorage.removeItem("slot&tutor");

      toast.success("✅ All services and appointments created successfully!");
      setTimeout(() => navigate("/bookingassessment"), 2000);
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      toast.error("Failed to create one or more services/appointments.");
    }
  };

  const [selectedTutorIds, setSelectedTutorIds] = useState([]);
    const handleSelectTutor = (tutor) => {
      // Step 1: Safely parse existing localStorage data
      let existingData = [];
  
      try {
        const data = JSON.parse(localStorage.getItem("slot&tutor"));
        if (Array.isArray(data)) {
          existingData = data;
        }
      } catch (e) {
        console.warn("Corrupted localStorage data for 'slot&tutor', resetting.");
      }
  
      // Step 2: Create new combined object
      const newEntry = {
        slot: slotlocalsave,
        tutor: tutor,
      };
  
      // Step 3: Append and save
      const updatedData = [...existingData, newEntry];
      localStorage.setItem("slot&tutor", JSON.stringify(updatedData));
  
      setSelectedTutorIds(
        (prevIds) =>
          prevIds.includes(tutor.id)
            ? prevIds.filter((tutorId) => tutorId !== tutor.id) // Deselect
            : [...prevIds, tutor.id] // Select
      );
    };
  const handleSlotClick = (slot) => {
    console.log("slot", slot);
    setSlotLocalSave(slot);
    Availbletutors(slot);
  };
   const Availbletutors = async (slot) => {
      try {
        const response = await axios.get(
          "https://apifrwrd.smplyrefer.com/api/contractorsalldata"
        );
  
        const updatedData = response.data.map((tutor) => ({
          ...tutor,
          parsedSubjects: JSON.parse(tutor.subject),
        }));
  
        if (!slot.subject) {
          console.error("No valid subject label found");
          return;
        }
  
        const filtered = updatedData.filter((tutor) =>
          tutor.parsedSubjects.some(
            (sub) =>
              sub.name.toLowerCase() ===
              decodeURIComponent(slot.subject).toLowerCase()
          )
        );
        console.log("filtered", filtered);
  
        setFilteredContractors(filtered);
      } catch (error) {
        console.error("Error fetching contractor data:", error);
      }
    };

  useEffect(() => {
      const savedSubjects = localStorage.getItem("selectedSubject");
      if (savedSubjects) {
        const parsed = JSON.parse(savedSubjects);
        setSubjects(parsed);
      }
    }, []);
    const safeTutordetails = Array.isArray(subjects) ? subjects : [];
    const totalSelected = JSON.parse(
      localStorage.getItem("totalSelected") || "{}"
    );

    console.log("selectedSlot",selectedSlot);
    
  return (
    <>
      <Toaster />
      <Topheader />
      <div className="slot-booking-container container">
        <h2>Book Free Assessment</h2>

        <div className="row">
          <div className="col-lg-6">
            {safeTutordetails.length > 0 && (
              <div className="subjects">
                {safeTutordetails.map((subject, i) => (
                  <button
                    key={i}
                    className={`subject-btn ${
                      currentSubject === subject.label ? "active" : ""
                    }`}
                    onClick={() => setCurrentSubject(subject.label)}
                  >
                    {subject.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="info-text">
          Your class limit per subject:
          {Object.entries(totalSelected).map(([subject, count]) => (
            <span key={subject}>
              {" "}
              {subject}: {count} |{" "}
            </span>
          ))}
        </p>

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
  <div
    onClick={() => handleSlotClick(selectedSlot)}
    className="slot-card col-lg-4"
    data-toggle="modal"
    data-target=".bd-example-modal-lg"
  >
    <span>{selectedSlot.day}</span>
    <div className="slot-time">
      <span className="icon">⏰</span>
      <span className="time-text">
        {selectedSlot.startTime} - {selectedSlot.endTime}
      </span>
    </div>
    <div className="slot-subject">{selectedSlot.subject}</div>
    <div className="slot-tutor">
      Tutor: {
        (() => {
          const slotTutorData = JSON.parse(localStorage.getItem("slot&tutor")) || [];
          const matchingEntry = slotTutorData.find((entry) =>
            entry.slot.startTime === selectedSlot.startTime &&
            entry.slot.endTime === selectedSlot.endTime &&
            entry.slot.subject === selectedSlot.subject
          );
          return matchingEntry
            ? `${matchingEntry.tutor.first_name} ${matchingEntry.tutor.last_name}`
            : "No tutor";
        })()
      }
    </div>
    <button className="slot-remove" onClick={removeSlot}>✕</button>
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


       <div
              class="modal fade bd-example-modal-lg"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div className="container mt-4">
                    <h4 className="mb-4 font-weight-bold">
                      Available Tutors for subject
                    </h4>
      
                    <div className="row">
                      {filteredContractors.map((tutor) => (
                        <div className="col-md-6 mb-3" key={tutor.id}>
                          <div className="tutor-card h-100">
                            <div className="d-flex align-items-start">
                              <img
                                src={tutor.photo}
                                alt={`${tutor.first_name} ${tutor.last_name}`}
                                className="tutor-img mr-3"
                              />
                              <div className="flex-grow-1">
                                <h6 className="tutor-name mb-1">
                                  {tutor.first_name} {tutor.last_name}
                                </h6>
                                <div>
                                  {tutor.parsedSubjects.map((subj, i) => (
                                    <span className="subject-badge" key={i}>
                                      {subj.name}
                                    </span>
                                  ))}
                                </div>
                                <p className="tutor-desc">
                                  {tutor.town}, {tutor.country}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="tutor-rating">
                                  <FaStar className="text-warning" />
                                  <strong>4.5</strong>
                                </div>
                                <p className="small text-muted mb-0">
                                  <strong>12</strong> reviews
                                </p>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                              <button
                                className="select-btn"
                                data-dismiss="modal"

                                onClick={() => handleSelectTutor(tutor)}
                              >
                                {selectedTutorIds.includes(tutor)
                                  ? "Deselect Tutor"
                                  : "Select Tutor"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
    </>
  );
};

export default FreeAssessment;




