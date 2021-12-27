import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const BooksSchema = new mongoose.Schema({
    key: String,
    title: String,
    edition_count: Number,
    publish_date:[String],
    first_publish_year: Number,
    isbn:[String],
    ebook_count_i:Number,
    publisher:[String],
    language:[String],
    author_name:[String],
    subject:[String],

});

BooksSchema.plugin(paginate);

export const Book = mongoose.model('Book', BooksSchema);