import './App.scss'
import AppNavigationBar from './navigationBar/components/AppNavigationBar'
import ProjectStatusList from './projectsDashboard/components/ProjectStatusList/ProjectStatusList'

function App() {
  return (
    <div className='app-container'>
      <AppNavigationBar />
      <ProjectStatusList />
    </div>
  )
}

export default App
