export const isDatabaseConfigured = (): boolean => {
  const value = process.env.POSTGRES_URL
  return Boolean(value && value.trim().length > 0)
}

