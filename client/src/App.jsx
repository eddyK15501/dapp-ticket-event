import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Card from './components/Card';
import Sort from './components/Sort';
import SeatChart from './components/SeatChart';

// ABIs
import abi from '../abi/TicketEvent.json';

// Config
import config from '../config/config.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [ticketEvent, setTicketEvent] = useState(null);
  const [occasions, setOccasions] = useState([]);

  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);

  const fetchData = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      const contractAddress = await config[network.chainId].TicketEvent.address;
      console.log(`ChainId: ${network.chainId} connected.`);

      const ticketEvent = new ethers.Contract(contractAddress, abi, provider);
      setTicketEvent(ticketEvent);

      // Get initial events
      const totalOccasions = await ticketEvent.totalOccasions();
      const events = [];

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
        <Sort />
        <div className='cards'>
          {occasions.map((occasionProp) => (
            <Card
              occasion={occasionProp}
              setOccasion={setOccasion}
              toggle={toggle}
              setToggle={setToggle}
              key={occasionProp.name}
            />
          ))}
        </div>
        {toggle && (
          <SeatChart
            setToggle={setToggle}
            occasion={occasion}
            ticketEvent={ticketEvent}
            provider={provider}
          />
        )}
      </div>
    </>
  );
}

export default App;
