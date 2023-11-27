import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { APP_MAIN_COLOR_HEX } from '../../../types/Consts'
import MathView from '../../../components/MathView'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useDarkTheme } from '../../../hooks/useDarkTheme'
import { getTextColor } from '../../../utils'

interface IHistoryItemProps {
  text: string
  onPress: () => void
  onDelete?: () => void
}

const HistoryItem: React.FC<IHistoryItemProps> = ({
  text,
  onPress,
  onDelete,
}) => {
  const { isDarkTheme } = useDarkTheme()

  const renderRightActions = (_: any, dragX: any) => {
    return (
      <TouchableOpacity onPress={onDelete}>
        <View style={styles.deleteContainer}>
          <Text
            style={[styles.deleteText, { color: getTextColor(isDarkTheme) }]}
          >
            Delete
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>
          <MathView
            equation={'f(x) = ' + text}
            color={getTextColor(isDarkTheme)}
          />
        </Text>
      </TouchableOpacity>
    </Swipeable>
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
    borderColor: 'gray',
    borderRadius: 12,
    marginTop: 12,
    borderLeftColor: APP_MAIN_COLOR_HEX,
    borderLeftWidth: 4,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    fontStyle: 'normal',
    marginLeft: 10,
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    fontWeight: 'bold',
  },
})

export default HistoryItem
