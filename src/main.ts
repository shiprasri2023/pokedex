/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp, provide, h } from 'vue';

import { apolloClient } from './plugins/apollo';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { createApolloProvider } from '@vue/apollo-option';
// import { loadFonts } from './plugins/webfontloader';

// Create a provider
const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
});


// const app = createApp(App)

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
});


registerPlugins(app)

app.use(apolloProvider).mount('#app')
