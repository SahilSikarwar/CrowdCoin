import web3 from "./web3";

const compiledfactory = require("./build/CampaignFactory.json");

// This is just an instance campaignFactory available to other file
// we Hard coded is unlink our campaign file because there is only 1 factory and many campaigns

const instance = new web3.eth.Contract(
  JSON.parse(compiledfactory.interface),
  "0x1B9989bE2832d89a2554d752cFd08EECf30888df"
);

export default instance;
