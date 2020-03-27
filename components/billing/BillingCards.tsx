import React from 'react'
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
  
  if(!billing) { return null}

  return (
    <React.Fragment>
      {
        [...items].map((item: IFBillingObject) => {
          
          const isActive = billing.tier === item.tier && billing.active
          const isFree = item.tier === 'free' || item.cost === 0.00

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
                
                <p>{item.description}</p>


                <Stack spacing="loose" alignment="center" distribution="center">
                  <Stack.Item>
                    {!isFree && <TextStyle variation="strong">{`$${item.cost}/month`}</TextStyle>}
                  </Stack.Item>

                  {!isFree &&  <Stack.Item>
                    <Button 
                      primary 
                      disabled={isActive} 
                      onClick={() => changePlan(item.tier)}
                    >
                      {isActive ? 'Active Plan' : 'Select Plan'}
                    </Button>
                  </Stack.Item>}
                </Stack>
                Features
                <BillingFeatureList features={item.features} />
              
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
              `}</style>

            </Layout.Section>
          )
        })
      }
    </React.Fragment>
  )

}

export default BillingCards