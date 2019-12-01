import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import Main from './containers/Main/Main'

function App() {
  return (
      <Layout>
          {/*here we will add routing*/}
          <Main />
      </Layout>
  );
}

export default App;
