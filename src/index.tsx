import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TodoList from './components/TodoList';
import DragTest from './components/DragTest';
import todos from './reducers/todos';

import './style/index.scss';

const store = createStore(todos, []);

ReactDOM.render(<Provider store={store}>
    <Router>
        <Switch>
            <Redirect exact from='/' to='/todo' />
            <Route path='/todo'>
                <TodoList/>
            </Route>
            <Route path='/drag'>
                <DragTest/>
            </Route>
        </Switch>
    </Router>
</Provider>, document.getElementById('app'));