import aa from 'search-insights';

//Initialize seach-insights
aa('init', {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY, 
  userToken: process.env.ALGOLIA_USER_TOKEN,
  useCookie: true
});

export default aa;
