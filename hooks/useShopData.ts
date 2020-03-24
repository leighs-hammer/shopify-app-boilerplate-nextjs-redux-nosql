import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

const useInstall = () => {

  const permanentDomain = useSelector(state => state.shop.domain)
  const [first, setFirst] = useState(true)

  const installOrData = () => {

  }

  return {}

}

export default useInstall