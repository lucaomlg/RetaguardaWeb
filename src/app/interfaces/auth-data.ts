export interface AuthenticationData {
    IsAuthenticated: boolean;
    userName: string;
    recursos: []; // Adjust the type of `recursos` as needed
    accessToken?: string; // Optional, if needed
  }
  
  export interface AuthData {
    authenticationData: AuthenticationData;
  }