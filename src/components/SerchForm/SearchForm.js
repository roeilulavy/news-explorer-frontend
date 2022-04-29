import './SearchForm.css'

export function SearchForm() {
  return (
    <form className='searchForm'>
      <input type='text' name="search" className='searchForm__input' placeholder='Enter topic' autoComplete='off'/>
      <button className='searchForm__button' type='submit'>Search</button>
    </form>
  );
}