import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import todos from './reducers/todos';

import './style/index.scss';

const store = createStore(todos, []);

ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('app'));