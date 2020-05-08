import { put, delay, call } from 'redux-saga/effects'
import axios from 'axios'
import * as actions from '../actions/index'

export function* logoutSaga(action){
    yield call([localStorage, 'removeItem'],"token") //call is testable
    yield call([localStorage, 'removeItem'],"expirationDate") //call is testable
    yield call([localStorage, 'removeItem'],"userId")
    //yield localStorage.removeItem('userId')
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export function* authUserSaga(action){
    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADqEFZuNSSkk_Ir_jUQvU80ZyUKwJ7Kaw'
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADqEFZuNSSkk_Ir_jUQvU80ZyUKwJ7Kaw'
    }
    
    try {
        const response = yield axios.post(url, authData)  
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    
    } catch (err){
        yield put(actions.authFail(err.response.data.error))
    }
}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token')
    if (!token){
        yield put(actions.logout())
    }else{
        const expirationDate = yield new Date (localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()){
            yield put(actions.logout())
        }else{
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        }
    }
}