import express from 'express';
import cors from 'cors';
import charityRoutes from "./routes/charityRoutes.js";

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.use("/charities", charityRoutes);

app.listen(8080, () => {
    console.log('server listening on port 8080')
})