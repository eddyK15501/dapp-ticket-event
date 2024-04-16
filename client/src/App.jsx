import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Components 
import Navigation from './components/Navigation';

// ABIs
import TicketEvent from '../abi/TicketEvent.json';

// Config
import config from '../config/config.json';

function App() {
  const [account, setAccount] = useState(null);

  const fetchData = async () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const checksumAccount = ethers.utils.getAddress(accounts[0]);
        setAccount(checksumAccount);
      });
    } else {
      alert('Please connect your wallet.')
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <header>
          <Navigation account={account} setAccount={setAccount} />
          <h2 className='header__title'><strong>Event</strong> Tickets</h2>
        </header>
        <h1>Client Start</h1>
      </div>
    </>
  );
}

export default App;
