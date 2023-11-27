import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDarkTheme } from '../../hooks/useDarkTheme'
import { getTextColor } from '../../utils'

interface ISectionItemProps {
  text: string
  onPress: () => void
}

const SectionItem: React.FC<ISectionItemProps> = ({ text, onPress }) => {
  const { isDarkTheme } = useDarkTheme()

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.text, { color: getTextColor(isDarkTheme) }]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 12,
    marginTop: 12,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 21,
  },
})

export default SectionItem
