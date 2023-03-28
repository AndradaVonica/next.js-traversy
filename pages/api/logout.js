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
    if (req.method === 'POST') {
        //Destroy cookie
        res.setHeader('Set-Cookie', cookie.serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
            path: '/'
        })
        )

        res.status(200).json({ message: 'Succes' })

    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${ req.method } not allowed` })
    }
}