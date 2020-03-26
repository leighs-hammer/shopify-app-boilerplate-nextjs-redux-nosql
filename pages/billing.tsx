import React from 'react'
import Stage from '../components/Stage'
// import { Card, Layout, Banner, FooterHelp, Link } from '@shopify/polaris'
// import billingOptions from '../_config/billingOptions'
// import BillingCards from '../components/billing/BillingCards'
// import { useSelector } from 'react-redux';
// import useBilling from '../hooks/useBilling'
import BillingSelector from '../components/billing/BillingSelector';

const Billing = () => {

  return (
    <Stage>
      <BillingSelector />
    </Stage>
  )
}

export default Billing