import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

const { getSelectors, FacetCutAction } = require("../libs/diamond.js");
const { FacetList, TExample } = require("../libs/facets.ts");

describe("Example", function () {
  async function deploys() {
    const [deployer, otherAccount] = await ethers.getSigners();

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

    const exampleFacet = await ethers.getContractAt(
      "ExampleFacet",
      diamondContract.address
    );
    await exampleFacet.deployed();

    return { exampleFacet, deployer, otherAccount };
  }

  describe("Deployment", function () {
    it("example", async function () {
      const { exampleFacet, deployer, otherAccount } = await loadFixture(
        deploys
      );

      const set = await exampleFacet.connect(deployer).set(TExample);
      await set.wait();
    });
  });
});

/*
npx hardhat test
*/
