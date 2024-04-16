const Navigation = () => {
  return (
    <nav>
      <div className='nav__brand'>
        <h1>Ticket Event</h1>
        <input
          type='text'
          className='nav__search'
          placeholder='Share your experience with millions of others'
        />
        <ul className='nav__links'>
          <li>
            <a href='/'>Concerts</a>
          </li>
          <li>
            <a href='/'>Sports</a>
          </li>
          <li>
            <a href='/'>Arts & Theater</a>
          </li>
          <li>
            <a href='/'>More</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
