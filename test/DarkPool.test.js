const DarkPool = artifacts.require('DarkPool');

contract('DarkPool', (accounts) => {
  let darkPool;

  // Deploy a new instance of the DarkPool contract before each test
  beforeEach(async () => {
    darkPool = await DarkPool.new();
  });

  it('should add a buy order to the dark pool', async () => {
    const orderId = 1;
    const buyer = accounts[1];
    const amount = web3.utils.toWei('10', 'ether');

    // Add a buy order to the dark pool
    await darkPool.addBuyOrder(orderId, { from: buyer, value: amount });

    // Get the buy order details
    const order = await darkPool.getBuyOrder(orderId);

    // Assert the order details
    assert.equal(order[0], buyer, 'Buyer address does not match');
    assert.equal(order[1].toString(), amount, 'Order amount does not match');
  });

  it('should add a sell order to the dark pool', async () => {
    const orderId = 1;
    const seller = accounts[1];
    const amount = web3.utils.toWei('10', 'ether');

    // Add a sell order to the dark pool
    await darkPool.addSellOrder(orderId, amount, { from: seller });

    // Get the sell order details
    const order = await darkPool.getSellOrder(orderId);

    // Assert the order details
    assert.equal(order[0], seller, 'Seller address does not match');
    assert.equal(order[1].toString(), amount, 'Order amount does not match');
  });


