"use client";
import React, { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MultiSelect from "../../multi-select";

const Formula = ({ formula, index, onNameChange }) => {

    const [toggled, setToggled] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState("0");

    const Error = () => <>
    <div>
    <svg viewBox="0 0 32 32" className="mr-2 h-6 w-6 fill-current text-red-600">
      <path
        fillRule="evenodd"
        d="M4 16C4 9.373 9.373 4 16 4s12 5.373 12 12-5.373 12-12 12S4 22.627 4 16zm2 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10S6 21.523 6 16zm11-6v8h-2v-8h2zm0 10v2h-2v-2h2z"
      ></path>
    </svg>
  </div>
  <div className="text">#ERROR</div>
  </>

  const Normal = () => <>
      <div className="text">{value}</div>
  </>
  

  return (
    <div className="formula">
        <div className="top">
            <div className="left">
            <button onClick={e => setToggled(!toggled)} className={toggled ? "toggled": ""}>
                <svg viewBox="0 0 16 16">
                <path d="M13 6l-5 5-5-5h10z"></path>
                </svg>
            </button>
            <input
                placeholder="Set Formula Name"
                onChange={(e) => onNameChange(e, index)}
                value={formula.name}
            />
            </div>
            <div className="right">
                <button>
                <svg viewBox="0 0 16 16" className="icon-16">
                    <path
                    fillRule="evenodd"
                    d="M8 0a8 8 0 100 16A8 8 0 008 0zm1.909 3.858c-.137.516-.442 1.062-1.462 1.062-.746 0-1.097-.295-1.097-.767 0-.177.046-.414.092-.59.137-.517.441-1.063 1.462-1.063.746 0 1.096.295 1.096.767 0 .177-.046.413-.091.59zM8.494 13l.303-1.495h-.813L9.128 5.99h-1.93l-1.157 5.607a1.565 1.565 0 00-.041.334C6 12.572 6.496 13 7.24 13h1.254z"
                    ></path>
                </svg>
                </button>
                <button className="icon-btn-borderless">
                <svg viewBox="0 0 16 16" className="icon-16">
                    <path
                    d="M4 8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm2 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm8 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                    ></path>
                </svg>
                </button>
            </div>
        </div>   
        <div className="bottom">
          <div className="left">
            { error ? <Error/> : <Normal/> }
          </div>
          <div className="right">
            <div className="rounded">
              <DatePicker views={['month', 'year']} />
            </div>
          </div>
        </div>
        <div className={toggled ? "inputs open": "inputs"}>

            <div className='input-container'>
                <MultiSelect/>
            </div>

            <div className="time-segment">
                <button className="add">
                    <svg viewBox="0 0 16 16" className="icon-16 mr-2"><path d="M13 9H9v4H7V9H3V7h4V3h2v4h4v2z"></path></svg>
                    <div>Add Time Segment</div>
                </button>
            </div>
        </div>
    </div>
  );
};

const Center = () => {
  const [formulaList, setFormulaList] = useState([{ id: 1, name: "" }]);

  const newFormula = () => {
    const newId = formulaList.length + 1;
    setFormulaList((prevFormulaList) => [
      ...prevFormulaList,
      { id: newId, name: "" },
    ]);
  };

  const handleNameChange = (e, index) => {
    const updatedFormulaList = [...formulaList];
    updatedFormulaList[index].name = e.target.value;
    setFormulaList(updatedFormulaList);
  };

  return (
    <div className="column center-column">
      <div className="top-section">
        <div className="formulas">
          <svg viewBox="0 0 16 16">
            <path d="M3 1h13v2H5v12l-5-2v-2.3L3 12V1z"></path>
            <path d="M7 15h2.13l2.296-3.635h.056L13.686 15H16l-3.325-5.077L15.945 5h-2.13L11.61 8.48h-.055L9.406 5H7.092l3.27 4.942L7 15z"></path>
          </svg>
          <h3 className="heading">Formulas</h3>
        </div>
        <button className="plus-button" onClick={newFormula}>
          <svg viewBox="0 0 16 16">
            <path d="M13 9H9v4H7V9H3V7h4V3h2v4h4v2z"></path>
          </svg>
        </button>
      </div>
      <div className="content">
        {formulaList.map((formula, i) => (
          <Formula key={formula.id} formula={formula} index={i} onNameChange={handleNameChange} />
        ))}
      </div>
    </div>
  );
};

export default Center;
