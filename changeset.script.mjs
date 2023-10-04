#!/usr/bin/env zx

// if (!fs.existsSync('changeset-out.json')) {
//   await $`echo changeset-out.json file does not exist`;
//   process.exit(0);
// }

const env = process.env.CI_ACTION_REF_NAME;

// Output changeset to file
if (env === "main") {
  await $`changeset status --output=${'changeset-out.json'}`;
} else {
  // await $`changeset status --output=${'changeset-out.json'} --since=origin/main`;

  await $`echo ***** start *****`;

  await $`changeset status --output=${'changeset-out.json'} --since=origin/main || echo 0`;

  // if (!fs.existsSync('changeset-out.json')) {
  //   await $`echo 0 > changeset-out.json does not exist`;
  //   await $`changeset status --output=${'changeset-out.json'}`;
  // }
}
