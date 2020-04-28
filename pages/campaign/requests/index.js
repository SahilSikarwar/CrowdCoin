import React, { Component } from "react";
import Layouts from "../../../components/Layouts";
import RequestRows from "../../../components/RequestRows";
import { Link } from "../../../routes";
import { Button, Table } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
// import web3 from "../../../ethereum/web3";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestLength().call();
    const approversCount = await campaign.methods.approversCount().call();
    // const accounts = await web3.eth.getAccounts();
    // const manager = await campaign.methods.manager().call();
    // const user = accounts[0] == manager;

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, approversCount, requestCount, user };
  }

  renderRows = () => {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRows
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  };

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layouts>
        <h3>Requests</h3>
        <Link route={`/campaign/${this.props.address}`}>
          <a>
            <Button floated="right" secondary>
              Back
            </Button>
          </a>
        </Link>
        <Link route={`/campaign/${this.props.address}/requests/new`}>
          <a>
            <Button floated="right" style={{ marginBottom: 10 }} primary>
              Add Request
            </Button>
          </a>
        </Link>

        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests</div>
      </Layouts>
    );
  }
}

export default RequestIndex;
