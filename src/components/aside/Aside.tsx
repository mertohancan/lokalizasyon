import React, { FC } from 'react';
import './Aside.scss';

import { CancelIcon } from '../../assets/icons';
import PastRecords from '../past-records/PastRecords';
import { SavedItems } from '../../context/types';

interface AsideProps {
    onCancel(): void;
    onRemoveSearch(date: string): void;
    searches?: SavedItems[];
}

const Aside: FC<AsideProps> = ({ onCancel, onRemoveSearch, searches }) => (
  <aside className="aside-container">
    <button className="aside-cancel simple-button" type="button" onClick={onCancel}>
      <img src={CancelIcon} width={32} height={32} alt="cancel" />
    </button>
    <div className="aside-content">
      {searches?.length ? <PastRecords onRemove={onRemoveSearch} searches={searches} /> : <span>There is no history search.</span>}
    </div>
  </aside>
);

export default Aside;
