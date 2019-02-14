module.exports = {
  apps : [{
    name: 'node-fangelm',
    script: 'index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    output: 'logs/out.log',
    error: 'logs/error.log',
    log: 'logs/combined.outerr.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: 9527,
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '212.83.163.1',
      port: '22',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/root/mnode-fangelm',
      'ssh_options': 'StrictHostKeyChecking=no',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
