import { NextApiRequest, NextApiResponse } from 'next';
import { TverifiedConnection, Thandler } from '../_types/verifiedConnections';

/**
 * verifyConnection
 * - verifies POST used as a method and
 * - verifies origin 
 * - any bespoke actions
 */

const verifiedConnection: TverifiedConnection = (handler: Thandler) => { 

  return async(req: NextApiRequest, res: NextApiResponse) => {

    if(process.env.NODE_ENV === 'production') {
      
      const secFetchSite = req.headers['sec-fetch-site']
      const host = req.headers['x-forwarded-host']
      const cleanBaseOrigin = process.env.APP_URL.replace('https://', '')
      console.log(req.headers)

      // early respond for malicious & wrong methods of requests
      if(req.method !== 'POST' || host !== cleanBaseOrigin || secFetchSite !== 'same-origin') {
        return res.status(429).json({error: true, message: 'Method not allowed or security check failed'})
      }
    }

    return handler(req, res)
  }
}


export default verifiedConnection
