import React from 'react'
import TheatreList from './TheatreList'
import {Tabs} from 'antd'

function Partner() {
  const tabItems=[{key:'1',label:'My Theatres',children:<TheatreList />}]

  return (
    <div>
      <Tabs items={tabItems} />
    </div>
  )
}

export default Partner