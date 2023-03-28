import { useState } from 'react'
import { API_URL } from "@/config/index"
import styles from "@/styles/Form.module.css"


export default function ImageUpload(props) {
    const { evtId, imageUploaded } = props
    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {
        // console.log('props', props);
        e.preventDefault()
        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'events')
        formData.append('refId', evtId)
        formData.append('fields', 'image')

        // console.log("wtf", formData);
        const res = await fetch(`${ API_URL }/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer fcf8333fa5a5d1a52be52c9485ab7b54a870bdac66179b1d0fc5a22928a744a3bf6316b9a24ac6e2596fdbdfa4486ef68f301aa264ef95dd0458e420d981f1351ab2f728d7798977889968a34670357ee26f0347cc3d2550403362bc1d8f76f850796426a23c19bd7a33b6563168fc046342bf14b54e70d87c4270b187a930bb`
            }
        })
        /*
fcf8333fa5a5d1a52be52c9485ab7b54a870bdac66179b1d0fc5a22928a744a3bf6316b9a24ac6e2596fdbdfa4486ef68f301aa264ef95dd0458e420d981f1351ab2f728d7798977889968a34670357ee26f0347cc3d2550403362bc1d8f76f850796426a23c19bd7a33b6563168fc046342bf14b54e70d87c4270b187a930bb
        */

        if (res.ok) {
            imageUploaded()
        }
    }
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    return (
        <div className={ styles.form } >
            <h1>Upload event iamge</h1>
            <form onSubmit={ handleSubmit } >
                <div className={ styles.file }>
                    <input type='file' onChange={ handleFileChange } />
                </div>
                <input type='submit' value='Upload' className='btn' />
            </form>
        </div>
    )
}
