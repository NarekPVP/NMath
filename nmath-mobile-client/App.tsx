import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppTabs from './src/navigation/AppTabs'
import { DarkThemeProvider } from './src/providers/DarkThemeContext'
import { SettingsProvider } from './src/providers/SettingsContext'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <SettingsProvider>
            <DarkThemeProvider>
              <AppTabs />
            </DarkThemeProvider>
          </SettingsProvider>
        </SafeAreaProvider>
      </Provider>
      <StatusBar style="auto" />
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
