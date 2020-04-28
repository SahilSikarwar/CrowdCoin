import React, { Component } from "react";
import Layouts from "../../components/Layouts";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCard() {
    const {
      balance,
      minimumContribution,
      requestsCount,
      approversCount,
      manager,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests and withdraw money",
        style: { overflowWrap: "break-word" },
        key: "1",
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution (Wei)",
        description: "You must contribute this much wei to become an approver",
        key: "2",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money form the contract. Request must be approved by the approvers",
        key: "3",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
        key: "4",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (Ether)",
        description:
          "A request tries to withdraw money form the contract. Request must be approved by the approvers",
        key: "5",
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layouts>
        <div>
          <h3>Component show!</h3>

          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>{this.renderCard()}</Grid.Column>
              <Grid.Column width={6}>
                <ContributeForm address={this.props.address} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Link route={`/campaign/${this.props.address}/requests`}>
                  <a>
                    <Button primary>View Requests</Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Layouts>
    );
  }
}

export default CampaignShow;
