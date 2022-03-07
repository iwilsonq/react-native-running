import Geolocation from "react-native-geolocation-service";
import { Region } from "react-native-maps";

export type RunEvent =
  | "START"
  | "TIMER_EXPIRED"
  | "PAUSE"
  | "RESUME"
  | "END"
  | "EXIT"
  | "ADD_POSITION"
  | "TICK"
  | "RESET_TIMER"
  | "SET_REGION";

interface BaseRunEventObject {
  type: RunEvent;
}

interface Start extends BaseRunEventObject {
  type: "START";
}
interface TimerExpired extends BaseRunEventObject {
  type: "TIMER_EXPIRED";
}
interface Pause extends BaseRunEventObject {
  type: "PAUSE";
}
interface Resume extends BaseRunEventObject {
  type: "RESUME";
}
interface End extends BaseRunEventObject {
  type: "END";
}
interface Exit extends BaseRunEventObject {
  type: "EXIT";
}
export interface AddPosition extends BaseRunEventObject {
  type: "ADD_POSITION";
  value: Geolocation.GeoPosition;
}
interface Tick extends BaseRunEventObject {
  type: "TICK";
}
interface ResetTimer extends BaseRunEventObject {
  type: "RESET_TIMER";
}
interface SetRegion extends BaseRunEventObject {
  type: "SET_REGION";
  value: Region;
}

export type RunEventObject =
  | Start
  | TimerExpired
  | Pause
  | Resume
  | End
  | Exit
  | AddPosition
  | Tick
  | ResetTimer
  | SetRegion;
