import { NextApiRequest, NextApiResponse } from 'next'

export type Thandler = (req: NextApiRequest, res: NextApiResponse) => any

export type TverificationMiddleware = (handler: Thandler) => any