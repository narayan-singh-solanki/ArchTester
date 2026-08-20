import { Button, NativeModules, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';

// 2. NEW ARCHITECTURE: Import your Codegen Spec directly
import NativeNewBattery from './specs/NativeNewBattery';

// 1. OLD ARCHITECTURE: Extract from NativeModules
const { OldBattery } = NativeModules;


export default function App() {
  const [oldStatus, setOldStatus] = useState('Waiting for Battery Status...');
  const [newStatus, setNewStatus] = useState('Waiting for Battery Status...');

  const testOldArchitecture = async () => {
    try {
      // Old Bridge: We MUST wait (async/await) because it uses a queue and Promise
      const result = await OldBattery.getBatteryLevel();
      setOldStatus(result);
    } catch (error) {
      setOldStatus('Error checking battery');
    }
  };

  const testNewArchitecture = () => {
    // New JSI: Notice there is NO 'await' here! 
    // This executes synchronously across the C++ boundary on the same thread.
    const result = NativeNewBattery.getBatteryLevelSync();
    setNewStatus(result);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      {/* --- OLD BRIDGE --- */}
      <View style={{ alignItems: 'center', padding: 20, marginBottom: 40, borderBottomWidth: 1, borderColor: '#ccc', width: '100%' }}>
        <Text style={{ fontSize: 20, marginBottom: 10, color: 'blue' }}>
          Legacy Bridge (Async)
        </Text>
        <Button title="Get Battery (Old)" onPress={testOldArchitecture} />
        <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 18 }}>
          {oldStatus}
        </Text>
      </View>

      {/* --- NEW JSI / TURBOMODULE --- */}
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10, color: 'green' }}>
          New Architecture (Sync)
        </Text>
        <Button title="Get Battery (New)" color="green" onPress={testNewArchitecture} />
        <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 18 }}>
          {newStatus}
        </Text>
      </View>

    </SafeAreaView>
  );
}