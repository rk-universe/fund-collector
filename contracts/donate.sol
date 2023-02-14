//SPDX-License-Identifier:Unlicense

pragma solidity >0.7.0 <=0.9.0;

contract CampaigFactory{

    address[] public diployedcampaigns;

    event createdCampaign(
        string title,
        uint requreAmount,
        address indexed owner,
        address campaignaddress,
        string  imageurl,
        uint indexed timestamp,
        string indexed catogary
        
    );

    function createcampaign(
        string memory campaignTitle,
        uint campaignRequiredAmount,
        string memory imageUrl,
        string memory storyUrl,
        string memory category
    ) public{
        Campaign newcampaign = new Campaign(
            campaignTitle,
            campaignRequiredAmount,
            imageUrl,
            storyUrl,
            msg.sender
            );

            diployedcampaigns.push(address(newcampaign));

            emit createdCampaign(
                campaignTitle,
                campaignRequiredAmount,
                msg.sender,
                address(newcampaign),
                imageUrl,
                block.timestamp,
                category

            );

            
    }
        
        
}



contract Campaign{
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public  owner;
    uint public receivedAmount;

    event doneted(address indexed donar,uint indexed value,uint indexed timestamp);

    constructor(
        string memory cam_titile,
        uint cam_requiredAmount,
        string memory cam_image,
        string memory cam_story,
        address campaignOwner
        )
        {
            title = cam_titile;
            requiredAmount = cam_requiredAmount;
            image = cam_image;
            story = cam_story;
            owner = payable(campaignOwner);
        }

        function donate() payable public {
            require(requiredAmount > receivedAmount,"campaign required amount fullfill");
            owner.transfer(msg.value);
            receivedAmount+= msg.value;
            emit doneted(msg.sender,msg.value,block.timestamp);
        }

}