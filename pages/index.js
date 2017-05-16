import Head from 'next/head'
import Application from '../components/application'

export default () => (
    <div id="app" className="flex flex-column">
        <Head>
            <meta charset="utf-8" />
            <link rel="shortcut icon" href="/static/favicon.ico" />
            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <meta name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
            <title>React Feathers Chat</title>
            <link rel="shortcut icon" href="favicon.ico" />
            <link rel="stylesheet" href="/static/base.css" />
            <link rel="stylesheet" href="/static/chat.css" />
            <title>React App</title>
        </Head>
        <Application />
    </div>
)