import React, { useState } from 'react'
import { Layout, Card, Heading, Badge, Stack, Button, TextStyle } from '@shopify/polaris'
import { IFBillingObject } from '../../_config/billingOptions';
import { useSelector } from 'react-redux';
import { Features } from '@shopify/app-bridge/actions';
import BillingFeatureList from './BillingFeatureList';
import colorSet from '../../_constants/colorSets';

type TBillingitems = IFBillingObject[] | []

interface IFBillingCards {
  children?: any,
  items: TBillingitems,
  changePlan: any // import needed
}


const BillingCards:React.FC<IFBillingCards> = ({items, changePlan}) => {

  const billing = useSelector(state => state.app.billing)
  const [expandedFeatures, setexpandedFeatures] = useState(false)
  
  if(!billing) { return null}

  const indexOfCurrent = items.findIndex((item: IFBillingObject) => (billing.active === 'ACTIVE' && item.tier === billing.tier) )


  return (
    <React.Fragment>
      {
        [...items].map((item: IFBillingObject, index) => {
          
          const isActive = billing.tier === item.tier && billing.active
          const isFree = item.tier === 'free' || item.cost === 0.00

          const shouldDowngrade = indexOfCurrent > index
          
          const buttonText = () => {
            
            if (isActive) {
              return 'Active Plan'
            }
            
            if (shouldDowngrade) {
              return 'Downgrade plan'
            }

            return 'Upgrade plan'
          }

          return (
            <Layout.Section oneThird key={item.tier}>
              <Card 
                sectioned 
              >
                

                <Heading>
                  <span className="headingSpacing">
                    <span className="headingMain">{item.label}</span>
                      {isActive && !isFree && <Badge status='success'>{billing.status}</Badge>}
                  </span>
                </Heading>
                
                <div className="descriptionSpacing">
                  <TextStyle>{item.description}</TextStyle>
                  {!shouldDowngrade && item.descriptionTrial && !isActive && <TextStyle variation='subdued'> {item.descriptionTrial}</TextStyle>}
                </div>

                <Stack spacing="loose" alignment="center" distribution="center">
                  <Stack.Item>
                    <Button 
                      size="slim"
                      onClick={() => setexpandedFeatures(!expandedFeatures)}
                    >
                      {expandedFeatures ? 'Contract' : 'Expand'} features
                    </Button>
                  </Stack.Item>
                </Stack>

                <BillingFeatureList features={item.features} expandedFeatures={expandedFeatures}/>

                <Stack spacing="loose" alignment="center" distribution="center">
                  <Stack.Item>
                    {!isFree && <TextStyle variation="strong">{`$${item.cost}/month`}</TextStyle>}
                  </Stack.Item>

                  {!isFree &&  <Stack.Item>
                    <Button 
                      primary 
                      disabled={isActive} 
                      onClick={() => changePlan(item.tier, shouldDowngrade)}
                    >
                      {buttonText()}
                    </Button>
                  </Stack.Item>}
                </Stack>
              
              </Card>

              <style jsx>{`
                .activeHeading {
                  color: ${colorSet.indigo.Indigo};
                  margin-left: 6px;
                  font-size: 16px;
                  font-weight: normal;
                }
                .headingSpacing {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  flex-wrap: wrap;
                }
                .headingMain {
                  flex: 1 auto;
                }
                .descriptionSpacing {
                  min-height: 32px;
                  margin-bottom: 16px;
                }
              `}</style>

            </Layout.Section>
          )
        })
      }
    </React.Fragment>
  )

}

export default BillingCards