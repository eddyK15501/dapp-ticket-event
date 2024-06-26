const { expect } = require('chai');

const EVENT_NAME = 'Lollapalooza';
const EVENT_COST = ethers.utils.parseUnits('1', 'ether');
const EVENT_MAX_TICKETS = 10000;
const EVENT_DATE = 'May 31';
const EVENT_TIME = '12:00PM EST';
const EVENT_LOCATION = 'Brooklyn, New York';

describe('TicketEvent', () => {
  let ticketEvent;
  let owner, buyer;

  beforeEach(async () => {
    [owner, buyer] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory('TicketEvent');
    ticketEvent = await contractFactory.deploy('TicketEvent', 'TIC');

    const transaction = await ticketEvent
      .connect(owner)
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
      expect(symbol).to.eq('TIC');
    });

    it('Sets the contract owner address', async () => {
      const ownerAddress = await ticketEvent.owner();
      expect(ownerAddress).to.eq(owner.address);
    });
  });

  describe('Occasions', () => {
    it('Increments occasions count', async () => {
      const totalOccasions = await ticketEvent.totalOccasions();
      expect(totalOccasions).to.eq(1);
    });

    it('Returns the correct event attributes listed', async () => {
      const event = await ticketEvent.getEvent(1);

      expect(event.id).to.eq(1);
      expect(event.name).to.eq(EVENT_NAME);
      expect(event.cost).to.eq(EVENT_COST);
      expect(event.tickets).to.eq(EVENT_MAX_TICKETS);
      expect(event.maxTickets).to.eq(EVENT_MAX_TICKETS);
      expect(event.date).to.eq(EVENT_DATE);
      expect(event.time).to.eq(EVENT_TIME);
      expect(event.location).to.eq(EVENT_LOCATION);
    });
  });

  describe('Minting', () => {
    const ID = 1;
    const SEAT = 500;
    const AMOUNT = ethers.utils.parseUnits('1', 'ether');

    beforeEach(async () => {
      const transaction = await ticketEvent
        .connect(buyer)
        .mint(ID, SEAT, { value: AMOUNT });
      await transaction.wait();
    });

    it('Updates ticket count', async () => {
      const event = await ticketEvent.getEvent(1);
      expect(event.tickets).to.eq(EVENT_MAX_TICKETS - 1);
    });

    it('Checks if ticket has been bought', async () => {
      const status = await ticketEvent.hasBought(ID, buyer.address);
      expect(status).to.eq(true);
    });

    it('Checks seat owner address', async () => {
      const owner = await ticketEvent.seatTaken(ID, SEAT);
      expect(owner).to.eq(buyer.address);
    });

    it('Checks the seat number', async () => {
      const seats = await ticketEvent.getSeatsTaken(ID);
      expect(seats.length).to.eq(1);
      expect(seats[0]).to.eq(SEAT);
    });

    it('Updates the contract balance after minting', async () => {
      const balance = await ethers.provider.getBalance(ticketEvent.address);
      expect(balance).to.eq(AMOUNT);
    });
  });

  describe('Withdraw contract balance as owner', () => {
    const ID = 1;
    const SEAT = 500;
    const AMOUNT = ethers.utils.parseUnits('1', 'ether');
    let balanceBefore;

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(owner.address);

      let transaction = await ticketEvent
        .connect(buyer)
        .mint(ID, SEAT, { value: AMOUNT });
      await transaction.wait();

      transaction = await ticketEvent.connect(owner).withdraw();
      await transaction.wait();
    });

    it('Updates the balance of the contract owner', async () => {
      const balanceAfter = await ethers.provider.getBalance(owner.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it('Updates the balance of the smart contract', async () => {
      const balance = await ethers.provider.getBalance(ticketEvent.address);
      expect(balance).to.eq(0);
    });
  });
});
