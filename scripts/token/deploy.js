const { ethers } = require('hardhat');

async function main() {
  const token = await ethers.getContractFactory('Token');
  const tokenContract = await token.deploy('My Test Token', 'MTT', 100000);
  await tokenContract.deployed();

  const ownerAddress = await tokenContract.owner();

  console.log(`Contract deployed at: ${tokenContract.address}`);
  console.log(`Contract owner is: ${ownerAddress}`);
  console.log('Token name is: ', await tokenContract.name());
  console.log(
    `Balance of owner is: ${await tokenContract.balanceOf(ownerAddress)}`
  );
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
