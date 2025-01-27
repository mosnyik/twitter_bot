require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

// init the client
const client =
  //   new TwitterApi(process.env.BEARER_TOKEN);
  new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
  });

// listen for tweets for specified handle
async function listenForTweet(handle) {
  try {
    const user = await client.v2.userByUsername(handle);
    const userId = user.data.id;

    const ruleValue = `from ${handle} "1 USD ⇛ ₦"`;

    const rules = await client.v2.updateStreamRules({
      add: [{ value: ruleValue }],
    });

    const tweetStream = await client.v2.searchStream({
      expansions: "author_id",
    });

    for await (const { data } of tweetStream) {
      if (data.author_id === userId) {
        console.log(`New tweet from @${handle}: ${data.text}`);
      }
    }
  } catch (err) {
    console.log("Error occured:", err);
  }
}

// listenForTweet("mosnyik");
listenForTweet("naira_rates");
// console.log("Tweet monitoring...", client);
