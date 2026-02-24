const JWT_TOKEN_KEY_NAME = "yourhaven";

class TokenService {
  private token: string | null = null;

  // Инициализация при создании сервиса
  constructor() {
    this.loadToken();
  }

  private loadToken(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem(JWT_TOKEN_KEY_NAME);
    }
  }

  getJwtToken(): string | null {
    // Если токен еще не загружен, пробуем загрузить
    if (this.token === null && typeof window !== 'undefined') {
      this.loadToken();
    }
    return this.token;
  }

  setJwtToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem(JWT_TOKEN_KEY_NAME, token);
    }
  }

  removeJwtToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(JWT_TOKEN_KEY_NAME);
    }
  }

  // Метод для принудительной перезагрузки токена
  refreshToken(): void {
    this.loadToken();
  }
}

export const tokenService = new TokenService();