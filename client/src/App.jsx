import React, { Fragment } from 'react';

import Header from './Header/Header';
import PlayerTable from './PlayerTable/PlayerTable';
import Pages from './Pages/Pages';

const App = () => {
  return (
    <Fragment>
      <Header />
      <PlayerTable />
      <Pages />
    </Fragment>
  );
};

export default App;
