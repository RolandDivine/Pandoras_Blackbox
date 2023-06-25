const DarkPool = artifacts.require("DarkPool");

module.exports = async function (deployer) {
  // Deploy the DarkPool contract
  await deployer.deploy(DarkPool);

  // Get the deployed contract instance
  const darkPool = await DarkPool.deployed();

  // Log the contract address for reference
  console.log("DarkPool contract deployed at:", darkPool.address);
};

