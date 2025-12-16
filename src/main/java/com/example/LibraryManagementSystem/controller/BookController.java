package com.example.LibraryManagementSystem.controller;

import com.example.LibraryManagementSystem.model.Book;
import com.example.LibraryManagementSystem.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(" http://localhost:5173") 
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/add")
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @GetMapping("/all")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return bookService.getBookById(id);
    }

    @PutMapping("/update/{id}")
    public Book updateBook(@PathVariable String id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBook(@PathVariable String id) {
        return bookService.deleteBookById(id);
    }

    @GetMapping("/year/{year}")
    public List<Book> getBooksByYear(@PathVariable int year) {
        return bookService.findBooksByPublicationYear(year);
    }

    @GetMapping("/genre/{id}")
    public String getGenreById(@PathVariable String id) {
        return bookService.getGenreByBookId(id);
    }

    @DeleteMapping("/delete/year/{year}")
    public String deleteBooksByYear(@PathVariable int year) {
        return bookService.deleteBooksByYear(year);
    }
}
