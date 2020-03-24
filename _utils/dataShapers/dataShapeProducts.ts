
export type dataShaper = (response: any) => any[]

const dataShapeProducts: dataShaper = (response: any) => {

  if(!response || !response.data || !response.data.data || !response.data.data.products) { return []}
  if(response.data.data.products.edges.length === 0) { return []}

  try {
    const dataShaped = response.data.data.products.edges.map(({node, cursor}) => {
      return Object.assign({}, {...node}, cursor ? {cursor} : null)
    })
    return dataShaped
  } catch {
    return []
  }
}

export default dataShapeProducts