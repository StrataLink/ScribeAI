import React, {useState} from 'react';
import './BottomScroll.css'


function BottomScroll({onScroll}) {
  return (
    
    <div>
      <button className="scrollbutt"
        onClick={() => onScroll("introduction")}>
        <i className="fa fa-chevron-circle-up"></i>
      </button>
      <div className='fill'></div>
    </div>


  )
}

export default BottomScroll