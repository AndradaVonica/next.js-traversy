import Head from "next/head"
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'

export default function Layout({ title, keywords, description, children }) {
    return (
        <div>
            <Head>
                <title>{ title }</title>
                <meta name="description" content={ description } />
                <meta name="keywords" content={ keywords } />
            </Head>

            <Header />
            <div className={ styles.container }>{ children }
            </div>
            <Footer />
        </div >
    )
}


Layout.defaultProps = {
    title: 'Dj Events | Find the best partys',
    description: 'Find the latest dj and all that',
    keywords: 'music, dj, edms, events'
}