import React from 'react'
import loading from './loading.gif';

function Spinner() {
  return (
    <div className="text-center">
        <img src={loading} alt="loading" className="my-3" style={{height:"40px"}}/>
    </div>
  )
}

export default Spinner