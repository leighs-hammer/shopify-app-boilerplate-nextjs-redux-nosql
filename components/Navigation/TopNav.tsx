import React, { useState, useEffect } from 'react'
import { Tabs } from '@shopify/polaris';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

type TNavType =  string

interface IFRQuery {
    type?: string
}

interface IFcurrentPath {
  path?: string,
  href?: string,
}


// @todo add interface
const tabs = [
  {
    id: 'dashboard',
    content: 'Dashboard',
    accessibilityLabel: 'dashboard',
    url: '/dashboard'
  },
  {
    id: 'settings',
    content: 'Settings',
    accessibilityLabel: 'settings',
    url: '/settings'
  },
]


// Component
const TopNav = () => {

  const [selected, setSelected] = useState(0)

  const router = useRouter()
  const currentPath: IFcurrentPath = useSelector(state => state.app.currentPath)
 
  const query: IFRQuery = router.query
  const navType: TNavType = query.type ? query.type : ''


  // Sync the index
  useEffect(() => {

    if(currentPath && currentPath.path) {
      const indexOfTab = tabs.findIndex(item => item.url.includes(currentPath.path))

      if(indexOfTab !== -1 && selected !== indexOfTab) {
        setSelected(indexOfTab)
      }
      
      if(indexOfTab === -1 && navType) {
        const typedTab = tabs.findIndex(item => item.url.includes(navType))
        if(typedTab !== -1) {
          setSelected(typedTab)
        }
      }
    }


  }, [currentPath, currentPath])


  if(!tabs || tabs.length === 0) {
    return null
  }

  return (
    <div>
      <Tabs tabs={tabs} selected={selected}>
      </Tabs>
    </div>
  )
}

export default TopNav