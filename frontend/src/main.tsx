import { ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom/client'
import App from './App'
import { client } from './lib/apollo'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
