import { assign, createMachine } from "xstate";
import { Region } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { EventObject } from "machines/events";

interface Point extends Geolocation.GeoPosition {}

interface Context {
  countdown: number;
  path: Point[];
  region?: Region;
}

export const runMachine = createMachine<Context, EventObject>(
  {
    id: "run",
    initial: "idle",
    schema: {
      context: {} as Context,
    },
    context: {
      countdown: 3000,
      path: [],
      region: undefined,
    },
    states: {
      idle: {
        on: {
          START: "countdown",
        },
      },
      countdown: {
        on: {
          TIMER_EXPIRED: "active",
        },
      },
      active: {
        on: {
          PAUSE: "paused",
          END: "ended",
        },
      },
      paused: {
        on: {
          RESUME: "active",
          END: "ended",
        },
      },
      ended: {
        on: {
          EXIT: "idle",
        },
      },
    },
    on: {
      ADD_POSITION: {
        actions: "addPosition",
      },
    },
  },
  {
    actions: {
      addPosition: assign({
        path: (context, event) =>
          event.type === "ADD_POSITION"
            ? [...context.path, event.value]
            : context.path,
      }),
      setRegion: assign({
        region: (context, event) =>
          event.type === "SET_REGION"
            ? event.value
            : context.region,
      }),
    },
  },
);
