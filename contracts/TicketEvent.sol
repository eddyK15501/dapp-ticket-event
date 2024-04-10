// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketEvent is ERC721 {
    address public owner;
    uint256 public totalOccasions;

    mapping(uint => Occasion) public occasion;

    modifier onlyOwner() {
        require(msg.sender == owner, "Authorization Error");
        _;
    }

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function listEvent(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        totalOccasions++;

        occasion[totalOccasions] = Occasion(
            totalOccasions,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
        ); 
    }

    function getEvent(uint256 _id) public view returns(Occasion memory) {
        return occasion[_id];
    }
}

