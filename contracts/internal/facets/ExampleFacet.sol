// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { ISolidStateERC20 } from "@solidstate/contracts/token/ERC20/ISolidStateERC20.sol";
import  "@solidstate/contracts/security/reentrancy_guard/ReentrancyGuard.sol";
import '@solidstate/contracts/access/ownable/OwnableInternal.sol';
import { LibExample } from "../libraries/LibExample.sol";
import { Modifiers } from "../libraries/Modifiers.sol";
import { TExample } from "../libraries/Structs.sol";

contract ExampleFacet is OwnableInternal,Modifiers,ReentrancyGuard {

    function add(
        uint256 _a,
        uint256 _b
    ) 
        public 
        pure 
        returns (uint256 c) 
    {
        c = _a + _b;
    }

    function set(
        TExample memory _params
    ) 
        external 
        onlyOwner 
        whenNotContract(msg.sender) 
    {
        LibExample.layout().example = _params;
    }

}