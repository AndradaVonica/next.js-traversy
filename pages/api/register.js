import cookie from 'cookie'
import { API_URL } from '@/config/index'
import NextCors from 'nextjs-cors';


export default async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === 'POST') {
        const { username, email, password } = req.body

        const strapiRes = await fetch(`${ API_URL }/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })

        const data = await strapiRes.json()

        if (strapiRes.ok) {
            // Set Cookie
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', data.jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    sameSite: 'strict',
                    path: '/',
                })
            )

            res.status(200).json({ user: data.user })
        } else {
            res.status(data.error.status).json({ message: data.error.message })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${ req.method } not allowed` })
    }
}