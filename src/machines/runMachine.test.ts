import { interpret } from "xstate";
import Geolocation from "react-native-geolocation-service";
import { runMachine } from "./runMachine";

function createPosition(): Geolocation.GeoPosition {
  return {
    timestamp: Date.now(),
    coords: {
      latitude: 37,
      longitude: -127,
      accuracy: 5,
      altitude: 300,
      altitudeAccuracy: 1,
      heading: -1,
      speed: 0,
    },
  };
}

it('should eventually reach "active"', done => {
  const runService = interpret(runMachine).onTransition(state => {
    if (state.matches("active")) {
      done();
    }
  });

  runService.start();

  runService.send({ type: "START" });
  runService.send({ type: "TIMER_EXPIRED" });
});

it("should update the `path`", () => {
  const runService = interpret(runMachine);

  runService.start("active");

  runService.send({
    type: "ADD_POSITION",
    value: createPosition(),
  });
  runService.send({
    type: "ADD_POSITION",
    value: createPosition(),
  });

  expect(runService.state.context.path).toHaveLength(2);
});
