## reducer

reducer — чистая функция которая будет отвечать за обновление состояния.
Здесь реализовывается логика в соответствие с которой будет происходить обновление полей store.

```
function reducer(state, action) {
    switch(action.type) {
        case ACTION_1: return { value: action.value_1 };
        case ACTION_2: return { value: action.value_2 };

        default: return state;
    }
}
```

## dispatch

Что бы обновить store необходимо вызвать метод dispatch().

## actionCreator

Создает событие

```
function action_1(value) {
    return {
        type: ACTION_1,
        value_1: value
    };
}

export default action_1;

// Вызов dispatch должен выглядить так
store.dispatch(action_1("Some value"));
```

## Actions

константы, описывающие событие

```
const ACTION_1 = "ACTION_1";

export default ACTION_1;
```

## getState

С помощью dispatch() обновили, а как теперь посмотреть новое значение store?
`store.getState()`

`store.getState().value_1`

## subscribe

А как же узнать, когда состояние обновилось? Для этого есть метод subscribe

`store.subscribe(() => console.info(store.getState()))`

Этот метод возвращает функцию `unsubscribe()`

## combineReducers

## initialState

initialState — объект, представляющий начальное состояние хранилища
Этот объект желательно создавать, даже в тех случаях, когда объявления начального состояния не требуется. Потому что этот объект помогает посмотреть на структуру хранилища и название его полей.
