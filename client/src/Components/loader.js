import React from 'react'
import {Spin} from 'antd'

function Loader() {
  
  return (
    <div style={{ textAlign: 'center', marginTop: '10%'}}>
      <Spin />
      <h1>Loading...</h1>
    </div>
  )
}

export default Loader 
