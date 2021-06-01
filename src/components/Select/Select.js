import React, {useState} from 'react';
import styles from './Select.module.css';
import OutsideClick from '../../hooks/OutsideClick';



const Select = () => {

  const {isActive, setActive, ref} = OutsideClick(false);

  const handleToggle = () => {
    setActive((isActive) => !isActive);
    console.log("select clicked")
  };

  return (
      <>
        <div >
          <div className={isActive ? styles.boxup : styles.boxdown} >
            <select onClick={handleToggle} ref={ref}>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
          </div>
        </div>
      </>
  )
}

export default Select
