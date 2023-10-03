#!/usr/bin/env zx

const env = process.env.CI_ACTION_REF_NAME;

// Output changeset to file
if (env === "master") {
  await $`yarn changeset status --output=${'changeset-out.json'} || (yarn changeset add --empty && yarn changeset status --output=${'changeset-out.json'})`;
} else {
  await $`yarn changeset status --output=${'changeset-out.json'} --since=origin/main || (yarn changeset add --empty && yarm changeset status --output=${'changeset-out.json'} --since=origin/main)`;
}
