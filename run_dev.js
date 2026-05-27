const { exec } = require('child_process');
const fs = require('fs');

exec('npm run dev -- -p 3001', { cwd: 'c:/Users/Frost/Downloads/New folder/EventlyCms' }, (error, stdout, stderr) => {
  fs.writeFileSync('dev_error.log', stdout + '\n' + stderr);
  fs.writeFileSync('dev_error_details.json', JSON.stringify({ error: error ? error.message : null }));
});
