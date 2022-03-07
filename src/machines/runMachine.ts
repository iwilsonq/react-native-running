import { assign, createMachine } from "xstate";
import { Region } from "react-native-maps";
import { RunEventObject } from "machines/events";
import {
  AllStats,
  createStats,
  displayDistanceInMiles,
  displayDuration,
  displayPacePerMile,
  getAndDisplayPacePerMile,
  getPacePerMile,
  MomentaryStats,
  Stats,
} from "utils/stats";
import { GeoPosition, getDistanceBetweenGeoPositions } from "utils/distance";

export interface RunContext {
  countdown: number;
  elapsed: number;
  interval: number;
  path: GeoPosition[];
  region?: Region;
  stats: AllStats;
}

export const runMachine = createMachine<RunContext, RunEventObject>(
  {
    id: "run",
    initial: "idle",
    schema: {
      context: {} as RunContext,
      events: {} as RunEventObject,
    },
    context: {
      countdown: 3000,
      elapsed: 0,
      interval: 0.1,
      path: [],
      region: undefined,
      stats: {
        rolling: [createStats()],
        momentary: {
          averageHeartrate: null,
          averagePace: `-'--"`,
          currentHeartrate: null,
          currentPace: `-'--"`,
          distance: `0.00`,
          duration: `0:00`,
        },
      },
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
        invoke: {
          src: context => send => {
            const interval = setInterval(() => {
              send("TICK");
            }, 1000 * context.interval);

            return () => {
              clearInterval(interval);
            };
          },
        },
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
      TICK: {
        actions: "tick",
      },
      ADD_POSITION: {
        actions: "addPosition",
      },
      RESET_TIMER: {
        actions: "resetTimer",
      },
    },
  },
  {
    actions: {
      addPosition: assign({
        path: (context, event) => {
          if (event.type === "ADD_POSITION") {
            return [...context.path, event.value];
          }
          return context.path;
        },
        stats: (context, event) => {
          return updateRunStats(context, event);
        },
      }),
      resetTimer: assign({
        elapsed: _context => 0,
      }),
      tick: assign({
        elapsed: context =>
          Number((context.elapsed + context.interval).toFixed(2)),
      }),
      setRegion: assign({
        region: (context, event) =>
          event.type === "SET_REGION" ? event.value : context.region,
      }),
    },
  },
);

function updateRunStats(context: RunContext, event: RunEventObject): AllStats {
  if (event.type === "ADD_POSITION") {
    if (context.path.length === 0) {
      return context.stats;
    }

    const currentCoords = event.value;
    const previousCoords = context.path[context.path.length - 1];
    const addedDistance = getDistanceBetweenGeoPositions(
      currentCoords,
      previousCoords,
    );

    const updatedRollingStats = updateRollingStats(
      context.stats.rolling,
      context.elapsed,
      addedDistance,
    );

    const updatedMomentaryStats = updateMomentaryStats(updatedRollingStats);

    return {
      momentary: updatedMomentaryStats,
      rolling: updatedRollingStats,
    };
  }
  return context.stats;
}

function updateRollingStats(
  rollingStats: Stats[],
  totalElapsed: number,
  addedDistance: number,
): Stats[] {
  const rollingStatsCopy = [...rollingStats];
  const latestRollingStat = rollingStatsCopy[rollingStatsCopy.length - 1];

  const totalDistance =
    rollingStatsCopy.length > 0
      ? addedDistance + latestRollingStat.totalDistance
      : addedDistance;

  const addedDuration = totalElapsed - latestRollingStat.totalDuration;

  rollingStatsCopy.push({
    calories: 0,
    addedDistance,
    addedDuration,
    totalDistance,
    totalDuration: totalElapsed,
    elevationGained: 0,
    heartrate: null,
  });

  return rollingStatsCopy;
}

function updateMomentaryStats(rollingStats: Stats[]): MomentaryStats {
  const latestRollingStat = rollingStats[rollingStats.length - 1];
  const addedDistance = latestRollingStat.addedDistance;
  const addedDuration = latestRollingStat.addedDuration;
  const totalDistance = latestRollingStat.totalDistance;
  const totalDuration = latestRollingStat.totalDuration;
  const currentHeartrate = latestRollingStat.heartrate;
  const currentPace = getPacePerMile(addedDuration * 1000, addedDistance);

  let totalHeartrate = 0;
  for (const index in rollingStats) {
    const rollingStat = rollingStats[index];
    if (rollingStat.heartrate !== null) {
      totalHeartrate += rollingStat.heartrate;
    }
  }

  const averagePace = getAndDisplayPacePerMile(
    latestRollingStat.totalDuration * 1000,
    latestRollingStat.totalDistance,
  );

  return {
    averageHeartrate: totalHeartrate / rollingStats.length || null,
    averagePace,
    currentHeartrate,
    currentPace: addedDistance < 2 ? `-'--"` : displayPacePerMile(currentPace),
    distance: displayDistanceInMiles(totalDistance),
    duration: displayDuration(totalDuration * 1000),
  };
}
