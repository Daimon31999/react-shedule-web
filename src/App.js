import './App.css'
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/index'
import CalendarAdminPage from './pages/calendar-admin'
import TimeAdminPage from './pages/time-admin'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
// import dotenv from 'dotenv'

// dotenv.config()

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/calendar' component={CalendarAdminPage} />
        <Route path='/time' component={TimeAdminPage} />
      </Switch>
    </div>
  )
}

export default App
