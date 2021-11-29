import React, { FC } from 'react';
import { SavedItems } from '../../context/types';

interface Searches {
    searches: SavedItems[];
}

const PastRecords: FC<Searches> = ({ searches }) => (
  <>
    {searches.map((search) => (
      <div key={search.date}>
        <h3>{search.date}</h3>
        <div className="column">
          <span>
            [
            {search.source.code}
            ]:
            {search.source.text}
          </span>
          <span>
            [
            {search.target.code}
            ]:
            {search.target.text}
          </span>
        </div>
        <div className="separator" />
      </div>
    ))}
  </>
);

export default PastRecords;
