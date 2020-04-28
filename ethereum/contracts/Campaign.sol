pragma solidity ^0.4.17;


contract CampaignFactory {
    address[] public deployedCampaign;

    function createcampaign(uint256 _minimum) public {
        address newCampaign = new Campaign(_minimum, msg.sender);
        deployedCampaign.push(newCampaign);
    }

    function getDeployedCampaign() public view returns (address[]) {
        return deployedCampaign;
    }
}


contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint256 public approversCount;

    modifier restricted() {
        require(msg.sender == manager, "Only A manage can create a request");
        _;
    }

    constructor(uint256 _minimumContribution, address creator) public {
        manager = creator;
        minimumContribution = _minimumContribution;
    }

    function contribute() public payable {
        require(
            msg.value > minimumContribution,
            "Minimum amount of money required"
        );

        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }

    function createRequest(
        string _description,
        uint256 _value,
        address _recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: _description,
            value: _value,
            recipient: _recipient,
            approvalCount: 0,
            complete: false
        });

        requests.push(newRequest);
    }

    function approveRequest(uint256 _index) public {
        Request storage request = requests[_index];
        // To check weather the person is a contributor
        require(approvers[msg.sender], "You are not a Contributor!");
        // To check weather the person is voting for the first time
        require(!request.approvals[msg.sender], "You have already voted!");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 _index) public restricted {
        Request storage request = requests[_index];

        require(
            request.approvalCount > (approversCount / 2),
            "Need minimum number of approvals to finalize!"
        );
        require(!request.complete, "Cannot finalize a completed request!");

        request.complete = true;
        request.recipient.transfer(request.value);
    }

    function getSummary()
        public
        view
        returns (uint256, uint256, uint256, uint256, address)
    {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestLength() public view returns (uint256) {
        return requests.length;
    }
}
