import { all } from "redux-saga/effects";
import userSaga, { userPrincipalSaga, userSagaAdd, userSagaDelete, userSagaDeleteBatch, userSagaFetchUserInfo, userSagaFetchUserRoles, userSagaPass, userSagaUpdate } from "./userSaga";
import { sessionSaga } from "./sessionSaga";

export default function* rootSaga() {
    yield all([
        userSaga(),
		userSagaFetchUserInfo(),
		userSagaFetchUserRoles(),
		userSagaAdd(),
		userSagaUpdate(),
		userSagaDeleteBatch(),
		userSagaDelete(), 
		userSagaPass(),
		userPrincipalSaga(),

        sessionSaga(),


    ]);

}