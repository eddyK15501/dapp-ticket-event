import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// ABIs
import TicketEvent from '../abi/TicketEvent.json';

// Config
import config from '../config/config.json';

function App() {
  const [account, setAccount] = useState(null);

  const fetchData = async () => {
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const checksumAccount = ethers.utils.getAddress(accounts[0]);
      setAccount(checksumAccount);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <header>
          <h2 className='header__title'><strong>Event</strong> Tickets</h2>
        </header>
        <h1>Client Start</h1>
      </div>
    </>
  );
}

export default App;
