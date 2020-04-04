import { call, put, takeEvery/*, takeLatest*/ } from 'redux-saga/effects'
import Api from '../api'

// worker Saga : 将在 FETCH_TODOS action 被 dispatch 时调用
function* fetchTodos() {
  try {
    const todos = yield call(Api.fetchTodos);
    console.log(todos);
    yield put({ type: "FETCH_TODOS_SUCCEEDED", todos: todos });
  } catch (e) {
    yield put({ type: "FETCH_TODOS_FAILED", message: e.message });
  }
}

/*
  在每个 `FETCH_TODOS` action 被 dispatch 时调用 fetchTodos
  允许并发（译注：即同时处理多个相同的 action）
*/
function* mySaga() {
  yield takeEvery("FETCH_TODOS", fetchTodos);
}

/*
  也可以使用 takeLatest

  不允许并发，dispatch 一个 `FETCH_TODOS` action 时，
  如果在这之前已经有一个 `FETCH_TODOS` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
*/
// function* mySaga() {
//   yield takeLatest("FETCH_TODOS", fetchTodos);
// }

export default mySaga;