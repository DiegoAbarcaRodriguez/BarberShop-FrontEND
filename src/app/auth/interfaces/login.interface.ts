export interface LoginPayload {
    email: string,
    password: string
}

export interface LoginResponse {
    ok: boolean,
    token: string,
    userName: string
}