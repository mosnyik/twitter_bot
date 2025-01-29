require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

// init the client
const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});
// new TwitterApi(process.env.BEARER_TOKEN);

async function checkTweetFroString(handle) {
  try {
    const user = await client.v2.userByUsername(handle);
    const userId = user.data.id;
    console.log("UserId", userId);
    const tweets = await client.v2.userTimeline(userId, { max_results: 10 });

    if (
      !Array.isArray(tweets.data["data"]) ||
      tweets.data["data"].length === 0
    ) {
      console.log("No tweets ");
      return null;
    }
    const tweetList = tweets.data["data"];
    return extractUsdRate(tweetList);
  } catch (err) {
    console.log("Error occured:", err);
  }
}
function extractUsdRate(tweet) {
  let dollarTweets = tweet.map((twit) => twit.text.match(/💵 1 USD ⇛ ₦/));
  const dollar = dollarTweets[1].input.split(" ");
  let usdToNaira = "";
  for (let i = 0; i < dollar.length; i++) {
    if (dollar[i] === "USD") {
      usdToNaira = dollar[i + 2];
    }
  }
  return usdToNaira.replace(/[₦💷]/g, "").trim();
}

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

checkTweetFroString("naira_rates").then((result) => {
  if (result) {
    console.log("dollar is: ", result);
  } else {
    console.log("No USD rate found.");
  }
});

setInterval(() => {
  checkTweetFroString("naira_rates").then((result) => {
    if (result) {
      console.log("dollar is: ", result);
    } else {
      console("No USD rate found");
    }
  });
}, 20 * 60 * 1000);

// console.log(checkTweetFroString("naira_rates"));
