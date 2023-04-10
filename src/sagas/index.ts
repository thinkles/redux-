import {
  all,
  fork,
  put,
  takeEvery,
  call,
  take,
  takeLatest,
  actionChannel
} from "redux-saga/effects";
import { channel } from "redux-saga";

export const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(() => console.log("111"), ms);
  });

const handleSaga = (ms: number) => {
  return new Promise((reslove) => {
    setTimeout(() => {
      console.log("111");
      reslove(1);
    }, ms);
  });
};
/** chanel */
// export function* helloSaga() {
//   const requestChan = yield actionChannel("REQUEST");
//   // const requestChan = yield actionChannel('REQUEST', buffers.sliding(5))

//   while (true) {
//     // const { payload } = yield take("REQUEST");
//     const { payload } = yield take(requestChan);
//     yield call(handleSaga, payload);
//     // yield fork(handleSaga, payload);
//   }
// }

function fetchProductsApi() {
  return new Promise((reslove, reject) => {
    // reslove(1);
    reject("name is wrong");
  })
    .then((response) => ({
      response
    }))
    .catch((error) => ({ error }));
}

export function* incrementAsync(action: any) {
  console.log("action==>", action);
  // yield delay(1000);
  const { response, error } = yield call(fetchProductsApi);
  console.log("***", response, error);

  yield put({ type: "INCREMENT" });
}

export function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// function* handleRequest(chan) {
//   while (true) {
//     const payload = yield take(chan);
//     // process the request
//     handleSaga(2000);
//   }
// }

// function* watchRequests() {
//   // create a channel to queue incoming requests
//   const chan = yield call(channel);

//   // create 3 worker 'threads'
//   for (var i = 0; i < 3; i++) {
//     yield fork(handleRequest, chan);
//   }

//   while (true) {
//     const { payload } = yield take("REQUEST1");
//     yield put(chan, payload);
//   }
// }

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  // watchRequests()
  yield all([watchIncrementAsync()]);
}
