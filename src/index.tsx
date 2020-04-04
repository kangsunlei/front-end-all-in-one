import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, Action, MiddlewareAPI } from 'redux';
import createSagaMiddleware from 'redux-saga'
import TodoList from './components/TodoList';
import DragTest from './components/DragTest';
import todos from './model/reducer/todos';
import todosSaga from './model/sagas/todos';

import './style/index.scss';

const rootReducer = combineReducers({
    todos
});

function logger({ getState }: MiddlewareAPI) {
    return (next: Function) => (action: Action) => {
        console.log('will dispatch', action)

        // 调用 middleware 链中下一个 middleware 的 dispatch。
        let returnValue = next(action)

        console.log('state after dispatch', getState())

        // 一般会是 action 本身，除非
        // 后面的 middleware 修改了它。
        return returnValue
    }
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

// then run the saga
sagaMiddleware.run(todosSaga);

ReactDOM.render(<Provider store={store}>
    <Router>
        <Switch>
            <Redirect exact from='/' to='/todo' />
            <Route path='/todo' component={TodoList} />
            <Route path='/drag' component={DragTest} />
        </Switch>
    </Router>
</Provider>, document.getElementById('app'));