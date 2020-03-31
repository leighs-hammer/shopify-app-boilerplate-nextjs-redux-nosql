# Shopify App Boilerplate
![Units](https://github.com/leighs-hammer/shopify-app-boilerplate-nextjs-redux-nosql/workflows/Units/badge.svg)

uses Nexjs + typescript and designed to be deployed to now.sh, tied in with redux. 
For database mongodb atlas is used as an example, but you could pipe in any DB you choose. 
The pattern is a hooks first approach to data provisions, surfaced at the page levels serving as HOCs. 
Redux is used for persisting state accross & SSR navigation reloads and the usual nested components, it does have its draw backs but at present is the best choice for this handling.  

-- More info: & detailed breakdows --

https://github.com/leighs-hammer/shopify-app-boilerplate-nextjs-redux-nosql/wiki


## PreSetup 
1. clone
2. `npm run install` or yarn of you prefer

## Create mongodb atlas db
1. create a cluster / signup ( https://www.mongodb.com/cloud/atlas )
2. create a cluster in a region and on a provider that makes sense to you
2.1 create a user with roles to access the DB
3. whitelist open access (0.0.0.0/0)
4. get your connection string, replace password with the user you created
5. keep a record of this it will be used in your .env and now secrets

## Setup
1. create an app in your partners.shopify.com dashboard (optionally create a production app as well)
2. copy the `.env.sample` and create a local `.env` add your development app details and ngrok
2.1 revise the `/_config/config.ts` specifying the database / root you would like. 
3. open two terminals & start up ngrok `npm run ngrok` in one
4. copy the https://XXX.ngrok address and load it into the shopify dashboard
5. whitelist the {NGROK}/dashboard route
6. in the other temrinal run `npm run dev`
7. test the app on a dev store, you should see a loading screen and then an empty dashboard. 

## Multiple environments & deployment via now.sh
I run development and production apps along side each other, this means locally my environment variables are used for my dev app. For a production deployment, you will need environment variables added to your now.sh account. 

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
- Wiki: https://github.com/leighs-hammer/shopify-app-boilerplate-nextjs-redux-nosql/wiki
- Polaris : polaris.shopify.com
- Redux: https://redux.js.org/introduction/getting-started/
- Immer: https://github.com/immerjs/immer
- mongoDb / Atlas: https://cloud.mongodb.com/ // https://www.mongodb.com/cloud/atlas
- mongoDb Compass: https://www.mongodb.com/products/compass
