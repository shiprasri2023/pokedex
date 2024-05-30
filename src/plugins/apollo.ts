import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core"
import { onError } from "@apollo/client/link/error"
import { logErrorMessages } from "@vue/apollo-util"
import { POKEAPI_GRAPHQL_ENDPOINT } from './../constants/urlsConstants';

function getHeaders() {
    
    //Commented the autorization code as we dont have JWT token

    // const headers = {}
    // const token = window.localStorage.getItem("apollo-token")
    // if (token) {
    //     headers["Authorization"] = `Bearer ${token}`
    // }
    const headers = {
        'content-type': 'application/json',
    };
    return headers
}

// Create an http link:
const httpLink = new HttpLink({
    uri: POKEAPI_GRAPHQL_ENDPOINT,
    fetch: (uri: RequestInfo, options: RequestInit) => {
        options.headers = getHeaders()
        return fetch(uri, options)
    },
})

const errorLink = onError((error) => {
    if (process.env.NODE_ENV !== "production") {
        logErrorMessages(error)
    }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
})