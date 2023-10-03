#!/usr/bin/env zx

const env = process.env.CI_ACTION_REF_NAME;

// Output changeset to file
if (env === "master") {
  await $`changeset status --output=${'changeset-out.json'} || (changeset add --empty && changeset status --output=${'changeset-out.json'})`;
} else {
  // await $`changeset status --output=${'changeset-out.json'} --since=origin/main || (changeset add --empty && changeset status --output=${'changeset-out.json'} --since=origin/main)`;

  try {
    await $`changeset status --output=${'changeset-out.json'} --since=origin/main`;
  } catch (e) {
    await $`changeset add --empty`;
    await $`sleep 2`;
    await $`changeset status --output=${'changeset-out.json'} --since=origin/main`;
  }
}
