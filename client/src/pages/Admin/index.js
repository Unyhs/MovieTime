import React from 'react'
import {Tabs} from 'antd'
import MovieList from './MovieList'
import TheatresTable from './TheatresTable'

function Admin() {

  const tabItems=[{key:"1",label:"Movies",children:<MovieList />},
                  {key:"2",label:"Theatres",children:<TheatresTable />}]
  return (
    <>
      <h1>Hello,Admin!</h1>
      <Tabs items={tabItems}/>
    </>
  )
}

export default Admin