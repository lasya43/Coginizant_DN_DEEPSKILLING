package com.library.service;
import com.library.repository.BookRepository;

public class BookService {
    private BookRepository bookRepository;

    // setter for DI
    public void setBookRepository(BookRepository bookRepository) {

        this.bookRepository = bookRepository;
    }

    public void listBooks() {

        bookRepository.getAllBooks();
    }
}

