const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

const events = [
  {
    name: 'Coachella 2024',
    cost: tokens(0.25),
    tickets: 200,
    date: 'Apr 12',
    time: '12:00AM PST',
    location: 'Empire Polo Club - Indio, California',
  },
  {
    name: 'ETH Seoul',
    cost: tokens(1),
    tickets: 125,
    date: 'Jun 2',
    time: '1:00PM JST',
    location: 'Seoul, South Korea',
  },
  {
    name: 'Clippers vs. Bucks',
    cost: tokens(3),
    tickets: 0,
    date: 'May 31',
    time: '6:00PM EST',
    location: 'Crypto.com Arena - Los Angeles, California',
  },
  {
    name: 'UFC 301: Pantoj vs. Erceg',
    cost: tokens(1.5),
    tickets: 125,
    date: 'May 4',
    time: '10:00PM EDT',
    location: 'Farmasi Arena - Rio de Janeiro, Brazil',
  },
  {
    name: 'Dallas Mavericks vs. Boston Celtics',
    cost: tokens(5),
    tickets: 0,
    date: 'Jun 11',
    time: '2:30PM CST',
    location: 'American Airlines Center - Dallas, TX',
  },
];

module.exports = events;
