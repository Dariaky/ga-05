const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
function run() {
  // 1) Get the inputs
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });
  
  // 2) Upload the files. This command will first look for auth keys in the env.
  exec.exec(`aws s3 sync ${distFolder} s3://${bucket} --region ${bucketRegion}`);
  
   const websiteUrl = `http://${{ bucket }}.s3-website-${{ bucketRegion }}.amazonaws.com`;
   core.setOutput('website-url', websiteUrl);
  
  // core.notice('Hello World!');
}

run();