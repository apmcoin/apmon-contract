import { ethers } from "hardhat";

async function main() {

  const ApMON = await ethers.getContractFactory("ApMON");
  const apMON = await ApMON.deploy();

  await apMON.deployed();

  console.log("apMON deployed to:", apMON.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
