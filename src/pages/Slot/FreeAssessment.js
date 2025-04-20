import React, { useState } from 'react';
import './Slotbooking.css';
import Topheader from '../topheader/topheader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { startOfWeek, addDays, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';


const FreeAssessment = () => {
    const navigate =useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const subjects = ['English', 'Physics'];
  const times = ['9:00', '11:00', '12:00', '13:00', '15:30', '16:30', '18:00', '19:00'];

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState(['English', 'Physics']);
  const [weekStartDate, setWeekStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const toggleSubject = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const getWeekDates = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday start
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };
  
  const handleSlotSelect = (time) => {
    const formattedDate = format(selectedDate, 'EEEE dd MMM yyyy');
    selectedSubjects.forEach(subject => {
      const newSlot = {
        day: formattedDate,
        time,
        subject
      };
      setSelectedSlots((prev) => [...prev, newSlot]);
    });
  };

  const removeSlot = (index) => {
    const updated = [...selectedSlots];
    updated.splice(index, 1);
    setSelectedSlots(updated);
  };

  const BookingAssessment =()=>{
    navigate('/bookingassessment')
  }

  return (
    <>
      <Topheader />
      <div className="slot-booking-container container">
        <h2>Free Assessment</h2>
        <div className ='row'>
        <div className ='col-lg-6'>
        <div className="subjects">
        {subjects.map((subj, i) => (
          <button key={i} className="subject-btn">{subj}</button>
        ))}
      </div>
        </div>
        <div className ='col-lg-6'>
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
          <li key={i} className="subject-item" onClick={() => toggleSubject(subj)}>
            <span>{subj}</span>
            <span className="subject-icon">
              {selectedSubjects.includes(subj) ? '✅' : '⭕'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}


        

        <div className="calendar-week">
  <label>Available Slots</label>

  {/* Show current month */}
  <div className="current-month">
    {format(weekStartDate, 'MMMM yyyy')}
  </div>

  <div className="week-nav">
    <button className="nav-btn" onClick={() => setWeekStartDate(prev => addDays(prev, -7))}>←</button>

    <div className="week-days">
      {getWeekDates(weekStartDate).map((date, idx) => (
        <div
          key={idx}
          className={`day-cell ${isSameDay(date, selectedDate) ? 'active' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="day-name">{format(date, 'EEE')}</div>
          <div className="day-date">{format(date, 'dd')}</div>
        </div>
      ))}
    </div>

    <button className="nav-btn" onClick={() => setWeekStartDate(prev => addDays(prev, 7))}>→</button>
  </div>
</div>




        <div className="slots-grid">
          {times.map((time, i) => (
            <button key={i} className="slot-btn" onClick={() => handleSlotSelect(time)}>
              {time}
            </button>
          ))}
        </div>

        {/* <div className="selected-slots">
          <h3>Selected Slots</h3>
          <div className="row slotselect">
  {selectedSlots.map((slot, i) => (
    <div key={i} className="slot-card col-lg-3">
      <div className="slot-time">
        <span className="icon">⏰</span>
        <span className="time-text">{slot.time}</span>
      </div>
      <div className="slot-name">{slot.name}</div>
      <div className="slot-subject">{slot.subject}</div>
      <button className="slot-remove" onClick={() => removeSlot(i)}>✕</button>
    </div>
  ))}
</div>

         
        </div> */}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button className="assessment-btn-free"  data-toggle="modal" data-target="#exampleModalLong1">Book Free Assessment</button>
        </div>
      </div>



      <div
  className="modal fade"
  id="exampleModalLong1"
  tabIndex={-1}
  role="dialog"
  aria-labelledby="exampleModalLongTitle"
  aria-hidden="true"
>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <span>Do you want to block the classes you previously selected for this teacher? If so, a payment of AED100 will be required</span>



      </div>
      <div className="modal-footer center-footer">
  <button type="button" className="wanttopaybutton" onClick={BookingAssessment}>
    Yes I want to Pay Now
  </button>
</div>

    </div>
  </div>
</div>


    </>
  );
};

export default FreeAssessment;
