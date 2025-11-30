/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/explore` | `/(tabs)/home` | `/_sitemap` | `/auth` | `/auth/login` | `/auth/register` | `/explore` | `/home` | `/profile` | `/profile/setup`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
