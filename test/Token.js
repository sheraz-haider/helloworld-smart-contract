const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token Contract', () => {
  let token;
  let owner;
  let account1;
  let account2;
  let account3;
  let accounts;
  const name = 'Simple Token';
  const symbol = 'ST';
  const totalSupply = 1000000;

  beforeEach(async () => {
    [owner, account1, account2, account3, ...accounts] =
      await ethers.getSigners();

    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy(name, symbol, totalSupply);
    await token.deployed();
  });

  describe('Deployment', () => {
    it('Should set the correct token meta', async () => {
      expect(await token.name()).to.be.equals(name);
      expect(await token.symbol()).to.be.equals(symbol);
      expect(await token.totalSupply()).to.be.equals(totalSupply);
    });

    it('Should set the right owner', async () => {
      expect(await token.owner()).to.be.equals(owner.address);
    });

    it('Should assign all tokens to owner', async () => {
      expect(await token.balanceOf(owner.address)).to.be.equals(totalSupply);
    });
  });

  describe('Transfer function', () => {
    it('Should transfer token between accounts', async () => {
      const tx1 = await token.transfer(account1.address, 10000);
      await tx1.wait();

      expect(await token.balanceOf(account1.address)).to.be.equals(10000);

      const tx2 = await token
        .connect(account1)
        .transfer(account2.address, 5000);
      await tx2.wait();

      expect(await token.balanceOf(account2.address)).to.be.equals(5000);
    });

    it('Should fail if account balance is less than transfer amount', async () => {
      const account2Balance = await token.balanceOf(account2.address);

      await expect(
        token.connect(account1).transfer(account2.address, 10000)
      ).to.be.revertedWith('Not enough tokens!');

      expect(await token.balanceOf(account2.address)).to.be.equals(
        account2Balance
      );
    });

    it('Should update balances after transfers', async () => {
      const tx = await token.transfer(account1.address, 10000);
      await tx.wait();

      expect(await token.balanceOf(owner.address)).to.be.equals(
        totalSupply - 10000
      );
      expect(await token.balanceOf(account1.address)).to.be.equals(10000);
    });
  });

  // Transfer from function is remaining to test
});
