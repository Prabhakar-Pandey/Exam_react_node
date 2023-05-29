import React, { useState } from 'react';
import './AdminForm.css';

const AdminForm = () => {
  const [startDateTime, setStartDateTime] = useState('');
  const [loadingDateTime, setLoadingDateTime] = useState('');
  const [numberInput, setNumberInput] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   const response = await axios.post('API_ENDPOINT_URL', {
    //     startDateTime,
    //     loadingDateTime,
    //     numberInput,
    //   });

    let payload = {
        "startTime": startDateTime,
        "loadingTime": loadingDateTime,
        "endTime": "2023-05-28T14:59:00",
        "eachQuestionTime": numberInput
    }

    const result = await (await fetch('http://localhost:9999/setNewEaxm', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              })).json();
    if(result.success){
        alert("Updated exam configurations")
    }else{
        alert("Error in exam updation")
    }

      console.log('Request Body:', {
        startDateTime,
        loadingDateTime,
        numberInput,
      });

      // Perform any additional actions upon successful response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-component-form">
      <div className="form-group">
        <label htmlFor="startDateTime">Start DateTime:</label>
        <input
          type="datetime-local"
          id="startDateTime"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="loadingDateTime">Loading DateTime:</label>
        <input
          type="datetime-local"
          id="loadingDateTime"
          value={loadingDateTime}
          onChange={(e) => setLoadingDateTime(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="numberInput">Number Input:</label>
        <input
          type="number"
          id="numberInput"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default AdminForm;
