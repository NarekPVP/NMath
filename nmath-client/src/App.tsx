import './App.css'
import 'primeicons/primeicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './i18n'
import { Route, Routes } from 'react-router-dom'
import Header from './layouts/Header'
import Main from './pages/Main'
import ResearchInfo from './pages/ResearchInfo'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function App() {
  const { i18n } = useTranslation()
  const [darkMode] = useLocalStorage<boolean>('theme')
  const [_, saveLanguage] = useLocalStorage<string>('lang')

  useEffect(() => {
    saveLanguage(i18n.language)
  }, [i18n.language])

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = '#000000'
    } else {
      document.body.style.backgroundColor = '#ffffff'
    }
  }, [darkMode])

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Main />} />
          <Route path="/research/:equation" element={<ResearchInfo />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </Provider>
  )
}

export default App
