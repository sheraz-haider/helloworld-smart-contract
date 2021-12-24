const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('HelloWorld Contract', () => {
  let helloWorld;
  let message = 'Hello World!';

  beforeEach(async () => {
    const HelloWorld = await ethers.getContractFactory('HelloWorld');
    helloWorld = await HelloWorld.deploy(message);
    await helloWorld.deployed();
  });

  it('Should set the initial message on deploy', async () => {
    expect(await helloWorld.getMessage()).to.be.equals(message);
  });

  it('Should set the message with function', async () => {
    const tx = await helloWorld.updateMessage('New Message');
    await tx.wait();

    expect(await helloWorld.getMessage()).to.be.equals('New Message');
  });
});
