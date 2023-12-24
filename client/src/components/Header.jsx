import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-gradient-to-r from-purple-700 to-indigo-600 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <div className='flex items-center space-x-4'>
          <Link to='/'>
            <h1 className='font-bold text-2xl text-white'>
              Real<span className='text-yellow-300'>Estate</span>
            </h1>
          </Link>
          <Link to='/' className='text-white hover:underline'>
            Home
          </Link>
          <Link to='/about' className='text-white hover:underline'>
            About
          </Link>
        </div>
        <form onSubmit={handleSubmit} className='flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent border-b border-white text-white focus:outline-none'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' className='ml-2'>
            <FaSearch className='text-white' />
          </button>
        </form>
        <div className='flex items-center space-x-4'>
          {currentUser ? (
            <Link to='/profile'>
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            </Link>
          ) : (
            <Link to='/profile' className='text-yellow-300 hover:underline'>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
