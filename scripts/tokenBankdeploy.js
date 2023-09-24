const fs = require("fs");
const memberNFTAddress = require("../memberNFTContract");

const main = async () => {
  const addr1 = "0xC366ca6dcca1F077E69d6E1ed007feCF489f170C";
  const addr2 = "0x031E628ea16c5197799377E0117bdc9c9B90865b";
  const addr3 = "0x4b7be4F74807A7460E0EE092dd9a26F36FbcD024";
  const addr4 = "0xe0e0641636954dE734F9d646607AF55A691C7deb";

  // デプロイ
  const TokenBank = await ethers.getContractFactory("TokenBank");
  const tokenBank = await TokenBank.deploy(
    "TokenBank",
    "TBK",
    memberNFTAddress
  );
  await tokenBank.deployed();
  console.log(
    `Contract deployed to: https://sepolia.etherscan.io/address/${tokenBank.address}`
  );

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
