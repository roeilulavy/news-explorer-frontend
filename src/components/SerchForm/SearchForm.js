import './SearchForm.css';
import { useEffect, useState } from 'react';

export function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    setPlaceholder('Enter topic');
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword) {
      setPlaceholder('Please enter a keyword');
      return;
    }
    onSearch(keyword);
  };

  return (
    <form className='searchForm' onSubmit={handleSubmit}>
      <input
        type='text'
        name="keyword-search"
        className='searchForm__input'
        placeholder={placeholder}
        autoComplete='off'
        value={keyword || ''}
        onChange={(e) => setKeyword(e.target.value)}
        />
      <button className='searchForm__button' type='submit'>Search</button>
    </form>
  );
}