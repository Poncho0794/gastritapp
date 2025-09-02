import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
    SUPABASE_PROJECT_ANON_KEY: process.env.SUPABASE_PROJECT_ANON_KEY,
  },
  // no tocar eas.projectId aquí
});
