# react-graphql

i used vite package

run `npm install`
then `npm run dev`

#decisions
i used ApolloClient Provider to serve the GraphQL api `https://api.spacex.land/graphql/` then i retrieved the query and listed them using the timestamp from the query
the query was implemented from the library `gql from @apollo/client`. i created a search filter to filter queried result & display the data has a list. 

i built a filter component and search component with a searchFilter function to pass in data and render the display on the listing page. i used spaceX API.

demo link `https://j-api-spacex.netlify.app/`
