const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const bindActionCreators = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const RESTOCK_CAKE = "RESTOCK_CAKE";

const BUY_ICECREAM = "BUY_ICECREAM";
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM";

function buyCake(numberOfCakes = 1){
    return {
        type: BUY_CAKE,
        payload: numberOfCakes
    }
}

function restockCake(numberOfCakes = 1){
    return {
        type: RESTOCK_CAKE,
        payload: numberOfCakes
    }
}

function buyIceCream(numberOfIceCreams = 1){
    return {
        type: BUY_ICECREAM,
        payload: numberOfIceCreams
    }
}

function restockIceCream(numberOfIceCreams = 1){
    return {
        type: RESTOCK_ICECREAM,
        payload: numberOfIceCreams
    }
}

const cakeInitialState = {
    numOfCakes: 10
}

const iceCreamInitialState = {
    numOfIceCreams: 20
}


const cakeReducer = (state = cakeInitialState, action:any) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - action.payload
        }
        case RESTOCK_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes + action.payload
        }
        default: return state
    }
}

const iceCreamReducer = (state = iceCreamInitialState, action:any) => {
    switch(action.type){
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - action.payload
        }
        case RESTOCK_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams + action.payload
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial State", store.getState());


const unsubscribe = store.subscribe(() => {

    // console.log(
    //     "Updated State:",
    //     store.getState()
    // );

});

// store.dispatch(buyCake(3));
// store.dispatch(buyIceCream(2));
// store.dispatch(restockCake(5));
// store.dispatch(restockIceCream(10));

const actions = bindActionCreators(
    { buyCake, restockCake, buyIceCream, restockIceCream },
    store.dispatch
);

actions.buyCake(3);
// actions.buyIceCream(2);
// actions.restockCake(5);
// actions.restockIceCream(10);

unsubscribe();