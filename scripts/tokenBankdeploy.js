const fs = require("fs");
const memberNFTAddress = require("../memberNFTContract");

const main = async () => {
    const addr1 = "0xD5Df8975d40bd92e8EA2A2CE5068D11B1C3dB1f7";
    const addr2 = "0xE1F1A9cE89AB46E416712Fc5c17aFaEF38e84680";
    const addr3 = "0x7De27aF7b7bdc011965BC11a690e855bC97915C2";
    const addr4 = "0x431f1519b7cCB412Bd034a76899D9Ab5f4628EC6";

    // デプロイ
    const TokenBank = await ethers.getContractFactory("TokenBank");
    const tokenBank = await TokenBank.deploy("TokenBank", "TBK", memberNFTAddress);
    await tokenBank.deployed();
    console.log(`Contract deployed to: https://rinkeby.etherscan.io/address/${tokenBank.address}`);

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
    fs.writeFileSync("./argument.js",
    `
    module.exports = [
        "TokenBank",
        "TBK",
        "${memberNFTAddress}"
    ]
    `
    );

    // フロントエンドアプリが読み込むcontracts.jsを生成
    fs.writeFileSync("./contracts.js",
    `
    export const memberNFTAddress = "${memberNFTAddress}"
    export const tokenBankAddress = "${tokenBank.address}"
    `
    );    
}

const tokenBankDeploy = async () => {
    try{
        await main();
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

tokenBankDeploy();
