package com.example.LibraryManagementSystem.service;

import com.example.LibraryManagementSystem.model.Book;
import java.util.List;

public interface BookService {
    Book addBook(Book book);
    List<Book> getAllBooks();
    Book getBookById(String id);
    Book updateBook(String id, Book book);
    String deleteBookById(String id);
    List<Book> findBooksByPublicationYear(int year);
    String getGenreByBookId(String id);
    String deleteBooksByYear(int year);
}
