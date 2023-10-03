#!/usr/bin/env zx

const env = process.env.CI_ACTION_REF_NAME;

// Output changeset to file
if (env === "master") {
  await $`changeset status --output=${'changeset-out.json'}`;
} else {
  await $`changeset status --output=${'changeset-out.json'} --since=origin/main || echo 0`;
}
