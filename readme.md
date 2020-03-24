# Shopify App Boilerplate

using Nexjs + typescript and designed to be deployed to now.sh, tied in with redux. 
For database access mongodb atlas as an example, but you could pipe in any DB you choose. 
The pattern is a hooks first approach to data provisions, surfaced at the page levels serving as HOCs. 
Redux is used for persisting stat accroas reloads and the usual nested components, it does have its draw backs but at present is the best choice for this handling.  


## PreSetup 
1. clone
2. `npm run install` or yarn of you prefer

## Setup
1. create an app in your partners.shopify.com dashboard (optionally create a production app as well)
2. copy the `.env.sample` and create a local `.env` add you development app details and ngrok
3. open two terminals & start up ngrok `npm run ngrok` in one
4. copy the https://XXX.ngrok address and load it into the shopify dashboard
5. whitelist the {NGROK}/dashboard route
6. in the other temrinal run `npm run dev`
7. test the app on a dev store, you should see a loading screen and then an empty dashboard. 

## Multiple environments & deployment via now.sh
I run development and production apps along side each other, this means locally my environment variables are used for my dev app. For a production deployment, you will need environmaent variables added to your now.sh account. 

`now secrets add APP_URL_NAME value` note that env vars in now are global so you will have a specific name along side them to stop conflicting. you will need these specific to every deployed app. by default it will rename the uppercase to lowercase keys. for example `APP_URL_BOILERPLATE` will become `app_url_boilerplate` load these into the `./now.json` file this will now surface that secret on `process.env.APP_URL` in the app.

Locally it will use your .env


### example

```
{
  "version":2,
  "env": {
    "APP_URL": "@app_url_boilerplate",
    "SHOPIFY_API_KEY": "@shopify_api_key_boilerplate",
    "SHOPIFY_APP_SECRET": "@shopify_app_secret_boilerplate",
    "SHOPIFY_APP_SCOPES": "@shopify_app_scopes_boilerplate",

    "APP_NAME_KEY": "@app_name_key_boilerplate",
    "MONGO_DB_CONNECTION_STRING": "@mongo_db_connection_string_boilerplate"

  },
  "routes": [
    {
      "src": "/.*",
      "headers": { 
        "Content-Security-Policy": "frame-ancestors https://*.myshopify.com" 
      },
      "continue": true
    }
  ]
}
```

## Deploying

Either via commit / mege or manually using `now` || `now --prod` this will deploy to now and your app will be ready to go. 

# USAGE

The system is pretty much a nextjs app with polaris and some api function `/pages/api/xx.ts` these are always server side and can be used for secure handlings. 

## Other docs

- Polaris : polaris.shopify.com
- Redux: https://redux.js.org/introduction/getting-started/
- Immer: https://github.com/immerjs/immer
- mongoDb / Atlas: https://cloud.mongodb.com/
