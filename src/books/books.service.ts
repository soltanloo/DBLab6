import BookEntity from '../db/entity/book.entity';
import CreateBookDto from '../dto/create-book.dto';
import UserEntity from '../db/entity/user.entity';
import GenreEntity from '../db/entity/genre.entity';
import UpdateBookDto from '../dto/update-book.dto';

export class BooksService {
  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name, userID, genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID);
    book.genres = [];
    for (let i = 0; i < genreIDs.length; i++) {
      const genre = await GenreEntity.findOne(genreIDs[i]);
      book.genres.push(genre);
    }
    await book.save();
    return book;
  }

  async getAllBooks(): Promise<BookEntity[]> {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return BookEntity.find();
  }

  async delete(bookId: number): Promise<any> {
    const book = await BookEntity.findOneOrFail(bookId);
    return BookEntity.remove(book);
  }

  async update(book: UpdateBookDto): Promise<any> {
    const originalBook = await BookEntity.findOneOrFail(book.id);
    if (book.genreIDs) {
      originalBook.genres = [];
      for (let i = 0; i < book.genreIDs.length; i++) {
        const genre = await GenreEntity.findOne(book.genreIDs[i]);
        originalBook.genres.push(genre);
      }
    }
    if (book.name) {
      originalBook.name = book.name;
    }
    if (book.userID) {
      originalBook.user = await UserEntity.findOneOrFail(book.userID);
    }

    return originalBook.save();
  }
}
