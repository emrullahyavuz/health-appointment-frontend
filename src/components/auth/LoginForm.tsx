import type React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { loginSchema, type LoginFormData } from "../../schemas/auth.schema"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError("")

    try {
      console.log(data)
      // API call will go here
    } catch (err) {
      console.log(err)
      setError("Geçersiz email veya şifre")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-sm opacity-80"></div>
          </div>
          <CardTitle className="text-2xl font-bold">Hesabınıza giriş yapın</CardTitle>
          <p className="text-gray-600">Sağlık panelinize erişin</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email adresi</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Email adresinizi giriniz"
                  className={`pl-10 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Şifrenizi giriniz"
                  className={`pl-10 pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Giriş yapılıyor..." : "Giriş yap"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Hesabınız yok mu?{" "}
                <Link to="/auth/register" className="text-orange-600 hover:text-orange-500 font-medium">
                  Kayıt ol
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
