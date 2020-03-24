import { dataShaper } from "./dataShapeProducts"

const dataShapeOrders: dataShaper = (response) => {

  if(!response || !response.data || !response.data.data || !response.data.data.orders) { return []}
  if(response.data.data.orders.edges.length === 0) { return []}

  try {
    const dataShaped = response.data.data.orders.edges.map(({node, cursor}) => {
      return Object.assign({}, {...node}, cursor ? {cursor} : null)
    })
    return dataShaped
  } catch {
    return []
  }
}

export default dataShapeOrders