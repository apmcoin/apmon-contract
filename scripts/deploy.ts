import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const ApMON = await ethers.getContractFactory("ApMON");
  const apMON = await ApMON.deploy();
  await apMON.deployed();

  var tokenIds: Array<Number> = new Array<Number>();
  var uris: Array<String> = new Array<String>();

  for (let i = 1; i <= 5; i++) {
    let idx = i - 1;
    tokenIds[idx] = i;
    uris[idx] = "https://apmon.apm-coin.com/matadata/test-" + i + ".json";
  }

  //test mint
  const batchMintTx = await apMON.safeBatchMint(deployer.address, tokenIds, uris);
  await batchMintTx.wait();
  //npx hardhat run --network bsctestnet scripts/deploy.ts

  const ownerBalance = await apMON.balanceOf(deployer.address);
  console.log("apMON totalSupply:", ownerBalance);
  console.log("apMON deployed to:", apMON.address);

  //verify exam
  //npx hardhat verify --network bsctestnet DEPLOYED_CONTRACT_ADDRESS
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
