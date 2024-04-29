import { parseEther } from "viem";

const FacetList: string[] = ["ExampleFacet"];

const TExample = {
  value: parseEther("1"),
};

exports.FacetList = FacetList;
exports.TExample = TExample;
