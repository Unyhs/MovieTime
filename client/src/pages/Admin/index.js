import React from 'react'
import {Tabs} from 'antd'
import MovieList from './MovieList'
import TheatresTable from './TheatresTable'

function Admin() {

  const tabItems=[{key:"1",label:"Manage Movies",children:<MovieList />},
                  {key:"2",label:"Manage Theatres",children:<TheatresTable />}]
  return (
    <>
      <Tabs items={tabItems}/>
    </>
  )
}

export default Admin