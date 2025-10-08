import 'server-only';

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get OPENAI_API_KEY() {
    return required('OPENAI_API_KEY');
  },
  get BROWSERBASE_API_KEY() {
    return required('BROWSERBASE_API_KEY');
  },
  get BROWSERBASE_PROJECT_ID() {
    return required('BROWSERBASE_PROJECT_ID');
  },
  get OPENAI_ORG() {
    return process.env.OPENAI_ORG;
  },
};
