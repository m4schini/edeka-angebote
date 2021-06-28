# Getting Started with Edeka-Angebote

This project is a simple frontend for the edeka-angebote react component. 
It needs a very simple node server to pass api request because edeka has some weird `Access-Control-Allow-Origin` headers.

## Use Edeka-Angebote

Open Website `<host>/?market=<marketId>`.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the webapp in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Runs the backend server on [port 3001](http://localhost:3001).

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn serve`

Runs the build on port 5000 and the backend server on 3001
