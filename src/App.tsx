import './App.scss'
import AppFooter from '@shared/components/AppFooter'
import AppNavigationBar from '@components/AppNavigationBar'
import CircuitBackground from "@features/circuitryBackground";
import ProjectStatusList from '@features/projectsDashboard/components/ProjectStatusList'

function App() {
  return (
    <div className='app-container'>
      <CircuitBackground options={{
        blurPx: 2,
        opacity: 0.3,
        grid: 28,
        chips: 6,
        pulses: 80,
        speedMin: 14,
        speedMax: 28,
       }}
      />
      <AppNavigationBar />
      <div className="content-wrapper">
        <ProjectStatusList />
      </div>
      <AppFooter />
    </div>
  )
}

export default App
