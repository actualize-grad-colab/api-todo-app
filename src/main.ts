import express from 'express'
import { Request, Response } from 'express'
const app = express()
const port = 3300


app.get('/', (_req: Request, res: Response) => { res.send('We did it again') }
)

app.listen(port, () => {
    console.log(`ToDo API Running on port ${port}`)
})
