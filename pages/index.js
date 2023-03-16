// import Link from "next/Link" 
import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import Link from "next/link"
import { API_URL } from "@/config/index"

export default function HomePage({ events }) {
  // console.log('bag pulaevents', events)
  return (
    <Layout>
      <h1>Upcoming events</h1>
      {events.length === 0 && <h3>No events to show</h3> }
      {events.data.map(evt => (
        <EventItem key={ evt.id } evt={ evt } />
      )) }
      {events.length > 0 && (
        <Link href={ '/events' } legacyBehavior>
          <a className="btn-secondary">
            View all
          </a>
        </Link>
      ) }
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${ API_URL }/api/events?populate=*`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1
  }
}