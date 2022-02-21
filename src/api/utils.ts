import { BASE_URL } from "@env";

export function fetcher<T>(pathname: string, params: {}): Promise<T> {
  return fetch(BASE_URL + pathname, params)
    .then(res => res.json())
    .then(json => json.data);
}
