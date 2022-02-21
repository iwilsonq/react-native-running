import useSWR, { SWRResponse } from "swr";
import { fetcher } from "api/utils";

export interface Workout {
  id: number;
  title: string;
  notes: string;
  duration: number;
  kind: string;
}

function useWorkouts(): SWRResponse<Workout[], string> {
  return useSWR<Workout[], string>("/workouts", fetcher);
}

export default useWorkouts;
