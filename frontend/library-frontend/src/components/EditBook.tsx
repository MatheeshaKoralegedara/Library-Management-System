import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookService } from '../services/bookService';
import type { Book } from '../types/Book';
import './BookForm.css';

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Book>({
    title: '',
    author: '',
    genre: '',
    publicationYear: new Date().getFullYear(),
    shelfLocation: '',
    copiesAvailable: 1
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const fetchBook = async (bookId: string) => {
    try {
      setLoading(true);
      const book = await bookService.getBookById(bookId);
      setFormData(book);
      setError(null);
    } catch (err) {
      setError('Failed to fetch book details');
      console.error('Error fetching book:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publicationYear' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    // Validation
    if (!formData.title || !formData.author || !formData.genre || !formData.shelfLocation) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await bookService.updateBook(id, formData);
      alert('Book updated successfully!');
      navigate('/');
    } catch (err) {
      setError('Failed to update book. Please try again.');
      console.error('Error updating book:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading book details...</div>;
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Edit Book</h1>
      
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
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
