import axios from 'axios';
import type { Book } from '../types/Book';

const API_BASE_URL = 'http://localhost:8080/api/books';

export const bookService = {
  // Get all books
  getAllBooks: async (): Promise<Book[]> => {
    const response = await axios.get<Book[]>(API_BASE_URL);
    return response.data;
  },

  // Get book by ID
  getBookById: async (id: string): Promise<Book> => {
    const response = await axios.get<Book>(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Add new book
  addBook: async (book: Book): Promise<Book> => {
    const response = await axios.post<Book>(API_BASE_URL, book);
    return response.data;
  },

  // Update book
  updateBook: async (id: string, book: Book): Promise<Book> => {
    const response = await axios.put<Book>(`${API_BASE_URL}/${id}`, book);
    return response.data;
  },

  // Delete book
  deleteBook: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },

  // Get books by publication year
  getBooksByYear: async (year: number): Promise<Book[]> => {
    const response = await axios.get<Book[]>(`${API_BASE_URL}/year/${year}`);
    return response.data;
  },

  // Get genre by book ID
  getGenreByBookId: async (id: string): Promise<string> => {
    const response = await axios.get<string>(`${API_BASE_URL}/${id}/genre`);
    return response.data;
  },

  // Delete books by year
  deleteBooksByYear: async (year: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/year/${year}`);
  }
};
