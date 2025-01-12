import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setDateRange } from '../Store/cryptoSlice';

const DateSelector = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRangeLocal] = useState([null, null]); 
  const [startDate, endDate] = dateRange;

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRangeLocal(dates); 
    dispatch(setDateRange({ startDate: start, endDate: end })); // Dispatch to Redux
  };

  return (
    <div className="flex flex-col">
      <label className="font-medium mb-4 text-lg">Select Date Range</label>
      <div className="border border-gray-300 rounded p-4 shadow">
        <DatePicker
          inline
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  );
};

export default DateSelector;