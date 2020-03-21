// pages/_app.jsx
import React from 'react'
import {Provider} from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'


// Polaris
import enTranslations from '@shopify/polaris/locales/en.json'
import {AppProvider} from '@shopify/polaris'
import '@shopify/polaris/styles.css'
import CustomLink from '../components/CustomLink'
import { initializeStore } from '../_store/store'
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
        <AppProvider 
          i18n={enTranslations}
          linkComponent={CustomLink} 
        >
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    );
  }
}

export default withRedux(initializeStore)(MyApp)