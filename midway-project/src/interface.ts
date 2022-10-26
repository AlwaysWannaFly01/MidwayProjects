/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

//增加天气信息的数据定义
export interface WeatherInfo {
  weatherinfo: {
    city: string;
    cityid: string;
    temp: string;
    WD: string;
    WS: string;
    SD: string;
    AP: string;
    njd: string;
    WSE: string;
    time: string;
    sm: string;
    isRadar: string;
    Radar: string;
  };
}

export interface User {
  uid: string;
  username: string;
  phone: string;
  email: string;
}
