import { ethers } from "hardhat";
import { parseEther } from "viem";

const { getSelectors, FacetCutAction } = require("../libs/diamond.js");
const { FacetList } = require("../libs/facets.ts");

async function main() {
  const [deployer] = await ethers.getSigners();

  const diamondFactory = await ethers.getContractFactory("Diamond");
  const diamondContract = await diamondFactory.deploy();
  await diamondContract.deployed();

  const cut = [];
  for (const FacetName of FacetList) {
    const Facet = await ethers.getContractFactory(FacetName);
    // @ts-ignore
    const facet = await Facet.deploy();
    await facet.deployed();
    console.log(`${FacetName} facet deployed 👍 => ${facet.address}`);
    cut.push({
      target: facet.address,
      action: FacetCutAction.Add,
      selectors: getSelectors(facet),
    });
  }

  const tx = await diamondContract.diamondCut(
    cut,
    ethers.constants.AddressZero,
    "0x"
  );
  await tx.wait();

  let contractAddresses = new Map<string, string>();
  contractAddresses.set("DIAMOND CONTRACT  => ", diamondContract.address);
  console.table(contractAddresses);
}

/*
npx hardhat run scripts/deploys.ts
*/

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
