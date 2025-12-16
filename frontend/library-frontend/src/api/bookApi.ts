import axios from "axios";
import { type Book } from "../types/Book";


const API_URL = "http://localhost:8080/api/books"; 


export const getBooks = () => axios.get<Book[]>(API_URL);
export const getBookById = (id: number) => axios.get<Book>(`${API_URL}/${id}`);
export const addBook = (book: Book) => axios.post(API_URL, book);
export const updateBook = (id: number, book: Book) => axios.put(`${API_URL}/${id}`, book);
export const deleteBook = (id: number) => axios.delete(`${API_URL}/${id}`);