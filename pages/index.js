import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layouts";
import { Link } from "../routes";

class CampaignFactory extends Component {
  static async getInitialProps() {
    const campaign = await factory.methods.getDeployedCampaign().call();

    // return array of all deployed campaign recivied from the function call from solitity
    return { campaign };
  }

  renderCampaign() {
    // Mapping to whole campaing array and setting saperate to each item
    const items = this.props.campaign.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaign/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaign</h3>
          <Link route="/campaign/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="plus circle"
                primary
              />
            </a>
          </Link>
          {this.renderCampaign()}
        </div>
      </Layout>
    );
  }
}

export default CampaignFactory;
