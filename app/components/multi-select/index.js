import React, { useState, useEffect } from 'react';
import './multi-select.scss';
import { useAutoCompleteData } from './api';

const MultiSelect = ({ process }) => {
  const { data } = useAutoCompleteData();
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState({});
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (data) {
      const mappedList = data.map((apiResponseObject) => ({
        leftTop: apiResponseObject.name,
        leftBottom: apiResponseObject.value,
        type: apiResponseObject.category,
      }));
      setList(mappedList);
    }
  }, [data]);

  useEffect(() => {
    const values = Object.values(selected);
    const lastItem = values[values.length - 1];
    if (typeof lastItem?.value === 'string' && (/\d$/.test(lastItem.value) || lastItem.value.endsWith(')'))) {
      process(selected);
    }
  }, [selected]);
  
  const setWithKey = (uniqueKey, value) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [uniqueKey]: {
        ...prevSelected[uniqueKey],
        value,
      },
    }));
  };

  const selectOption = (option) => {
    const uniqueKey = (Object.keys(selected).length + 1);
    setSelected((prevSelected) => ({
      ...prevSelected,
      [uniqueKey]: {
        id: option.leftTop,
        value: 0,
        jsx: (
          <span key={uniqueKey} className='box'>
            {option.leftTop} |{' '}
            <input
              className="tiny-input"
              placeholder="[x]"
              type='number'
              onChange={(e) => setWithKey(uniqueKey, e.target.value)}
            />
          </span>
        ),
      },
    }));
  };

  const shouldBox = (input) =>
    list.some(
      (option) => option.leftTop.toLowerCase() === input.toLowerCase()
    )
      ? 'box'
      : undefined;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        const boxClass = shouldBox(inputValue);
        const uniqueKey = (Object.keys(selected).length + 1);
        setSelected((prevSelected) => ({
          ...prevSelected,
          [uniqueKey]: {
            uniqueKey,
            id: inputValue,
            value: inputValue,
            jsx: (
              <span key={uniqueKey} className={boxClass}>
                {inputValue}
                {boxClass && (
                  <>
                    |{' '}
                    <input
                      className="tiny-input"
                      placeholder="[x]"
                      type='number'
                      onChange={(e) => setWithKey(uniqueKey, e.target.value)}
                    />
                  </>
                )}
              </span>
            ),
          },
        }));
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '') {
      // Handle Backspace key to remove the last item
      const keys = Object.keys(selected);
      if (keys.length > 0) {
        const lastKey = keys[keys.length - 1];
        const { [lastKey]: valueToRemove, ...rest } = selected;
        setSelected(rest);
      }
    }
  };

  const handleAutoSuggest = (e) => setInputValue(e.target.value);

  const filteredOptions = list.filter(
    (option) =>
      option.leftTop.toLowerCase().includes(inputValue.toLowerCase()) ||
      inputValue.trim() === ''
  );

  return (
    <div className="multi-select">
      <div className="content">
        {Object.values(selected).map((item) => item.jsx)}
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
