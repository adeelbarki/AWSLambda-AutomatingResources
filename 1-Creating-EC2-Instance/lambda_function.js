// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

const IMAGE_ID = process.env.IMAGE_ID;
const INSTANCE_TYPE = process.env.INSTANCE_TYPE;
const KEY_NAME = process.env.KEY_NAME;
const SUBNET_ID = process.env.SUBNET_ID;

exports.handler = (event, context) => {
    // Load credentials and set region from JSON file
AWS.config.update({region: 'us-east-1'});


// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// AMI is amzn-ami-2011.09.1.x86_64-ebs
var instanceParams = {
   ImageId: IMAGE_ID, 
   InstanceType: INSTANCE_TYPE,
   KeyName: KEY_NAME,
   SubnetId: SUBNET_ID,
   MinCount: 1,
   MaxCount: 1
};

// Create a promise on an EC2 service object
var instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();

// Handle promise's fulfilled/rejected states
instancePromise.then(
  function(data) {
    console.log(data);
    var instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    // Add tags to the instance
    var tagParams = {Resources: [instanceId], Tags: [
       {
          Key: 'Name',
          Value: 'EC2 Instance'
       }
    ]};
    // Create a promise on an EC2 service object
    var tagPromise = new AWS.EC2({apiVersion: '2016-11-15'}).createTags(tagParams).promise();
    // Handle promise's fulfilled/rejected states
    tagPromise.then(
      function(data) {
        console.log("Instance tagged");
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
    
}
