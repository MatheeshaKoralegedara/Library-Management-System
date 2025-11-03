package com.example.LibraryManagementSystem.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection="Books")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Book {
    @Id
    private String id;
    private String title;
    private String author;
    private String genre;
    private int publicationYear;
    private String shelfLocation;

}
