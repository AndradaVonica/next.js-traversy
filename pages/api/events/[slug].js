const { events } = require('./data.json')

export default function handler(req, res) {
    // evt is reffered to single events 
    const evt = events.filter(ev => ev.slug === req.query.slug)
    // console.log("fmm ", ev)

    if (req.method === 'GET') {
        res.status(200).json(evt)
    } else {
        res.SetHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${ req.method } is not allowed` })
    }
}