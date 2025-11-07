package com.example.LibraryManagementSystem.service.impl;

import com.example.LibraryManagementSystem.model.Book;
import com.example.LibraryManagementSystem.repository.BookRepository;
import com.example.LibraryManagementSystem.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(String id) {
        return bookRepository.findById(id).orElse(null);
    }

    @Override
    public Book updateBook(String id, Book updatedBook) {
        Optional<Book> existingBook = bookRepository.findById(id);
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setGenre(updatedBook.getGenre());
            book.setPublicationYear(updatedBook.getPublicationYear());
            book.setShelfLocation(updatedBook.getShelfLocation());
            return bookRepository.save(book);
        }
        return null;
    }

    @Override
    public String deleteBookById(String id) {
        bookRepository.deleteById(id);
        return "Book deleted successfully!";
    }

    @Override
    public List<Book> findBooksByPublicationYear(int year) {
        return bookRepository.findByPublicationYear(year);
    }

    @Override
    public String getGenreByBookId(String id) {
        return bookRepository.findById(id)
                .map(Book::getGenre)
                .orElse("Book not found!");
    }

    @Override
    public String deleteBooksByYear(int year) {
        List<Book> books = bookRepository.findByPublicationYear(year);
        bookRepository.deleteAll(books);
        return books.size() + " book(s) deleted from year " + year;
    }
}
