const Navigation = () => {
  return (
    <nav>
      <div className='nav__brand'>
        <h1>TicketEvent</h1>
        <input
          type='text'
          className='nav__search'
          placeholder='Search for an event'
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
