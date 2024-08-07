export interface AuthenticationData {
    IsAuthenticated: boolean;
    userName: string;
    recursos: string; 
    accessToken?: string; 
  }
  
  export interface AuthData {
    authenticationData: AuthenticationData;
  }