/* eslint-disable react/prop-types */
import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  const onConnectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const checksumAccount = ethers.utils.getAddress(accounts[0]);
    setAccount(checksumAccount);
  };

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
      {account ? (
        <button type='button' className='nav__connect'>
            {`${account.slice(0, 6)}...${account.slice(38, 42)}`}
        </button>
      ) : (
        <button type='button' className='nav__connect' onClick={onConnectHandler}>
            Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Navigation;
