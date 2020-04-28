const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

// path construction for accessing files and folders
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

// Read the content of the contract file
const source = fs.readFileSync(campaignPath, "utf8");

// Solidity compiling process
const output = solc.compile(source, 1).contracts;

// make a folder
// named: build
fs.ensureDirSync(buildPath);

// create a seperate JSON file for each contract
// containing 1) instance of the contract (The ABI) and the bytecode
// further used for deployment of contract
for (let contract in output) {
  // function: outputJSONSync
  // write out json files in a perticular folder
  // @params:
  //  1) file path where you want to write
  //  2) the content you want to write
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
