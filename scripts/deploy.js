async function main() {
  const HelloWorld = await ethers.getContractFactory('HelloWorld');

  const helloWorld = await HelloWorld.deploy('Hi Babes!');
  console.log('Contract deployed to address: ', helloWorld.address);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
