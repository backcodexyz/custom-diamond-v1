// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { TExample } from "./Structs.sol";

library LibExample {
    bytes32 internal constant STORAGE_SLOT = keccak256('storage.example.backcode.xyz');


    struct Layout {
        TExample example;
    }

    function layout(
    ) 
        internal 
        pure 
        returns (Layout storage l) 
    {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }

}