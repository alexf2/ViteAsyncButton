import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useLoadButton } from './useLoadButton'
import { useLoadData } from './useLoadData'
import './App.css'


export const App = function() {
  const {loading, stopping, title, handleClick, error, data, handleFinish} = useLoadButton()
  useLoadData(handleFinish, stopping, loading)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick} disabled={stopping}>{title}</button>
        <p>
          {loading && !stopping && <>Идёт загрузка данных...</>}
          {stopping && <>Идёт отмена...</>}
          {data && <>{data}</>}
          {error && <span className="error">{String(error)}</span>}
        </p>
      </div>
    </>
  )
}
