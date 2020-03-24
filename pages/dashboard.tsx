import React, { useState } from 'react'
import Stage from '../components/Stage'
import Axios from 'axios'
import qs from 'query-string'
import { Card } from '@shopify/polaris'

const Dashboard = () => {
  return (
    <Stage>
      <Card sectioned 
        title="Dashboard"
      >
        <p>Place holder for the dashboard content!</p>
      </Card>
    </Stage>
  )
}

export default Dashboard