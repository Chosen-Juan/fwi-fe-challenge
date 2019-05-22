import React from 'react';

const TableHeader = () => (
  <thead className="table-head">
    <tr>
      <th />
      <th>
        Player
      </th>
      <th>
        Winnings
      </th>
      <th>
        Native of
      </th>
      <th className="is-hidden-mobile">
        Controls
      </th>
    </tr>
  </thead>
);

export default TableHeader;
