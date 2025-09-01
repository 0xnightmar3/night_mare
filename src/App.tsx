import './App.scss'
import AppNavigationBar from '@components/AppNavigationBar'
import ProjectStatusList from './features/projectsDashboard/components/ProjectStatusList/ProjectStatusList'

function App() {
  return (
    <div className='app-container'>
      <AppNavigationBar />
      <ProjectStatusList />
    </div>
  )
}

export default App
