import { Handler } from "aws-lambda";
import * as AWS from 'aws-sdk'

export const handler: Handler = async (event, context) => {
  // your function code goes here
//   const objectKeys = event.Records.map(
//     (record: { s3: { object: { key: any } } }) => record.s3.object.key
//   );
//   console.log(`Upload handler invoked for objects [${objectKeys.join(", ")}]`);

const sns = new AWS.SNS({ apiVersion: '2010-03-31' });
const message = 'Hi! Don\'t forget to write in your journal today.';
const topicArn = 'arn:aws:lambda:us-east-1:058264356180:function:amplify-d16q40xevlck1a-main-sayhellolambdaEFA46D92-B3enkgnJleif'; // Replace with your SNS topic ARN

const params = {
    Message: message,
    TopicArn: topicArn,
};

try {
    await sns.publish(params).promise();
    console.log('Notification sent successfully.');
} catch (error) {
    console.error('Error sending notification:', error);
}

return {
    statusCode: 200,
    body: 'Reminder sent!',
};
};
