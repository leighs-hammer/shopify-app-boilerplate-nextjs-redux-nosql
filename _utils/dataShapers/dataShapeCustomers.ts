import { dataShaper } from './dataShapeProducts'

const dataShapeCustomers: dataShaper = (response) => {

  if(!response || !response.data || !response.data.data || !response.data.data.customers) { return []}
  if(response.data.data.customers.edges.length === 0) { return []}

  try {
    const dataShaped = response.data.data.customers.edges.map(({node, cursor}) => {
      return Object.assign({}, {...node}, cursor ? {cursor} : null)
    })
    return dataShaped
  } catch {
    return []
  }
}

export default dataShapeCustomers