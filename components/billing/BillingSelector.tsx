import React from 'react'
import { Card, Layout, Banner, FooterHelp, Link } from '@shopify/polaris'
import BillingCards from './BillingCards'
import { useSelector, useDispatch } from 'react-redux';
import useBilling from '../../hooks/useBilling'
import billingOptions from '../../_config/billingOptions';
import BillingBannerInit from './BillingBannerInit';
import CONSTANTS from '../../_constants';

const BillingSelector = () => {

  const dispatch = useDispatch()

  const billing = useSelector(state => state.app.billing)
  const {changePlan, data, fetching, mustRedirect} = useBilling()
  if(billing === 'init') { return null }
  
  dispatch({type: CONSTANTS.LOADING, payload: fetching})
  
  return (
    <Layout>
      
      {billing.status === 'init' &&  
        <Layout.Section fullWidth>
          <BillingBannerInit />
        </Layout.Section>
      }
      
      <BillingCards items={billingOptions} changePlan={changePlan}/>

      <FooterHelp>
        Learn more about{' '}
        <Link url="/help/billing">
          billing & charges
        </Link>
      </FooterHelp>
    </Layout>
  )
}

export default BillingSelector