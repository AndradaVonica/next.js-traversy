import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import { useAuthContext } from '@/context/AuthContext'



export default function registerPage() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')


    const { register, error } = useAuthContext()

    useEffect(() => {
        error && toast.error(error)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== passwordConfirm) {
            toast.error('Password do not match')
            return
        }
        register({ username, email, password });
    }

    return (
        <Layout title='User Registration' >
            <div className={ styles.auth } >
                <h1 >
                    <FaUser /> Register
                </h1>
                <ToastContainer />
                <form onSubmit={ handleSubmit } >
                    <div>
                        <label htmlFor='username'>
                            Username
                        </label>
                        <input
                            type='text'
                            id='username'
                            value={ username }
                            onChange={ (e) => setUsername(e.target.value) } >
                        </input>
                    </div>
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
                    <div>
                        <label htmlFor='passwordConfirm'>
                            Password Confirm
                        </label>
                        <input
                            type='password'
                            id='passwordConfirm'
                            value={ passwordConfirm }
                            onChange={ (e) => setPasswordConfirm(e.target.value) } >
                        </input>
                    </div>
                    <input type='submit' value='Login' className='btn' />
                </form>
                <p> Already have an account?
                    <Link href="/account/login" legacyBehavior>
                        Log in
                    </Link>
                </p>
            </div>
        </Layout>
    )
}
