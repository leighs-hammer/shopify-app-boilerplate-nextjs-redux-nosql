import React from 'react'
import Stage from '../components/Stage'
import { Card, Layout, Banner, FooterHelp, Link } from '@shopify/polaris'
import billingOptions from '../_config/billingOptions'
import BillingCards from '../components/billing/BillingCards'
import { useSelector } from 'react-redux';

const Billing = () => {

  const billing = useSelector(state => state.app.billing)
  const {trialStarted, trialExpires} = billing

  const expirey = trialExpires && trialStarted ? ((trialExpires - trialStarted) / 86400000): -1
  const isExpired = billing !== 'init' && expirey < 0 
  const roundedDays = Math.round(expirey)

  return (
    <Stage>
      <Layout>
        
        <Layout.Section fullWidth>

          {expirey > -1 && 
            <Banner
              title={`Your trial trial which expires in ${roundedDays} days`}
              status="info"
              onDismiss={() => {}}
            >
              <p>When you are ready you can upgrade simply by choosing an option below.</p>
            </Banner>
          }

          {isExpired && 
            <Banner
              title={`Your trial trial has expired`}
              status="critical"
              onDismiss={() => {}}
            >
              <p>You can upgrade simply by choosing an option below to keep using this app.</p>
            </Banner>
          }

        </Layout.Section>
        
        <BillingCards items={billingOptions} isExpired={isExpired}/>

        <FooterHelp>
          Learn more about{' '}
          <Link url="/help/billing">
            billing & charges
          </Link>
        </FooterHelp>
      </Layout>
    </Stage>
  )
}

export default Billing