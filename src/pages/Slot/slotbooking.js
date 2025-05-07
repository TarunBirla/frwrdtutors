import React, { useEffect, useState } from "react";
import "./Slotbooking.css";
import Topheader from "../topheader/topheader";
import { format, startOfWeek, addDays, isSameDay, parseISO } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const SlotBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [weekStartDate, setWeekStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [filteredContractors, setFilteredContractors] = useState([]);
  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");
  const studentid = localStorage.getItem("studentid");
  const totalSelected = JSON.parse(
    localStorage.getItem("totalSelected") || "{}"
  );
  const [slotlocalsave, setSlotLocalSave] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `https://apifrwrd.smplyrefer.com/api/contractorsbyid/${id}`
        );
        const tutorData = response?.data;
        if (typeof tutorData.subject === "string") {
          tutorData.subject = JSON.parse(tutorData.subject);
        }
        setSubjects(tutorData.subject || []);
        setSelectedSubjects(tutorData.subject?.map((s) => s.name) || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, [id]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `https://apifrwrd.smplyrefer.com/api/appointments/?contractor=${id}`
        );
        setBookedAppointments(res.data.results || []);
        console.log(res, "responsedata");
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [id]);

  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
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

    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const storedCounts = totalSelected;
    const maxAllowed = storedCounts[currentSubject] || 0;
    const subjectSlots = selectedSlots.filter(
      (slot) => slot.subject === currentSubject
    );

    if (subjectSlots.length >= maxAllowed) {
      toast.success(
        `You can only select ${maxAllowed} slots for ${currentSubject}.`
      );
      return;
    }

    const alreadySelected = selectedSlots.some(
      (slot) =>
        slot.subject === currentSubject &&
        slot.startTime === startTime &&
        slot.endTime === endTime &&
        slot.day === formattedDate
    );

    if (alreadySelected) return;

    const newSlot = {
      day: formattedDate,
      startTime,
      endTime,
      subject: currentSubject,
    };

    setSelectedSlots((prev) => [...prev, newSlot]);
  };

  const removeSlot = (index) => {
    const updated = [...selectedSlots];
    updated.splice(index, 1);
    setSelectedSlots(updated);
  };

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
      setTimeout(() => navigate("/paymentgetway"), 2000);
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      toast.error("Failed to create one or more services/appointments.");
    }
  };

  useEffect(() => {
    const savedSubjects = localStorage.getItem("selectedSubject");
    if (savedSubjects) {
      const parsed = JSON.parse(savedSubjects);
      setSubjects(parsed);
    }
  }, []);

  const handleSlotClick = (slot) => {
    console.log("slot", slot);
    setSlotLocalSave(slot);
    Availbletutors(slot);
  };

  const safeTutordetails = Array.isArray(subjects) ? subjects : [];

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

  console.log("totalSelected", totalSelected);
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
  console.log("selectedTutorIds", selectedTutorIds);

  return (
    <>
      <Toaster />
      <Topheader />
      <div className="slot-booking-container container">
        <h2>Book Classes</h2>

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

        <div className="calendar-week">
          <label>Available Slots</label>
          <div className="current-month">
            {format(weekStartDate, "MMMM yyyy")}
          </div>
          <div className="week-nav">
            <button
              className="nav-btn"
              onClick={() => setWeekStartDate((prev) => addDays(prev, -7))}
            >
              ←
            </button>
            <div className="week-days">
              {getWeekDates(weekStartDate).map((date, idx) => {
                const isPast = date < new Date().setHours(0, 0, 0, 0);
                return (
                  <div
                    key={idx}
                    className={`day-cell ${
                      isSameDay(date, selectedDate) ? "active" : ""
                    } ${isPast ? "disabled" : ""}`}
                    onClick={() => {
                      if (!isPast) setSelectedDate(date);
                    }}
                    style={{
                      cursor: isPast ? "not-allowed" : "pointer",
                      opacity: isPast ? 0.5 : 1,
                    }}
                  >
                    <div className="day-name">{format(date, "EEE")}</div>
                    <div className="day-date">{format(date, "dd")}</div>
                  </div>
                );
              })}
            </div>
            <button
              className="nav-btn"
              onClick={() => setWeekStartDate((prev) => addDays(prev, 7))}
            >
              →
            </button>
          </div>
        </div>

        <div className="slots-grid">
          {[
            { startTime: "9:00", endTime: "10:00" },
            { startTime: "11:00", endTime: "12:00" },
            { startTime: "12:00", endTime: "13:00" },
            { startTime: "13:00", endTime: "14:00" },
            { startTime: "15:30", endTime: "16:30" },
            { startTime: "16:30", endTime: "17:30" },
            { startTime: "18:00", endTime: "19:00" },
            { startTime: "19:00", endTime: "20:00" },
          ].map((slot, i) => {
            const formattedDate = format(selectedDate, "yyyy-MM-dd");
            return (
              <button
                key={i}
                className={`slot-btn  'booked-slot' : ''}`}
                onClick={() => handleSlotSelect(slot)}
              >
                {slot.startTime} - {slot.endTime}
              </button>
            );
          })}
        </div>

        <div className="selected-slots">
  <div className="row slotselect">
    {selectedSlots.map((slot, index) => {
      // Get tutor data from localStorage
      const slotTutorData = JSON.parse(localStorage.getItem("slot&tutor")) || [];

      // Find the matching tutor based on time and subject
      const matchingEntry = slotTutorData.find((entry) =>
        entry.slot.startTime === slot.startTime &&
        entry.slot.endTime === slot.endTime &&
        entry.slot.subject === slot.subject
      );

      const tutorName = matchingEntry ? `${matchingEntry.tutor.first_name} ${matchingEntry.tutor.last_name}` : "No tutor";

      return (
        <div
          key={index}
          className="slot-card col-lg-4"
         
        >
          <span>{slot.day}</span>
          <div className="slot-time">
            <span className="icon">⏰</span>
            <span className="time-text">
              {slot.startTime} - {slot.endTime}
            </span>
          </div>
          <div className="slot-subject" onClick={() => handleSlotClick(slot)}
          data-toggle="modal"
          data-target=".bd-example-modal-lg" >{slot.subject}</div>
          <div className="slot-tutor">Tutor: {tutorName}</div>
          <button
            className="slot-remove"
            onClick={() => removeSlot(index)}
          >
            ✕
          </button>
        </div>
      );
    })}
  </div>
</div>


        {/*  */}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
           <button
            className="assessment-btn-free"
            onClick={postService}
          >
             Book Now
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
export default SlotBooking;
