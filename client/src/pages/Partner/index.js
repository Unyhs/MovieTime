import React from 'react'
import TheatreList from './TheatreList'
import {Tabs} from 'antd'

function Partner() {
  const tabItems=[{key:'1',label:'Theatres',children:<TheatreList />}]

  return (
    <div>
      <h2>Howdy,Partner! </h2>
      <Tabs items={tabItems} />
    </div>
  )
}

export default Partner