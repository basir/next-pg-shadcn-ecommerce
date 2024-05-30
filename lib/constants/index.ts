export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Amazona'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'An Amazon clone built with Next.js, Postgres, Shadcn'

export const signInDefaultValues = {
  email: '',
  password: '',
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
}
