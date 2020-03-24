import React, { useState } from 'react'
import Stage from '../components/Stage'
import Axios from 'axios'
import qs from 'query-string'

const Dashboard = () => {

  const [shop,setShop] = useState({})

  const runInstall = async () => {

    if(typeof window !== 'undefined' && window.location) {
      const query = qs.parse(window.location.search)
      Axios.post('/api/install', {
        shop: query.shop,
        code: query.code,
      }).then(data => setShop(data))

    }

  }

  return (
    <Stage>
      Dashboard
      <div onClick={() => runInstall()}>TEST INSTALL</div>
      {JSON.stringify(shop)}
    </Stage>
  )
}

export default Dashboard