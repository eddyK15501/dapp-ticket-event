import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';

// ABIs
import abi from '../abi/TicketEvent.json';

// Config
import config from '../config/config.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [ticketEvent, setTicketEvent] = useState(null);
  const [occasions, setOccasions] = useState([]);

  const fetchData = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      const contractAddress = config[network.chainId].TicketEvent.address;
      const ticketEvent = new ethers.Contract(contractAddress, abi, provider);
      setTicketEvent(ticketEvent);

      // Get initial events
      const totalOccasions = await ticketEvent.totalOccasions();
      const events = []

      for (let i = 1; i <= totalOccasions; i++) {
        const event = await ticketEvent.getEvent(i);
        events.push(event);
      }
      setOccasions(events);

      console.log(events);

      // Change accounts
      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const checksumAccount = ethers.utils.getAddress(accounts[0]);
        setAccount(checksumAccount);
      });
    } else {
      alert('Please connect your wallet.');
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
          <h2 className='header__title'>
            <strong>Event</strong> Tickets
          </h2>
        </header>
        <div className="cards">
          {occasions.map(occasion => (
            <p key={occasion.name}>{occasion.name}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
