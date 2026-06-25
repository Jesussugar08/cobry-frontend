import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../api/auth'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const respuesta = await login(email, password)
            localStorage.setItem('token', respuesta.token)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 w-full max-w-md">
                <h1 className="text-center text-2xl font-bold tracking-tight text-white">Cobry</h1>
                <p className="mt-2 text-center text-sm text-gray-400">Inicia sesión</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Correo electronico</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Contraseña</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                    ¿No tienes cuenta?{' '}
                    <Link
                        to="/register"
                        className="font-medium text-white hover:text-gray-300 hover:underline underline-offset-2 transition-colors"
                    >
                        Crear cuenta
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
