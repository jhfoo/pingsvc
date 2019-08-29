module.exports = {
  apps : [{
    name: "pingsvc",
    script: "./src/server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }],
  deploy: {
    production: {
      user: 'root',
      host: ['localhost'],
      repo: 'git@github.com:jhfoo/pingsvc.git',
      ref: 'origin/master',
      repo: 'git@github.com:jhfoo/pingsvc.git',
      path: '/root/prod/pingsvc',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
