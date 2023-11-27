import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator color="#007FFF" size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
