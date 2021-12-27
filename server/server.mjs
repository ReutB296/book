import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import 'express-async-errors';
import './db/connect.mjs';
import { BooksRouter } from './src/books.routs.mjs';
import { findBooks } from './src/books.services.mjs';

export const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/Books', BooksRouter);

app.post('/api/Books/search', async(req,res) =>{
    const booksResults = await findBooks(req.body.value, req.query.page);

    if (booksResults){
        res.send(booksResults);
    }else {
        res.send(false);
    }
})

const port = process.env.PORT || 8080;
app.listen(port);

console.log("Server is listening on http://localhost:" + port);