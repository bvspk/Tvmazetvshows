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
    schedule: Ischedule;
    rating: Irating;
    weight: number;
    network: Inetwork;
    webChannel?: any;
    externals: Iexternals;
    image: Image;
    summary: string;
    updated: number;
    _links: Ilinks;
  }
  
  export interface Ilinks {
    self: Iself;
    previousepisode: Iself;
  }
  
  export interface Iself {
    href: string;
  }
  
  export interface Image {
    medium: string;
    original: string;
  }
  
 export  interface Iexternals {
    tvrage: number;
    thetvdb: number;
    imdb: string;
  }
  
 export interface Inetwork {
    id: number;
    name: string;
    country: Icountry;
  }
  
 export interface Icountry {
    name: string;
    code: string;
    timezone: string;
  }
  
  export interface Irating {
    average: number;
  }
  
  export interface Ischedule {
    time: string;
    days: string[];
  }