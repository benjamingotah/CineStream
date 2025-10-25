export interface SignupRequest {
    fullName: string;
    email: string;
    password:string;
    userType?: string;
}

export interface signupResponse{
    message: string
}

export interface LoginRequest {
    email: string;
    password: string
}

export interface User{
    fullName: string
    email: string
}

export interface LoginResponse {
    token: string
    user: User
}

export interface UpdateResponse{
    message: string
}


const BaseUrl = import.meta.env.VITE_BASE_URL;


// Sign Up api call
export async function SignupUser(payload:SignupRequest): Promise<signupResponse> {
    try{

        const requestBody = {...payload, userType: "Normal"}
    
        const res = await fetch(`${BaseUrl}/auth/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
    })

    if(!res.ok) throw new Error(`${res.status}`)

    const data = await res.json()
    return data

    }catch(error){
        throw error
    }

}
// Login api call
export async function LoginUser(payload:LoginRequest): Promise<LoginResponse> {
    try{

        const requestBody = {...payload}
    
        const res = await fetch(`${BaseUrl}/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
    })

    if(!res.ok) throw new Error(`${res.status}`)

    const data = await res.json()
    return data

    }catch(error){
        throw error
    }

}

// Update account api call

export async function UpdateAccount(payload:LoginRequest): Promise<UpdateResponse> {
    try{

        const requestBody = {...payload}
    
        const res = await fetch(`${BaseUrl}/auth/login`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
    })

    if(!res.ok) throw new Error(`${res.status}`)

    const data = await res.json()
    return data

    }catch(error){
        throw error
    }

}

export const tokenManager = {
    getToken : (): string | null => {
        return localStorage.getItem('authToken')
    },

    setToken: (token: string) : void =>{
        localStorage.setItem('authToken', token)
    },

    removeToken : (): void => {
        localStorage.removeItem('authToken')
    },

     isTokenValid: (): boolean => {
    const token = tokenManager.getToken();
    if (!token) return false;

    try {
      // JWT validation (decode payload to check expiry)
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now() / 1000;
      
      // Check if token has expiry and if it's still valid
      if (payload.exp && payload.exp <= now) {
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  },
 
}

export const UserManager = {
    getUser: (): User | null => {
        const user =localStorage.getItem('authUser')
        return user ? JSON.parse(user) : null
    },

    setUser: (user: User): void => {
        localStorage.setItem('authUser', JSON.stringify(user))
    },

    removeUSer: (): void => {
        localStorage.removeItem('authUser')
    },

    getcurrentUser: (): User | null =>{
        return tokenManager.isTokenValid() ?
         UserManager.getUser() : null
    },

    isAuthenticated: (): boolean => {
        return tokenManager.isTokenValid() && UserManager.getUser() !==null
    },

    logout: () =>{
        UserManager.removeUSer()
        tokenManager.removeToken()
    }
}