import Geolocation from "react-native-geolocation-service";
import { Region } from "react-native-maps";

export type Event =
  | "START"
  | "TIMER_EXPIRED"
  | "PAUSE"
  | "RESUME"
  | "END"
  | "EXIT"
  | "ADD_POSITION"
  | "SET_REGION";

interface BaseEventObject {
  type: Event;
}

interface Start extends BaseEventObject {
  type: "START";
}
interface TimerExpired extends BaseEventObject {
  type: "TIMER_EXPIRED";
}
interface Pause extends BaseEventObject {
  type: "PAUSE";
}
interface Resume extends BaseEventObject {
  type: "RESUME";
}
interface End extends BaseEventObject {
  type: "END";
}
interface Exit extends BaseEventObject {
  type: "EXIT";
}
interface AddPosition extends BaseEventObject {
  type: "ADD_POSITION";
  value: Geolocation.GeoPosition;
}
interface SetRegion extends BaseEventObject {
  type: "SET_REGION";
  value: Region;
}

export type EventObject =
  | Start
  | TimerExpired
  | Pause
  | Resume
  | End
  | Exit
  | AddPosition
  | SetRegion;
