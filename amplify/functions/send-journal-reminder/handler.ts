import { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  // your function code goes here
  const objectKeys = event.Records.map((record: { s3: { object: { key: any; }; }; }) => record.s3.object.key);
  console.log(`Upload handler invoked for objects [${objectKeys.join(', ')}]`);
};