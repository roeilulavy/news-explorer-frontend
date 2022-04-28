import './NotFound.css'
import NotFoundIcon from '../../images/icons/not_found_icon.svg';

export function NotFound() {
  return (
    <div className='notFound'>
      <img className='notFound__logo' src={NotFoundIcon} alt="not found logo" />
      <h2 className='notFound__title'>Nothing found</h2>
      <p className='notFound__subtitle'>Sorry, but nothing matched your search terms.</p>
    </div>
  );
}
