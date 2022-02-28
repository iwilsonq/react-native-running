export type BottomTabRouteNames =
  | "History"
  | "Profile"
  | "StartRun"
  | "Component";
export type BottomTabParamList = Record<BottomTabRouteNames, undefined>;

export type RunStackRouteNames = "Run" | "RunDashboard" | "RunSummary";
export type RunStackParamList = Record<RunStackRouteNames, undefined>;
