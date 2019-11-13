# Create an EC2 Key Pair

1. Open the Amazon EC2 console at https://console.aws.amazon.com/ec2/.
2. In the navigation pane, under NETWORK & SECURITY, choose Key Pairs.
3. Choose Create Key Pair.
4. Enter a name for the new key pair in the Key pair name field of the Create Key Pair dialog box, and then choose Create.
5. The private key file is automatically downloaded by your browser. The base file name is the name you specified as the name of your key pair, and the file name extension is .pem. Save the private key file in a safe place. 

# Create a Lambda Function

1. Navigate to Lambda.
2. Click Create a function.
3. Choose Author from scratch and use the following settings:
    * Name: CreateEC2Instance
    * Runtime: Node.js 10.x (for python users - Python 3.7) 
    * Role: Create a custom role
4. Expand Choose or create an execution role.
5. Set Execution role to Create a new role with basic Lambda permissions.
6. Copy the execution role name that appears.
7. Click Create function.
8. Navigate to IAM.
9. Search for and select your newly created role.
10. Edit the policy to replace its existing policy with the file provided in this folder(lambda_function_role.json).
11. Back in the Lambda console, scroll to the Function code section and paste in the Python source code from this file on GitHub.
12. Set four environment variables:
    * AMI: The ami- value of an Amazon Linux 2 instance
    * INSTANCE_TYPE: t2.micro
    * KEY_NAME: The name of your EC2 key pair
    * SUBNET_ID: The ID of one of the public subnets in your default VPC
13. Save the Lambda function.

# Test Lambda Function

1. Click Test. (Make sure to increase timeout info to 1 min 3 sec in Basic settings in order to give enough time for a function to execute)
2. Define an empty test event. Its contents can simply be {}.
3. Give it any name you like.
4. Click Create.
5. Click Test again for a second test.
6. Observe that an EC2 instance is initializing.

# Connect to the Newly Created EC2 Instance via SSH

In order to SSH, security group must be configured to allow traffic through port 22.
From the command line, using the .pem file you downloaded earlier, connect via the public IP of the EC2 instance.

For example:

`ssh -i mykeypair.pem ec2-user@<IP ADDRESS>`
Remember to replace <IP ADDRESS> with the public IP or public DNS of the EC2 instance you created.
