import web3 from "./web3";
import campaign from "./build/Campaign.json";

//function: () =>
// @params: address of a contract
// return: the instance of the deployed contract to access its functionalities
export default (address) => {
  return new web3.eth.Contract(JSON.parse(campaign.interface), address);
};
