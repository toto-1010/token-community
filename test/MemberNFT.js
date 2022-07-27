const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MemberNFTコントラクト", function() {
    let MemberNFT;
    let memberNFT;
    const name = "MemberNFT";
    const symbol = "MEM";
    const tokenURI1 = "hoge1";
    const tokenURI2 = "hoge2";
    let owner;
    let addr1;

    beforeEach(async function() {
        [owner, addr1] = await ethers.getSigners();
        MemberNFT = await ethers.getContractFactory("MemberNFT");
        memberNFT = await MemberNFT.deploy();
        await memberNFT.deployed();
    });
    
    it("トークンの名前とシンボルがセットされるべき",async function() {
        expect(await memberNFT.name()).to.equal(name);
        expect(await memberNFT.symbol()).to.equal(symbol);
    });    
    it("デプロイアドレスがownerに設定されるべき",async function() {
        expect(await memberNFT.owner()).to.equal(owner.address);
    });
    it("ownerはNFT作成できるべき", async function() {
        await memberNFT.nftMint(addr1.address, tokenURI1);
        expect(await memberNFT.ownerOf(1)).to.equal(addr1.address);
    });
    it("NFT作成のたびにtokenIdがインクリメントされるべき", async function() {
        await memberNFT.nftMint(addr1.address, tokenURI1);
        await memberNFT.nftMint(addr1.address, tokenURI2);
        expect(await memberNFT.tokenURI(1)).to.equal(tokenURI1);
        expect(await memberNFT.tokenURI(2)).to.equal(tokenURI2);
    });
    it("owner以外はNFT作成に失敗すべき", async function () {
        await expect(memberNFT.connect(addr1).nftMint(addr1.address, tokenURI1))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
})