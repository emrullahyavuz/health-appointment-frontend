import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Lock, Eye, EyeOff, Shield, CheckCircle, AlertCircle } from "lucide-react"
import { passwordUpdateSchema, type PasswordUpdateFormData } from "../../schemas/auth.schema"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../redux/store"
import { passwordUpdate } from "../../redux/auth/authSlice"
import { toast } from "sonner"

export function PasswordUpdateForm() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  })
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<PasswordUpdateFormData>({
    resolver: yupResolver(passwordUpdateSchema),
    mode: "onChange"
  })

  const newPassword = watch("newPassword")

  // Password strength calculation
  const checkPasswordStrength = (password: string) => {
    let score = 0
    let feedback = ""
    if (password.length >= 8) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    switch (score) {
      case 0:
      case 1:
        feedback = "Very Weak"
        break
      case 2:
        feedback = "Weak"
        break
      case 3:
        feedback = "Fair"
        break
      case 4:
        feedback = "Good"
        break
      case 5:
        feedback = "Strong"
        break
    }
    return { score, feedback }
  }

  // Update password strength on newPassword change
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(newPassword || ""))
  }, [newPassword])

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const onSubmit = async (data: PasswordUpdateFormData) => {
    
    
    const response = await dispatch(passwordUpdate(data))
    if(response.meta.requestStatus === "fulfilled"){
      toast.success("Şifre başarıyla güncellendi")
      setSuccess(true)
      reset()
      setPasswordStrength({ score: 0, feedback: "" })
      setTimeout(() => setSuccess(false), 5000)
    }
    
  }

  const getPasswordStrengthColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-orange-500"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-blue-500"
      case 5:
        return "bg-green-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-orange-600" />
          <span>Update Password</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Keep your account secure by using a strong password</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Password updated successfully!</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="oldPassword"
                type={showPasswords.current ? "text" : "password"}
                {...register("oldPassword")}
                placeholder="Enter your current password"
                className={`pl-10 pr-10 ${errors.oldPassword ? "border-red-500 focus:border-red-500" : ""}`}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="newPassword"
                type={showPasswords.new ? "text" : "password"}
                {...register("newPassword")}
                placeholder="Enter your new password"
                className={`pl-10 pr-10 ${errors.newPassword ? "border-red-500 focus:border-red-500" : ""}`}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
            )}
            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Password Strength:</span>
                  <span
                    className={`font-medium ${
                      passwordStrength.score >= 4
                        ? "text-green-600"
                        : passwordStrength.score >= 3
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {passwordStrength.feedback}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Password should contain:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li className={newPassword.length >= 8 ? "text-green-600" : "text-gray-500"}>
                      At least 8 characters
                    </li>
                    <li className={/[a-z]/.test(newPassword) ? "text-green-600" : "text-gray-500"}>
                      Lowercase letters
                    </li>
                    <li className={/[A-Z]/.test(newPassword) ? "text-green-600" : "text-gray-500"}>
                      Uppercase letters
                    </li>
                    <li className={/[0-9]/.test(newPassword) ? "text-green-600" : "text-gray-500"}>Numbers</li>
                    <li className={/[^A-Za-z0-9]/.test(newPassword) ? "text-green-600" : "text-gray-500"}>
                      Special characters
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Confirm your new password"
                className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}`}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
            <h4 className="font-medium text-blue-900 mb-2">Security Tips:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use a unique password that you don't use elsewhere</li>
              <li>• Consider using a password manager</li>
              <li>• Don't share your password with anyone</li>
              <li>• Update your password regularly</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading || passwordStrength.score < 3}>
            {loading ? "Updating Password..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
