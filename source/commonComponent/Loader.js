import React from "react"
import {View,ActivityIndicator,StyleSheet} from "react-native"
import Modal from 'react-native-modal'
const Loader = ({loading}) => {
    return(
        <Modal
        hasBackdrop={false}
        isVisible={loading}
        style={{
          margin: 0
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color="#251f63" />
          </View>
        </View>
      </Modal>
    )
}

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});