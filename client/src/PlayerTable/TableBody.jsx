import React from 'react';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';

import Avatar from '../Avatar';
import { COUNTRIES } from '../constants';

const TableBody = ({ players }) => {
  return (
    <tbody className="table--body">
      {players.map(({ id, name, country, winnings, imageUrl }) => (
        <tr key={id} role="row" className="table__row">
          <td>
            <Avatar src={imageUrl} />
          </td>
          <td className="centered-text">
            {name}
          </td>
          <td className="centered-text">
            {winnings.toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}
          </td>
          <td>
            <div className="country">
              <Avatar>
                <Flags code={country} alt="" />
              </Avatar>
              {country}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBody;
