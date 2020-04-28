import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

// show request pages that will show rows of all the requests available in the contract
class RequestRows extends Component {
  state = {
    loadingApprove: false,
    loadingFinalize: false,
    disable: false,
    errMessage: "",
  };
  //funciton: onApprove
  //@params: null
  // Call the approve function from the contract
  onApprove = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    this.setState({ disable: true, loadingApprove: true, errMessage: "" });
    try {
      await campaign.methods
        .approveRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
    this.setState({ disable: false, loadingApprove: false });

    Router.replaceRoute(`/campaign/${this.props.address}/requests`);
  };

  //funciton: onFinalize
  //@params: null
  // Call the finalize function from the contract
  onFinalize = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    this.setState({ disable: true, loadingFinalize: true, errMessage: "" });
    try {
      await campaign.methods
        .finalizeRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
    this.setState({ disable: false, loadingFinalize: false });

    Router.replaceRoute(`/campaign/${this.props.address}/requests`);
  };

  render() {
    // js syntax to destructure variables and objects.
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              loading={this.state.loadingApprove}
              disabled={this.state.disable}
              color="green"
              basic
              onClick={this.onApprove}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              loading={this.state.loadingFinalize}
              disabled={this.state.disable}
              color="teal"
              basic
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRows;
