package com.archtester.newbattery

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.ReactApplicationContext

// Notice we inherit from the Codegen spec, NOT ReactContextBaseJavaModule
class NewBatteryModule(reactContext: ReactApplicationContext) : NativeNewBatterySpec(reactContext) {
    
    override fun getName() = "NewBattery"

    // No @ReactMethod annotation. This is called synchronously via C++ JSI.
    override fun getBatteryLevelSync(): String {
        val batteryStatus: Intent? = IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { ifilter ->
            reactApplicationContext.registerReceiver(null, ifilter)
        }
        val level: Int = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
        
        return "New Arch Battery: $level%"
    }
}
