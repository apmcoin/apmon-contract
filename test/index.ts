import { expect } from "chai";
import { ethers } from "hardhat";

interface nft{
  tokenId: Number;
  uri: String;
}

describe("ApMON", function () {
  it("deploy and initial mint", async function () {
    const [owner] = await ethers.getSigners();
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

    expect(await apMON.totalSupply()).to.equal(0);

    const batchMintTx = await apMON.safeBatchMint(owner.address, tokenIds, uris);
    await batchMintTx.wait();

    const ownerBalance = await apMON.balanceOf(owner.address);
    expect(await apMON.totalSupply()).to.equal(ownerBalance);
  });
});
