import { Provider } from 'react-redux'
import { compose } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import storeFactory from '../store'
import fs from 'fs'
import path from 'path'
import App from '../components/App'

const staticCSS = fs.readFileSync(path.join(__dirname, '../../dist/assets/bundle.css'))

export const buildHTMLPage = ({html, state, url, css}) => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <title>Universal Task Manager</title>
        <style>${staticCSS}</style>
    </head>
    <body>
        <div id="react-container">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
    </body>
</html>
`

export const renderComponentsToHTML = ({url, store}) =>
    ({
        url: url,
        state: store.getState(),
        html: renderToString(
            <Provider store={store}>
                <StaticRouter location={url} context={{}}>
                    <App/>
                </StaticRouter>
            </Provider>
        )
    })

export const makeClientStoreFrom = (server) =>
    ({
        url: server.url,
        store: storeFactory(false, server.store.getState())
    })

export const htmlResponse = compose(
    buildHTMLPage,
    renderComponentsToHTML,
    makeClientStoreFrom
)