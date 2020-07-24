export interface ITvShows {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered: string;
  officialSite: string;
  schedule: ISchedule;
  rating: IRating;
  weight: number;
  network: INetwork;
  webChannel?: any;
  externals: IExternals;
  image: IImage;
  summary: string;
  updated: number;
  _links: Ilinks;
}
export interface Ilinks {
  self: ISelf;
  previousepisode: ISelf;
}
export interface ISelf {
  href: string;
}
export interface IImage {
  medium: string;
  original: string;
}
export interface IExternals {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}
export interface INetwork {
  id: number;
  name: string;
  country: ICountry;
}
export interface ICountry {
  name: string;
  code: string;
  timezone: string;
}
export interface IRating {
  average: number;
}
export interface ISchedule {
  time: string;
  days: string[];
}