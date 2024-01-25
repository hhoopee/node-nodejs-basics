const parseArgs = () => {
  const args = process.argv.slice(2);
  const filteredArgs = args.filter((arg) => arg.startsWith("--"));
  filteredArgs.forEach((arg) => {
    console.log(`${arg.slice(2)} is ${args[args.indexOf(arg) + 1]}`);
  });
};

parseArgs();
