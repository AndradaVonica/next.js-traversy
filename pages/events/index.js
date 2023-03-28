// import Link from "next/Link" 
import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
const PER_PAGE = 3;

export default function EventsPage({ events }) {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No events to show</h3> }
            {events.data.map(evt => (
                <EventItem key={ evt.id } evt={ evt } />
            )) }
        </Layout>
    )
}

export async function getServerSideProps({ query: { page = 1 } }) {
    // console.log('page ', page);
    const res = await fetch(`${ API_URL }/api/events?populate=*?pagination[start]=0&pagination[limit]=${ PER_PAGE }`)
    const events = await res.json()
    // console.log('lala', events.data[2]);

    return {
        props: { events }
    }
}
