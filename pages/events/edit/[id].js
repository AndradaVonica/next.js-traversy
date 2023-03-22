import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout"
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from "next/link"
import Image from "next/image"
import { API_URL } from "@/config/index"
import styles from "@/styles/Form.module.css"
import slugify from "slugify"
import moment from "moment"


export default function EditEventPage({ evt }) {
    console.log("bla", evt.attributes);
    const { name, performers, venue, address, date, time, description } = evt.data.attributes
    const [values, setValues] = useState({
        name,
        performers,
        venue,
        address,
        date,
        time,
        description
    })
    const [imagePreview, setImagePreview] = useState(evt.data?.attributes?.image?.data?.attributes.formats.thumbnail.url)

    // console.log("idkkkk", evt.data.attributes.name);
    const router = useRouter()
    const handelSubmit = async (e) => {
        e.preventDefault()

        //Validation 

        const hasEmptyFields = Object.values(values).some(
            (element) => element === " ")
        if (hasEmptyFields) {
            toast.error('Please fill all fields');
        }

        const res = await fetch(`${ API_URL }/api/events/${ evt.data.id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    ...values, slug: slugify(values.name, {
                        replacement: '-',
                        remove: undefined,
                        lower: false,
                        strict: false,
                        locale: 'vi',
                        trim: true
                    })
                }
            })
        })

        if (!res.ok) {
            toast.error('Something went wrong')
            return;
        }

        const updateEvt = await res.json()
        // console.log('eventu nostru', evt)
        router.push(`/api/events/${ updateEvt?.data?.attributes?.slug }`)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    return (
        <Layout title="Add new event">
            <Link href='/events' legacyBehavior> Go Back</Link>
            <h1>Edit Events</h1>
            <ToastContainer />
            <form onSubmit={ handelSubmit }
                className={ styles.form } >
                <div className={ styles.grid } >
                    <div>
                        <label htmlFor='name' > Event name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={ values.name }
                            onChange={ handleInputChange }>
                        </input>
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={ values.performers }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={ values.venue }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={ values.address }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={ moment(values.date).format('yyyy-MM-DD') }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={ values.time }
                            onChange={ handleInputChange }
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={ values.description }
                        onChange={ handleInputChange }
                    ></textarea>
                </div>
                <input type='submit' value='Update event' className='btn' />
            </form>
            <h2> Event image</h2>
            {imagePreview ? (
                <Image loader={ () => imagePreview } src={ imagePreview } height={ 100 } width={ 170 } />
            ) : <div>
                <p>No image uploaded</p>
            </div> }
        </Layout>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${ API_URL }/api/events/${ id }?populate=*`)
    const evt = await res.json()
    console.log("ce id", evt.data.attributes.image.data.attributes.formats.thumbnail.url);


    return {
        props: {
            evt
        }
    }

}