const { expect } = require('chai');

const EVENT_NAME = 'Lollapalooza';
const EVENT_COST = ethers.utils.parseUnits('1', 'ether');
const EVENT_MAX_TICKETS = 10000;
const EVENT_DATE = 'May 31';
const EVENT_TIME = '12:00PM EST';
const EVENT_LOCATION = 'Brooklyn, New York';

describe('TicketEvent', () => {
  let ticketEvent;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory('TicketEvent');
    ticketEvent = await contractFactory.deploy('TicketEvent', 'TICK');

    const transaction = await ticketEvent
      .connect(deployer)
      .listEvent(
        EVENT_NAME,
        EVENT_COST,
        EVENT_MAX_TICKETS,
        EVENT_DATE,
        EVENT_TIME,
        EVENT_LOCATION
      );

    await transaction.wait();
  });

  describe('Deployment', () => {
    it('Sets token name', async () => {
      const name = await ticketEvent.name();
      expect(name).to.eq('TicketEvent');
    });

    it('Sets token symbol', async () => {
      const symbol = await ticketEvent.symbol();
      expect(symbol).to.eq('TICK');
    });

    it('Sets the contract owner address', async () => {
      const ownerAddress = await ticketEvent.owner();
      expect(ownerAddress).to.eq(deployer.address);
    });
  });

  describe('Occasions', () => {
    it('Increments occasions count', async () => {
      const totalOccasions = await ticketEvent.totalOccasions();
      expect(totalOccasions).to.eq(1);
    });
  });
});
