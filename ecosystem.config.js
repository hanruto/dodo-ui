module.exports = {
  apps: [
    {
      name: 'dodoui',
      script: './server',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
