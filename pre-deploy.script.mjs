#!/usr/bin/env zx

// if (!fs.existsSync('changeset-out.json')) {
//   await $`echo changeset-out.json file does not exist`;
//   process.exit(0);
// }

const getChangedPackages = async () => {
  // Read changeset from file
  const changesets = await fs.readJson('changeset-out.json');
  // Filter out changesets that are not major, minor, or patch and derive the changed packages only
  const sets = changesets.releases.filter(release => ['major', 'minor', 'patch'].includes(release.type)).map(release => release.name);
  console.log('sets', sets);
  return changesets.releases.filter(release => ['major', 'minor', 'patch'].includes(release.type)).map(release => release.name);
};

// Run tests for changed packages only
const flags = (await getChangedPackages()).map(name => `--filter=${name}`);

const action = process.argv.slice(3)[0]

if (flags?.length > 0 && action) {
  await $`turbo ${action} ${flags}`;
}
