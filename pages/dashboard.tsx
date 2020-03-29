import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Stage from '../components/Stage'
import { Card, Banner } from '@shopify/polaris'
import { T } from '../components/TextProvider';

const Dashboard = () => {
  const router = useRouter()
  
  const {billingApproved, plan} = router.query
  
  

  return (
    <Stage>
      {billingApproved && <Banner
        title="Welcome to the family!"
        action={{content: 'Quick start'}}
        status="info"
        onDismiss={() => {}}
      >
        <p>If you would like a quick tour of the features </p>
        </Banner>
      }
      <Card sectioned 
        title="Dashboard"
      >
        {T('Test')}
        <p>Place holder for the dashboard content!</p>
      </Card>
    </Stage>
  )
}

export default Dashboard