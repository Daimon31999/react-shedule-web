import { createStore } from 'redux'

// чистая функция которая будет отвечать за обновление состояния
// Здесь реализовывается логика в соответствие с которой будет происходить обновление полей store.
const store = createStore(reducer)

export default store
