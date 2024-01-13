// SPDX-License-Identifier: MIT
pragma solidity >0.8.9;

library WithdrawPattern {
    function withdraw(mapping(address => uint) storage _address, uint amount) external returns(bool){
        require(_address[msg.sender] >= amount, "Saldo insuficiente");
        
        _address[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        return true;
    }
}

contract Auction {
    struct HighBidder {
        address addressHigh;
        uint amountHigh;
    }

    mapping(address => uint) bidders;

    uint minTime;
    uint maxTime;
    event eventHigher(address, uint);
    event auctionEnding(address, uint);
    address owner;

    constructor() {
        maxTime = block.timestamp + 30 seconds;
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);

        _;
    }

    HighBidder public hb;

    function Withdraw() public payable returns(bool) {
        return WithdrawPattern.withdraw(bidders, msg.value);
    }

    function Bid() public payable {
        if(block.timestamp < maxTime) {
            bidders[msg.sender] += msg.value;
            if(msg.value > hb.amountHigh) {
                if(hb.addressHigh != address(0)) {
                    payable(hb.addressHigh).transfer(hb.amountHigh);
                }
                hb.amountHigh = msg.value;
                hb.addressHigh = msg.sender;
                emit eventHigher(msg.sender, msg.value);
            } else {
                Withdraw();
            }
        } else {
            revert("O Leilao foi finalizado");
        }
    }

    function TransferBidWinner() public payable onlyOwner returns(bool) {
        require(block.timestamp >= maxTime, "Leilao nao terminou");

        payable(hb.addressHigh).transfer(address(this).balance);
        emit auctionEnding(hb.addressHigh, hb.amountHigh);

        return true;
    }

}