import { NextApiRequest, NextApiResponse } from 'next'

export type Thandler = (req: NextApiRequest, res: NextApiResponse) => any

export type TverifiedConnection = (handler: Thandler) => any