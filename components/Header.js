import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

// Simple header Component to get a header above
export default () => {
  return (
    <Menu style={{ marginTop: "1%" }}>
      {/* Link tags to redriect pages by button click */}
      <Link route="/">
        <a className="item">CrowdCoin</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaign/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
