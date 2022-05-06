import './SearchForm.css';
import { useState } from 'react';

export function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword) {
      return;
    }
    onSearch({ keyword });
  };

  return (
    <form className='searchForm' onSubmit={handleSubmit}>
      <input
        type='text'
        name="keyword-search"
        className='searchForm__input'
        placeholder='Enter topic'
        autoComplete='off'
        value={keyword || ''}
        onChange={(e) => setKeyword(e.target.value)}
        />
      <button className='searchForm__button' type='submit'>Search</button>
    </form>
  );
}