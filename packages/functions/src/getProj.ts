export async function main() {
  const testrailUsername = process.env.TESTRAIL_USERNAME;
  const testrailPassword = process.env.TESTRAIL_PASSWORD;
  const authorization = process.env.AUTHORIZATION;

  console.log(`Username: ${testrailUsername}`);
  console.log(`Password: ${testrailPassword}`);
  console.log(`Authorization: ${authorization}`);

  return {
    statusCode: 200,
    body: JSON.stringify("Okay!"),
  };
}
