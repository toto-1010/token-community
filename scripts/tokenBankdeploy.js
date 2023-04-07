const fs = require("fs");
const memberNFTAddress = require("../memberNFTContract");

const main = async () => {
  const addr1 = "0xEC5D03AC39F0CDCEe5fb55F92483BA0ba0f42aa8";
  const addr2 = "0x11280d3f43D954b3E6101A2c0e6B336686ab6cf2";
  const addr3 = "0xfcAEf5dDf2eA635Ca13fD7f8243d55Fe9366d78B";
  const addr4 = "0x4fb137402E4A7f2998CE86F104810C05286fE7c8";

  // デプロイ
  const TokenBank = await ethers.getContractFactory("TokenBank");
  const tokenBank = await TokenBank.deploy(
    "TokenBank",
    "TBK",
    memberNFTAddress
  );
  await tokenBank.deployed();
  console.log(
    `Contract deployed to: https://mumbai.polygonscan.com/address/${tokenBank.address}`
  );
  // console.log(`Contract deployed to: https://sepolia.etherscan.io/address/${memberNFT.address}`);

  // トークンを移転する
  let tx = await tokenBank.transfer(addr2, 300);
  await tx.wait();
  console.log("transferred to addr2");
  tx = await tokenBank.transfer(addr3, 200);
  await tx.wait();
  console.log("transferred to addr3");
  tx = await tokenBank.transfer(addr4, 100);
  await tx.wait();
  console.log("transferred to addr4");

  // Verifyで読み込むargument.jsを生成
  fs.writeFileSync(
    "./argument.js",
    `
    module.exports = [
        "TokenBank",
        "TBK",
        "${memberNFTAddress}"
    ]
    `
  );

  // フロントエンドアプリが読み込むcontracts.jsを生成
  fs.writeFileSync(
    "./contracts.js",
    `
    export const memberNFTAddress = "${memberNFTAddress}"
    export const tokenBankAddress = "${tokenBank.address}"
    `
  );
};

const tokenBankDeploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

tokenBankDeploy();
