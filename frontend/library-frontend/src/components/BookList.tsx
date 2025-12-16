import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService';
import type { Book } from '../types/Book';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please check if the backend is running.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id);
        fetchBooks(); // Refresh the list
      } catch (err) {
        alert('Failed to delete book');
        console.error('Error deleting book:', err);
      }
    }
  };

  const handleEdit = (id: string | undefined) => {
    if (id) {
      navigate(`/edit/${id}`);
    }
  };

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="book-list-container">
      <h1 className="page-title">Library — Book List</h1>
      
      {books.length === 0 ? (
        <div className="no-books">
          <p>No books available. Add your first book!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Copies</th>
                <th>Shelf</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publicationYear}</td>
                  <td>{book.genre}</td>
                  <td>{book.copiesAvailable}</td> 
                  <td>{book.shelfLocation}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-edit"
                        onClick={() => handleEdit(book.id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-delete"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookList;
