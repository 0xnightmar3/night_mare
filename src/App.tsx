import './App.scss'
import AppButton from './shared/components/AppButton/AppButton'
import { ButtonType } from './shared/components/AppButton/types'

function App() {
  return (
    <div className='app-container'>
      <img className='nightmare_logo' src="nightmare_logo_v2.png" alt="logo" />

      <h1>Welcome to the NightMare!</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas consectetur nesciunt earum quidem sapiente libero architecto dolorum commodi, error nulla quod doloribus quasi vero! Earum consectetur cum repudiandae facilis neque.</p>

      <AppButton style={ButtonType.dark} text='Install' />
    </div>
  )
}

export default App
