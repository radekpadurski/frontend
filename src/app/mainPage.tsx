'use client';

import Login from './components/Login';
import { Provider } from 'react-redux';
import { store } from '../../store';

function MainPage() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}
export default MainPage;
