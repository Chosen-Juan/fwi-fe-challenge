import React from 'react';
import Sort from './Sort/Sort';

const TableHeader = () => (
  <thead className="table-head">
    <tr>
      <th />
      <th>
        Player
        <Sort playerKey="name" />
      </th>
      <th>
        Winnings
        <Sort playerKey="winnings" />
      </th>
      <th>
        Native of
        <Sort playerKey="country" />
      </th>
      <th className="is-hidden-mobile">Controls</th>
    </tr>
  </thead>
);

export default TableHeader;
