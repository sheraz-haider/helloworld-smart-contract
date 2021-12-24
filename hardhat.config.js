require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('hardhat-watcher');

task(
  'accounts',
  'Prints the list of accounts and balances',
  async (taskArgs, { ethers }) => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
      console.log('Account: ', account.address);
      console.log('Balance: ', (await account.getBalance()) / 10 ** 18);
      console.log('');
    }
  }
);

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.5',
  // defaultNetwork: 'localhost',
  networks: {
    ropsten: {
      url: process.env.INFURA_NODE,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true,
    },
  },
};
