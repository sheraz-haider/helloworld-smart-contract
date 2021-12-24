require('dotenv').config();
const { ethers } = require('hardhat');

const contract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_NODE);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const helloWorldContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
  const message = await helloWorldContract.getMessage();
  console.log('Current message is: ', message);

  const tx = await helloWorldContract.updateMessage('How are you my love?');
  await tx.wait();

  const newMsg = await helloWorldContract.getMessage();
  console.log('New message is: ', newMsg);

}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
