import React from 'react'
import colorSet from '../_constants/colorSets'
import {Page} from '@shopify/polaris' 

import Head from 'next/head'
import useShopDomain from '../hooks/usehShopDomain'
import useRouterSync from '../hooks/useRouterSync'

import LoadingBar from './global/LoadingBar'
import TopNav from './Navigation/TopNav'
import useInstall from '../hooks/useShopData'



const Stage = ({ children }) => {
  // Set Permanent domain if available
  const [domain] = useShopDomain()
  // Syncronizes the shopify navigation with the app current path
  const syncTheRoute = useRouterSync()

  // install or set 
  const install = useInstall()
  // 
  // If unauthorized
  // return redirect
  // 

  return (
    <React.Fragment>
      <div className="Header">
        <LoadingBar />
        <TopNav />
        <style jsx>{`
          .Header {
            position: fixed;
            top: 0px;
            background-color: ${colorSet.sky.Lighter};
            z-index: 99;
            width: 100%;
          }
        `}</style>
      </div>
      
      <main className="mainWrapper">
        <Page>
          <Head>
            <title>App Boilerplate</title>
            <link rel="icon" href="/static/favicon.ico" />
          </Head>
          {children}
        </Page>
        <style jsx>{`
          .mainWrapper {
            padding-top: 60px;
          }  
        `}</style>
      </main>

    </React.Fragment>
  )
}

export default Stage;
