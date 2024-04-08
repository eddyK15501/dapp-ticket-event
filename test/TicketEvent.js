const { expect } = require('chai');

describe('TicketEvent', () => {
  let ticketEvent;

  beforeEach(async () => {
    const contractFactory = await ethers.getContractFactory('TicketEvent');
    ticketEvent = await contractFactory.deploy('TicketEvent', 'TICK');
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
  });
});
