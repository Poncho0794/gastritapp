import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

type SpinnerProps = {
  visible: boolean;
};

export default function Spinner({ visible }: SpinnerProps) {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#1E90FF" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});
