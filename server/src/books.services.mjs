import { Book } from "../db/Books.model.mjs";
import 'express-async-errors';

// export async function findBooks(value){
//     const booksResults = await 
//     Book.find({title: { "$regex": value, "$options": "i" } });

//     console.log(booksResults);

//     if (booksResults){
//         return booksResults;
//     }else{
//         return false;
//     }
// }

export async function findBooks(value, pageNum){
    const query = {};
    

    query.title = new RegExp(value, 'i');

     let page = parseInt(pageNum);
    
    const a = await Book.paginate(query, {page})
    console.log(a)
    return a;
   
}