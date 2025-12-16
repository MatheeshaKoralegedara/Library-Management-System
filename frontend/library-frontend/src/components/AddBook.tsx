import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService';
import type { Book } from '../types/Book';
import './BookForm.css';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Book>({
    title: '',
    author: '',
    genre: '',
    publicationYear: new Date().getFullYear(),
    copiesAvailable: 1,
    shelfLocation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publicationYear' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.author || !formData.genre || !formData.shelfLocation) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await bookService.addBook(formData);
      alert('Book added successfully!');
      navigate('/');
    } catch (err) {
      setError('Failed to add book. Please try again.');
      console.error('Error adding book:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add Book</h1>
      
      <form onSubmit={handleSubmit} className="book-form">
        {error && <div className="form-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publicationYear">Publication Year</label>
          <input
            type="number"
            id="publicationYear"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleChange}
            min="1000"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="copiesAvailable">Copies Available</label>
          <input
            type="number"
            id="copiesAvailable"
            name="copiesAvailable"
            value={formData.copiesAvailable || ''}
            onChange={handleChange}
            placeholder="Enter number of copies"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shelfLocation">Shelf Location</label>
          <input
            type="text"
            id="shelfLocation"
            name="shelfLocation"
            value={formData.shelfLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Book'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
