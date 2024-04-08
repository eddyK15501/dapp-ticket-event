const { expect } = require('chai');

describe('TicketEvent', () => {
    describe('Deployment', () => {
        it('Sets token name', async () => {
            const contractFactory = await ethers.getContractFactory('TicketEvent');
            const ticketEvent = await contractFactory.deploy('TicketEvent', 'TICK');

            const name = await ticketEvent.name();
            const symbol = await ticketEvent.symbol();

            expect(name).to.eq('TicketEvent');
            expect(symbol).to.eq('TICK');
        })
    })
})