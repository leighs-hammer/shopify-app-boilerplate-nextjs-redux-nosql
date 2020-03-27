import React from 'react'
import { IFFeatureDetails } from '../../_config/billingOptions';
import {TickMinor} from '@shopify/polaris-icons';
import { Icon, TextStyle } from '@shopify/polaris';
import colorSet from '../../_constants/colorSets';

export interface IFBillingFeatureList {
  features?: IFFeatureDetails[]
  expandedFeatures: boolean
}
 
const BillingFeatureList: React.SFC<IFBillingFeatureList> = ({features, expandedFeatures}) => {
  if(!features) { return null }

  return (  
    <ul className="BillingFeatureList">
      
      {[...features].map((item: IFFeatureDetails, index: Number) => {
        return (
          <li key={`${item.label.split('').join('')}-${index}`} className="BillingListItem">

            <div className="iconWrapper">
              <Icon source={TickMinor} />
            </div>
            
            <div className="BillingItemDetails">
              <TextStyle variation="strong">{item.label}</TextStyle>
              {item.details && expandedFeatures && <TextStyle variation="subdued">{item.details}</TextStyle>}
            </div>

          </li>
        )
      })}

      <style jsx>{`
        .BillingFeatureList {
          padding: 0px;
          text-indent: 0px;
        }
        .BillingListItem {
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid ${colorSet.sky.Dark};
        }
        .BillingItemDetails {
          flex: 1 auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
        }
        .iconWrapper {
          padding: 8px;
        }
      `}</style>
    </ul>
  )
}
 
export default BillingFeatureList