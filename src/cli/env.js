const parseEnv = () => {
  const keys = Object.keys(process.env).filter((key) => key.startsWith("RSS_"));
  for (let key of keys) {
    console.log(`${key}=${process.env[key]}`);
  }
};

parseEnv();
