// import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import Link from "next/link"
import Image from "next/image"
import { FaPencilAlt, FaTimes } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router"



export default function EventPage(params) {
    const router = useRouter()
    const { evt } = params
    // console.log('here is EVT thingy', evt)
    // console.log('params', params)
    // const myEvent = evt.find(eventData => eventData.attributes.slug === eventData.id)
    // const myEvent = evt.find(({ id }) => id === evt.attributes.slug)
    // console.log("aici vine", myEvent);
    console.log('rrrr', evt.attributes.image);

    const deleteEvent = async (e) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${ API_URL }/api/events?populate=*/${ evt.id }`, {
                method: 'DELETE'
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
            } else {
                router.push('/events')
            }
        }
    }
    return (
        <Layout>
            <div className={ styles.event } >
                <div className={ styles.controls }>
                    <Link href={ `/events/edit/${ evt.id }` } legacyBehavior>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </ Link>
                    <a href="#" className={ styles.delete } onClick={ deleteEvent }>
                        <FaTimes /> Delete Event
                    </a>
                </div>
                <span>
                    { new Date(evt.attributes.date).toLocaleString('en-US') } at { evt.attributes.time }
                </span>
                <h1>{ evt.attributes.name }</h1>
                <ToastContainer />
                { evt.attributes.image && (
                    <div className={ styles.image }>
                        <Image
                            loader={ () => evt.attributes.image?.data?.attributes?.formats.medium.url || '/images/event-default.png' }
                            src={ evt.attributes?.image?.data?.attributes?.formats?.medium?.url || '/images/event-default.png' }
                            width={ 960 } height={ 600 } />
                    </div>
                ) }
                <h3>Performers:</h3>
                <p> { evt.attributes.performers }</p>
                <h3> Description:</h3>
                <p>{ evt.attributes.description }</p>
                <h3>Venue: { evt.venue }</h3>
                <p>{ evt.attributes.address }</p>

                <Link href='/events' legacyBehavior>
                    <a className={ styles.back } >
                        { '<' } Go back
                </a>
                </Link>
            </div>
        </Layout>
    )
}


export async function getStaticPaths() {
    const res = await fetch(`${ API_URL }/api/events?populate=*`)
    const events = await res.json()
    console.log('smothhh', events.data[0])
    const paths = events.data.map(evt => ({
        params: {
            slug: evt.attributes.slug
        }

    }))

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(params) {
    const { params: { slug } } = params
    // console.log('ce params', params)
    const res = await fetch(`${ API_URL }/api/events?populate=*&term=${ slug }`)
    const events = await res.json()
    const eventBySlug = events.data.find(eventInfo => eventInfo.attributes.slug === slug)
    console.log('idk events', events.data[0].attributes)

    return {
        props: {
            evt: eventBySlug
        },
        revalidate: 1
    }
}


// export async function getServerSideProps({ query: { slug } }) {
//     const res = await fetch(`${ API_URL }/api/events/${ slug }`)
//     const events = await res.json()

//     return {
//         props: {
//             evt: events[0]
//         }
//     }
// }



