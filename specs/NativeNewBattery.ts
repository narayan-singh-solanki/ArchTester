import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  getBatteryLevelSync(): string; 
}

export default TurboModuleRegistry.getEnforcing<Spec>("NewBattery");