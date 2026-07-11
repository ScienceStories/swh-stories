const VITE_ENV_VAR_PREFIX = 'VITE_';

export const getEnvVars = () => Object.entries(import.meta.env)
  .filter(([key]) => key.startsWith(VITE_ENV_VAR_PREFIX))
  .reduce((acc, [key, value]) => {
    const newKey = key.replace(VITE_ENV_VAR_PREFIX, '');
    acc[newKey] = value;
    return acc;
  }, {} as Record<string, string>);

export const env = getEnvVars();

export const envBool = (envVar: string | undefined) => envVar?.toLowerCase() === 'true';

export const envNumber = (envVar: string | undefined) => {
  if (!envVar || !envVar.trim()) {
    return undefined;
  }

  const parsed = Number(envVar);
  return Number.isNaN(parsed) ? undefined : parsed;
};
