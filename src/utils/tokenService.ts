const JWT_TOKEN_KEY_NAME = "userToken";

class TokenService {
  private accessToken: string | null = null;

  constructor() {
    this.loadToken();
  }

  private loadToken(): void {
    if (typeof window !== "undefined") {
      this.accessToken = localStorage.getItem(JWT_TOKEN_KEY_NAME);
    }
  }

  getJwtToken() {
    if (this.accessToken === null && typeof window !== "undefined") {
      this.loadToken();
    }
    return {
      accessToken: this.accessToken,
    };
  }

  setJwtToken({
    accessToken,
  }: {
    accessToken: string;
  }): void {
    this.accessToken = accessToken;
    if (typeof window !== "undefined") {
      localStorage.setItem(JWT_TOKEN_KEY_NAME, accessToken);
    }
  }

  removeJwtToken(): void {
    this.accessToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem(JWT_TOKEN_KEY_NAME);
    }
  }

  refreshToken(): void {
    this.loadToken();
  }
}

export const tokenService = new TokenService();
