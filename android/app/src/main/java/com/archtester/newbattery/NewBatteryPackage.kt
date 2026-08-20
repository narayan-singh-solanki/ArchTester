package com.archtester.newbattery

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NewBatteryPackage : BaseReactPackage() {
    // 1. Return our module if React Native asks for "NewBattery"
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        if (name == "NewBattery") {
            NewBatteryModule(reactContext)
        } else {
            null
        }

    // 2. Tell React Native that this is explicitly a TurboModule (isTurboModule = true)
    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            "NewBattery" to ReactModuleInfo(
                name = "NewBattery",
                className = "NewBattery",
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true // <--- This is the magic flag!
            )
        )
    }
}