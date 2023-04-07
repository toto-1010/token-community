const fs = require("fs");

const main = async () => {
  const addr1 = "0xEC5D03AC39F0CDCEe5fb55F92483BA0ba0f42aa8";
  const addr2 = "0x11280d3f43D954b3E6101A2c0e6B336686ab6cf2";
  const addr3 = "0xfcAEf5dDf2eA635Ca13fD7f8243d55Fe9366d78B";

  const tokenURI1 =
    "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata1.json";
  const tokenURI2 =
    "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata2.json";
  const tokenURI3 =
    "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata3.json";
  const tokenURI4 =
    "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata4.json";
  const tokenURI5 =
    "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata5.json";

  // デプロイ
  const MemberNFT = await ethers.getContractFactory("MemberNFT");
  const memberNFT = await MemberNFT.deploy();
  await memberNFT.deployed();

  console.log(
    `Contract deployed to: https://mumbai.polygonscan.com/address/${memberNFT.address}`
  );
  // console.log(`Contract deployed to: https://sepolia.etherscan.io/address/${memberNFT.address}`);

  // NFTをmintする
  let tx = await memberNFT.nftMint(addr1, tokenURI1);
  await tx.wait();
  console.log("NFT#1 minted...");
  tx = await memberNFT.nftMint(addr1, tokenURI2);
  await tx.wait();
  console.log("NFT#2 minted...");
  tx = await memberNFT.nftMint(addr2, tokenURI3);
  await tx.wait();
  console.log("NFT#3 minted...");
  tx = await memberNFT.nftMint(addr2, tokenURI4);
  await tx.wait();
  console.log("NFT#4 minted...");

  // コントラクトアドレスの書き出し
  fs.writeFileSync(
    "./memberNFTContract.js",
    `
    module.exports = "${memberNFT.address}"
    `
  );
};

const memberNFTDeploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

memberNFTDeploy();
