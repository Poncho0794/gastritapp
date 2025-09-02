export function snakeToCamel(str: string) {
  return str.replace(/_([a-z])/g, (match, char) => char.toUpperCase());
}

export function userKeysToCame(user: any) {
  if (!user) return user;
  const newUser: any = {};
  Object.keys(user).forEach((key) => {
    const newKey = snakeToCamel(key);
    newUser[newKey] = user[key];
  });
  return newUser as any;
}
