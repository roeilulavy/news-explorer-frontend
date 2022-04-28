import './PreLoader.css'

export function PreLoader() {
  return (
    <div className='preloader'>
      <i className="preloader__spinner" />
      <p className="preloader__title">Searching for news...</p>
    </div>
  );
}
