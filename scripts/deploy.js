// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');
const events = require('../utils/events');

async function main() {
  const signer = await ethers.getSigners();

  const contractFactory = await ethers.getContractFactory('TicketEvent');
  const ticketEvent = await contractFactory.deploy('TicketEvent', 'TIC');
  await ticketEvent.deployed();

  console.log(`Deployed. TicketEvent contract address: ${ticketEvent.address}`);

  console.log(events);

  for (let event of events) {
    const transaction = await ticketEvent
      .connect(signer[0])
      .listEvent(
        event.name,
        event.cost,
        event.tickets,
        event.date,
        event.time,
        event.location
      );

    await transaction.wait();
    console.log(`${event.name} listed.`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
