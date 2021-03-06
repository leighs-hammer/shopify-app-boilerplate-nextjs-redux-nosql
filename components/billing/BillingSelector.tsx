import React, { useEffect } from 'react'
import { Layout, FooterHelp, Link } from '@shopify/polaris'
import BillingCards from './BillingCards'
import { useSelector, useDispatch } from 'react-redux';
import useBilling from '../../hooks/useBilling'
import billingOptions from '../../_config/billingOptions';
import BillingBannerInit from './BillingBannerInit';
import CONSTANTS from '../../_constants';

const BillingSelector = () => {

  const dispatch = useDispatch()
  const loading = useSelector(state => state.laoding)

  const billing = useSelector(state => state.app.billing)
  const { changePlan, data, fetching, mustRedirect } = useBilling()
  if (billing === 'init') { return null }



  // set fetching
  useEffect(() => {
    if (loading !== fetching) {
      dispatch({ type: CONSTANTS.LOADING, payload: fetching })
    }
  }, [fetching])

  return (
    <Layout>

      {(billing.status === 'init' || !billing.active) &&
        <Layout.Section fullWidth>
          <BillingBannerInit />
        </Layout.Section>
      }

      <BillingCards items={billingOptions} changePlan={changePlan} />

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