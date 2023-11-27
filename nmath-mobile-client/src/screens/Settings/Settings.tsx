import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SettingsNavProps } from '../../navigation/SettingsStack/settingsStack.types'
import { Switch } from 'react-native-paper'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import NumericInput from 'react-native-numeric-input'
import { getBackgroundColor, getTextColor } from '../../utils'
import { useSettings } from '../../hooks/useSettings'

const Settings = ({ navigation }: SettingsNavProps<'Settings'>) => {
  const { isDarkTheme, toggleDarkTheme } = useDarkTheme()
  const { grid, domainX, domainY, updateSettings } = useSettings()

  return (
    <View
      style={{
        backgroundColor: getBackgroundColor(isDarkTheme),
      }}
    >
      <View style={styles.optionContainer}>
        <Text style={[styles.text, { color: getTextColor(isDarkTheme) }]}>
          Dark mode
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={() => toggleDarkTheme()}
          color="#0B6622"
        />
      </View>
      <View style={styles.optionContainer}>
        <Text style={[styles.text, { color: getTextColor(isDarkTheme) }]}>
          Grid
        </Text>
        <Switch
          value={grid}
          onValueChange={() => updateSettings('toggleGrid', !grid)}
          color="#0B6622"
        />
      </View>
      <View style={styles.optionContainer}>
        <Text
          style={[
            styles.text,
            { marginTop: 12, color: getTextColor(isDarkTheme) },
          ]}
        >
          Min Value
        </Text>
        <NumericInput
          inputStyle={{
            backgroundColor: getBackgroundColor(isDarkTheme),
          }}
          rightButtonBackgroundColor={getBackgroundColor(isDarkTheme)}
          leftButtonBackgroundColor={getBackgroundColor(isDarkTheme)}
          borderColor={getBackgroundColor(isDarkTheme)}
          textColor={getTextColor(isDarkTheme)}
          iconStyle={{
            // @ts-ignore
            color: getTextColor(isDarkTheme),
          }}
          value={domainX}
          onChange={(value) => updateSettings('updateDomainX', value)}
        />
      </View>

      <View style={styles.optionContainer}>
        <Text
          style={[
            styles.text,
            { marginTop: 12, color: getTextColor(isDarkTheme) },
          ]}
        >
          Max Value
        </Text>
        <NumericInput
          inputStyle={{
            backgroundColor: getBackgroundColor(isDarkTheme),
          }}
          rightButtonBackgroundColor={getBackgroundColor(isDarkTheme)}
          leftButtonBackgroundColor={getBackgroundColor(isDarkTheme)}
          borderColor={getBackgroundColor(isDarkTheme)}
          textColor={getTextColor(isDarkTheme)}
          iconStyle={{
            // @ts-ignore
            color: getTextColor(isDarkTheme),
          }}
          value={domainY}
          onChange={(value) => updateSettings('updateDomainY', value)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  optionContainer: {
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numericContainer: {
    alignItems: 'center',
    marginTop: 22,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Settings
