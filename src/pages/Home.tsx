import React from 'react';
import Translate from '../components/translate/Translate';
import Aside from '../components/aside/Aside';
import {
  useAppState, useSetShowDrawer, useSetPastSearch, useRemovePastSearch,
} from '../context/AppContext';
import { SavedItems } from '../context/types';

const Home = () => {
  const { showDrawer, searches } = useAppState();
  const drawerDispatch = useSetShowDrawer();
  const pastSearchesDispatch = useSetPastSearch();
  const removeSearchDispatch = useRemovePastSearch();

  const toggleDrawer = () => drawerDispatch(!showDrawer);

  const handleSaveSearch = (search: SavedItems) => pastSearchesDispatch([...searches, search]);
  const handleRemoveSearch = (date: string) => removeSearchDispatch(date);

  return (
    <>
      <Translate onSave={handleSaveSearch} onHistoryClick={toggleDrawer} />
      {showDrawer ? <Aside searches={searches} onCancel={toggleDrawer} onRemoveSearch={handleRemoveSearch} /> : null}
    </>
  );
};

export default Home;
