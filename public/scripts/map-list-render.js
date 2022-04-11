// function takes 'maps' object and renders into html using 'create map element' function
const renderMap = function(tweets) {
  const numberOfTweets = tweets.length;
  const container = $('#tweets-container');
  container.empty();
  for (let i = 0; i < numberOfTweets; i++) {
    const $tweet = createTweetElement(tweets[i]);
    container.prepend($tweet);
  }
};


// FUNCTION TO TAKE SINGLE TWEET DATA AND RENDER INTO HTML AND THEN RETURN
const createTweetElement = function(tweet) {
  const tweetDateUnix = tweet.created_at;
  const $daysSinceTweet = timeago.format(tweetDateUnix);
  const $tweet = $(
    `<article>
          <header>
            <div class="userName">
            <img src="${escape(tweet.user.avatars)}">
            <a>${escape(tweet.user.name)}</a>
            </div>
            <div class="userHandle">
              <a>${escape(tweet.user.handle)}</a>
            </div>
          </header>
          <div class="tweet">
            <p>${escape(tweet.content.text)}</p>
          </div>
          <footer>
            <p>${escape($daysSinceTweet)}</p>
            <div class="retweetButtons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`
  );

  return $tweet;
};
