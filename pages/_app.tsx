// pages/_app.jsx
import React from 'react'
import {Provider} from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import qs from 'query-string'
import { initializeStore } from '../_store/store'

import AppBridgeProvider from '../components/AppBridgeProvider'
import '@shopify/polaris/styles.css'
import PolarisProvider from '../components/PolarisProvider'

// import InstallProvider from '../components/InstallProvider'

class MyApp extends App {


  static async getInitialProps({Component, ctx}) {
    // We can dispatch from here too
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};
  }

  // Keep shopify in sync
  
  render() {

    // @ts-ignore
    const {Component, pageProps, store} = this.props

    return (
      <Provider store={store}>
        <PolarisProvider>
          <AppBridgeProvider>
            <Component {...pageProps} />
          </AppBridgeProvider>
        </PolarisProvider>
      </Provider>
    );
  }
}

export default withRedux(initializeStore)(MyApp)