
export default async (req, res) => {

  // If you handle customer data, remoember to handle its deletion here. 
  
  // the boilerplate does not so responding. 
  return res.status(200).json({
    body: 'This app does not store customer data nothing to redact'
  })
}