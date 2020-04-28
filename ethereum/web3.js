import Web3 from "web3";

let web3;

// checking weather the browser have the metamask or not

//case: 1
// metamask is available
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are on the browser
  web3 = new Web3(window.web3.currentProvider);
} else {
  //case: 2
  // Metamask is unavailable
  // We are on the servcer or the use dont have meta mask
  const provider = new Web3.providers.HttpProvider(
    "Your infura rinkby testnetwork link"
  );
  web3 = new Web3(provider);
}

// made the local web3 instance available to other files
export default web3;
