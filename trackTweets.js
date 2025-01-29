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
    console.log("tweetList:", tweetList);
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

let twet = [
  {
    id: "1884557149910577391",
    edit_history_tweet_ids: ["1884557149910577391"],
    text:
      "Avg. | Wed 29 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "🪙 1 ETH ⇛ ₦5,310,258.388\n" +
      "🪙 1 BTC ⇛ ₦171,140,832.180\n" +
      "🪙 1 SOL ⇛ ₦366,602.497\n" +
      "🪙 1 USDT ⇛ ₦1,700.944\n" +
      "🪙 1 USDC ⇛ ₦1,700.102\n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/EKHjKysg0a",
  },
  {
    id: "1884557121733148706",
    edit_history_tweet_ids: ["1884557121733148706"],
    text:
      "Wed 29 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "💵 1 USD ⇛ ₦1,620.178\n" +
      "💷 1 GBP ⇛ ₦1,977.079\n" +
      "💶 1 EUR ⇛ ₦1,658.624\n" +
      "💶 1 CAD ⇛ ₦1,115.790\n" +
      "v1.3.1 \n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/nEUO1btH6I",
  },
  {
    id: "1884194748182716691",
    edit_history_tweet_ids: ["1884194748182716691"],
    text:
      "Avg. | Tue 28 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "🪙 1 ETH ⇛ ₦5,416,370.317\n" +
      "🪙 1 BTC ⇛ ₦171,231,170.857\n" +
      "🪙 1 SOL ⇛ ₦375,103.574\n" +
      "🪙 1 USDT ⇛ ₦1,706.251\n" +
      "🪙 1 USDC ⇛ ₦1,705.058\n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/EKHjKysg0a",
  },
  {
    id: "1884194733779501262",
    edit_history_tweet_ids: ["1884194733779501262"],
    text:
      "Tue 28 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "💵 1 USD ⇛ ₦1,627.171\n" +
      "💷 1 GBP ⇛ ₦1,986.862\n" +
      "💶 1 EUR ⇛ ₦1,671.442\n" +
      "💶 1 CAD ⇛ ₦1,119.790\n" +
      "v1.3.1 \n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/nEUO1btH6I",
  },
  {
    id: "1883832392651001856",
    edit_history_tweet_ids: ["1883832392651001856"],
    text:
      "Avg. | Mon 27 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "🪙 1 ETH ⇛ ₦5,210,872.462\n" +
      "🪙 1 BTC ⇛ ₦164,239,846.358\n" +
      "🪙 1 SOL ⇛ ₦353,107.478\n" +
      "🪙 1 USDT ⇛ ₦1,692.583\n" +
      "🪙 1 USDC ⇛ ₦1,692.109\n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/EKHjKysg0a",
  },
  {
    id: "1883832354579374282",
    edit_history_tweet_ids: ["1883832354579374282"],
    text:
      "Mon 27 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "💵 1 USD ⇛ ₦1,627.171\n" +
      "💷 1 GBP ⇛ ₦1,979.291\n" +
      "💶 1 EUR ⇛ ₦1,670.094\n" +
      "💶 1 CAD ⇛ ₦1,124.240\n" +
      "v1.3.1 \n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/nEUO1btH6I",
  },
  {
    id: "1883469979250479398",
    edit_history_tweet_ids: ["1883469979250479398"],
    text:
      "Avg. | Sun 26 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "🪙 1 ETH ⇛ ₦5,633,587.036\n" +
      "🪙 1 BTC ⇛ ₦175,504,953.162\n" +
      "🪙 1 SOL ⇛ ₦403,708.210\n" +
      "🪙 1 USDT ⇛ ₦1,708.920\n" +
      "🪙 1 USDC ⇛ ₦1,708.757\n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/EKHjKysg0a",
  },
  {
    id: "1883469966181027939",
    edit_history_tweet_ids: ["1883469966181027939"],
    text:
      "Sun 26 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "💵 1 USD ⇛ ₦1,636.348\n" +
      "💷 1 GBP ⇛ ₦1,992.304\n" +
      "💶 1 EUR ⇛ ₦1,681.662\n" +
      "💶 1 CAD ⇛ ₦1,134.100\n" +
      "v1.3.1 \n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/nEUO1btH6I",
  },
  {
    id: "1883107602210447473",
    edit_history_tweet_ids: ["1883107602210447473"],
    text:
      "Avg. | Sat 25 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "🪙 1 ETH ⇛ ₦5,625,124.665\n" +
      "🪙 1 BTC ⇛ ₦175,616,116.796\n" +
      "🪙 1 SOL ⇛ ₦396,266.102\n" +
      "🪙 1 USDT ⇛ ₦1,706.956\n" +
      "🪙 1 USDC ⇛ ₦1,706.649\n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/EKHjKysg0a",
  },
  {
    id: "1883107581045969194",
    edit_history_tweet_ids: ["1883107581045969194"],
    text:
      "Sat 25 Jan, 2025 • 11:00 AM\n" +
      "\n" +
      "💵 1 USD ⇛ ₦1,636.348\n" +
      "💷 1 GBP ⇛ ₦1,992.304\n" +
      "💶 1 EUR ⇛ ₦1,681.662\n" +
      "💶 1 CAD ⇛ ₦1,134.100\n" +
      "v1.3.1 \n" +
      "\n" +
      "Get Business and Individual USD, CAD, USDC, USDT accounts and convert to Naira at https://t.co/nEUO1btH6I",
  },
];

console.log(extractUsdRate(twet));

// listenForTweet("mosnyik");
// checkTweetFroString("naira_rates").then((result) => {
//   console.log('dollar is: ',result);
// });

// console.log(checkTweetFroString("naira_rates"));
