declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Node
      NODE_ENV: 'development' | 'production';
      PORT?: string;

      // Whitelist
      WHITELIST_PATH: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}