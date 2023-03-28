import { FaUser } from 'react-icons/fa'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import { useAuthContext } from '@/context/AuthContext'




export default function loginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error } = useAuthContext()
    // console.log('eroare', error);

    useEffect(() => {
        error && toast.error(error)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        login({ email, password })
    }

    return (
        <Layout title='User Login' >
            <div className={ styles.auth } >
                <h1 >
                    <FaUser /> Log in
                </h1>
                <ToastContainer />
                <form onSubmit={ handleSubmit } >
                    <div>
                        <label htmlFor='email'>
                            Email address
                        </label>
                        <input
                            type='email'
                            id='email'
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) } >
                        </input>
                    </div>
                    <div>
                        <label htmlFor='password'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            value={ password }
                            onChange={ (e) => setPassword(e.target.value) } >
                        </input>
                    </div>
                    <input type='submit' value='Login' className='btn' />
                </form>
                <p> Dont have an account?
                    <Link href="/account/register" legacyBehavior>
                        Register
                    </Link>
                </p>
            </div>
        </Layout>
    )
}
