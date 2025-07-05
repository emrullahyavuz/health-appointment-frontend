import * as yup from 'yup'

// Login form validation schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz')
    .required('Email adresi gereklidir')
    .trim(),
  password: yup
    .string()
    .required('Şifre gereklidir')
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .max(50, 'Şifre en fazla 50 karakter olabilir')
})

// Register form validation schema
export const registerSchema = yup.object({
  name: yup
    .string()
    .required('Ad soyad gereklidir')
    .min(2, 'Ad soyad en az 2 karakter olmalıdır')
    .max(50, 'Ad soyad en fazla 50 karakter olabilir')
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad soyad sadece harf içerebilir')
    .trim(),
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz')
    .required('Email adresi gereklidir')
    .trim(),
  telephone: yup
    .string()
    .required('Telefon numarası gereklidir')
    .matches(/^[0-9+\-\s()]+$/, 'Geçerli bir telefon numarası giriniz')
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .max(15, 'Telefon numarası en fazla 15 karakter olabilir')
    .trim(),
  role: yup
    .string()
    .oneOf(['patient', 'doctor'], 'Geçerli bir hesap türü seçiniz')
    .required('Hesap türü gereklidir'),
  password: yup
    .string()
    .required('Şifre gereklidir')
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .max(50, 'Şifre en fazla 50 karakter olabilir')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir'
    ),
  confirmPassword: yup
    .string()
    .required('Şifre tekrarı gereklidir')
    .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor')
})

// Type definitions for TypeScript
export type LoginFormData = yup.InferType<typeof loginSchema>
export type RegisterFormData = yup.InferType<typeof registerSchema>

// Validation error messages
export const validationMessages = {
  required: 'Bu alan gereklidir',
  email: 'Geçerli bir email adresi giriniz',
  minLength: (field: string, min: number) => `${field} en az ${min} karakter olmalıdır`,
  maxLength: (field: string, max: number) => `${field} en fazla ${max} karakter olabilir`,
  passwordMismatch: 'Şifreler eşleşmiyor',
  invalidPhone: 'Geçerli bir telefon numarası giriniz',
  invalidName: 'Ad soyad sadece harf içerebilir',
  passwordRequirements: 'Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir'
} 