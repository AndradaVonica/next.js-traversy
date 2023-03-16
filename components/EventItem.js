import Link from "next/Link"
import Image from "next/image"
import styles from "@/styles/EventItem.module.css"


export default function EventItem({ evt }) {
    console.log('HERE ETVTTTTTT', evt)

    return (
        <div className={ styles.event }>
            <div className={ styles.img } >
                <Image
                    loader={ () => evt.attributes.image.data.attributes.formats.thumbnail.url }
                    src={ evt.attributes?.image?.data?.attributes?.formats?.thumbnail?.url || '/images/event-default.png' }
                    width={ 170 }
                    height={ 100 } />
            </div>
            <div className={ styles.info } >
                <span> { new Date(evt.attributes.date).toLocaleString('en-US') } at { evt.attributes.time } </span>
                <h3>{ evt.attributes.name }</h3>
            </div>
            <div className={ styles.link } >
                <Link href={ `/events/${ evt.attributes.slug }` } legacyBehavior >
                    <a className="btn">Detail</a>
                </Link>
            </div>
        </div>
    )
}
