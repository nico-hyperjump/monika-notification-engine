export const isAlreadyExpired = (expiredAt: Date) => {
  const now = new Date();
  return expiredAt <= now;
};
