const Ownable = artifacts.require('Ownable');

contract('Ownable', (accounts) => {
  let ownableInstance;
  const owner = accounts[0];
  const nonOwner = accounts[1];

  beforeEach(async () => {
    ownableInstance = await Ownable.new({ from: owner });
  });

  it('should set the deployer as the owner', async () => {
    const contractOwner = await ownableInstance.owner();
    assert.strictEqual(contractOwner, owner, 'The deployer should be the owner');
  });

  it('should allow the owner to transfer ownership', async () => {
    const newOwner = nonOwner;
    await ownableInstance.transferOwnership(newOwner, { from: owner });
    const contractOwner = await ownableInstance.owner();
    assert.strictEqual(contractOwner, newOwner, 'Ownership transfer failed');
  });

  it('should prevent non-owners from transferring ownership', async () => {
    const newOwner = nonOwner;
    try {
      await ownableInstance.transferOwnership(newOwner, { from: nonOwner });
      assert.fail('Non-owner should not be able to transfer ownership');
    } catch (error) {
      assert(error.message.includes('Ownable: caller is not the owner'), 'Unexpected error message');
    }
  });
});

