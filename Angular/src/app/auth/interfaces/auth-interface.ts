export interface AuthResponse{
    ok:     boolean;
    token?: string;
    query?: string;
    id?:    string;
    error?: string;
    name?:  string;
}

export interface Usuario{
    id?:number;
    name:string;
}

export interface Validate{
    ok:     boolean;
    status: string;
    type?:   number;
}