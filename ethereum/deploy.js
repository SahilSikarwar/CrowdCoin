const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

// construction of HDWalletProvider to create or saperate provider for contract deployment
// this wallet contain information about our account .

// function: HDWalletProvider
// @params:
//  1) 12 words mnemonics
//  2) infura link --> that is a reference to a local blockchain node
const provider = new HDWalletProvider(
  "12 word mnemonic",
  "Your infura link to rinkby test network"
);

// Setting provide
const web3 = new Web3(provider);

const deploy = async () => {
  accounts = await web3.eth.getAccounts();
  console.log("Attempting to login in from account", accounts[0]);

  // Use one of the accounts to deploy the contract
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("Contract deployed to", result.options.address);
};
deploy();

// Deployed contract address : 0x3ACF1aC299c36297Ce82Ab78c119562eaCC11Cf1
