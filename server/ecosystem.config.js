module.exports = {
  apps: [
    {
      name: "xspark-pms",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};