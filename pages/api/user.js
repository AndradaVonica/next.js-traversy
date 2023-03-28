import { API_URL } from '@/config/index'
import NextCors from 'nextjs-cors';
import cookie from 'cookie'
import { StrictMode } from 'react';

export default async (req, res) => {

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === 'GET') {
        if (!req.headers.cookie) {
            res.status(403).json({ message: 'Not authorisez' })
            return
        }

        const { token } = cookie.parse(req.headers.cookie)

        const strapiRes = await fetch(`${ API_URL }/api/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })

        const user = await strapiRes.json()

        if (strapiRes.ok) {
            res.status(200).json({ user })
        } else {
            res.status(403).json({ message: 'User forbiden' })
        }


    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${ req.method } not allowed` })
    }
}