import React from 'react';
import Translate from '../components/translate/Translate';
import Aside from '../components/aside/Aside';
import { useAppState, useSetShowDrawer, useSetPastSearch } from '../context/AppContext';
import { SavedItems } from '../context/types';

const Home = () => {
  const { showDrawer, searches } = useAppState();
  const drawerDispatch = useSetShowDrawer();
  const pastSearchesDispatch = useSetPastSearch();

  const toggleDrawer = () => drawerDispatch(!showDrawer);

  const handleSaveSearch = (search: SavedItems) => pastSearchesDispatch([...searches, search]);

  return (
    <>
      <Translate onSave={handleSaveSearch} onHistoryClick={toggleDrawer} />
      {showDrawer ? <Aside searches={searches} onCancel={toggleDrawer} /> : null}
    </>
  );
};

export default Home;
