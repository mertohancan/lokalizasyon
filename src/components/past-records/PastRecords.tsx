import React, { FC } from 'react';
import { SavedItems } from '../../context/types';

interface Searches {
    searches: SavedItems[];
    onRemove(date: string): void;
}

const PastRecords: FC<Searches> = ({ searches, onRemove }) => (
  <>
    {searches.map((search) => (
      <div key={search.date}>
        <div className="row">
          <h3>
            {search.date}
          </h3>
          <button type="button" onClick={() => onRemove(search.date)} className="simple-button">
            <b> (Click to remove)</b>
          </button>
        </div>
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
