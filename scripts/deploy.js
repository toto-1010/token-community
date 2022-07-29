const main = async () => {
    MemberNFT = await ethers.getContractFactory("MemberNFT");
    memberNFT = await MemberNFT.deploy();
    await memberNFT.deployed();

    console.log(`Contract deployed to: ${memberNFT.address}`);
}

const deploy = async () => {
    try{
        await main();
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

deploy()
