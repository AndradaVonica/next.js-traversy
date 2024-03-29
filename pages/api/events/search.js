// import Link from "next/Link" 
import qs from 'qs'
import Layout from "@/components/Layout"
import Link from "next/link"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
import { useRouter } from 'next/router'

export default function SearchPage({ events }) {
    const router = useRouter()

    return (
        <Layout title='Search results'>
            <Link href='/events'> Go back</Link>
            <h1>Search results for { router.query.term }</h1>
            {events.length === 0 && <h3>No events to show</h3> }
            {events.data.map(evt => (
                <EventItem key={ evt.id } evt={ evt } />
            )) }
        </Layout>
    )
}

export async function getServerSideProps({ query: { term } }) {
    const query = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { performers_contains: term },
                { desccription_contains: term },
                { venue_contains: term }
            ]
        }
    })
    const res = await fetch(`${ API_URL }/api/events?${ query }`)
    const events = await res.json()

    return {
        props: { events }
    }
}
