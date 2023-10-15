pragma solidity ^0.4.17;

contract Retorna {
    uint256 public x;
    uint256 public y;


    function Retorna(uint256 newX, uint256 newY) public{
        x = newX;
        y = newY;
    }

    function setX(uint256 valorX) public {
        x = valorX;
    }

    function setY(uint256 valorY) public {
        y = valorY;
    }

    function getSoma() public view returns(uint256) {
        return x + y;
    }

}