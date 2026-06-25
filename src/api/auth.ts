import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

type LoginResponse = {
    token: string
}

const register = async (email: string, password: string, name: string) => {
    const response = await api.post('/api/auth/register', {
        email,
        password,
        name
    })
    return response.data
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/auth/login', {
        email,
        password
    })
    return response.data
}

export { register, login }
