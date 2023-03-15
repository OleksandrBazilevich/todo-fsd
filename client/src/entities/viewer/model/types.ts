export interface IViewer {
  email: string
  _id: string
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IInitialState {
  viewer: IViewer | null
  isLoading: boolean
}

export interface IAuthReq {
  email: string
  password: string
}

export interface IAuthResponse extends ITokens {
  user: IViewer
}
