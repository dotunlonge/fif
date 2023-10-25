// MultiSelect.js
import React, { useState } from 'react';
import './multi-select.scss';

const MultiSelect = () => {

  const list = [
    {
      leftTop: 'Actual Adspend',
      leftBottom: 'Input your Historical Spend',
      type: 'list',
    },
    {
      leftTop: 'Salary Increase Month',
      leftBottom: 'Month number for raise calculation',
      type: 'number',
    },
  ];

  const [selected, select] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const selectOption = (option) => select([...selected, { id: option.leftTop, jsx: <span className='box'>{option.leftTop}</span> }])

  const shouldBox = (input) => list.some((option) => option.leftTop.toLowerCase() === input.toLowerCase()) && "box";
    
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        select([...selected, { id: inputValue, jsx: <span className={shouldBox(inputValue)}>{inputValue}</span> }]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '' && selected.length > 0) {
      const updatedSelected = [...selected];
      updatedSelected.pop();
      select(updatedSelected);
    }
  };

  const handleAutoSuggest = (e) => {
    setInputValue(e.target.value);
  };

  // Filter options based on inputValue
  const filteredOptions = list.filter(
    (option) =>
      option.leftTop.toLowerCase().includes(inputValue.toLowerCase()) ||
      inputValue.trim() === ''
  );

  return (
    <div className="multi-select">
      <div className="content">
        {selected.map((item) => item.jsx)}
        <div className="options">
          <input
            type="text"
            placeholder="start typing here"
            value={inputValue}
            onChange={handleAutoSuggest}
            onKeyDown={handleKeyDown}
          />
          {inputValue && (
            <ul>
              {filteredOptions.map((option) => (
                <li key={option.leftTop} onClick={() => selectOption(option)}>
                  <div className="option-item">
                    <div className='left'>
                        <div className="left-top">{option.leftTop}</div>
                        <div className="left-bottom">{option.leftBottom}</div>
                    </div>
                    <div className='right'>
                        <div className="type">{option.type}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
