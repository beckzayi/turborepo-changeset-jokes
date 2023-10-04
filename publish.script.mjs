#!/usr/bin/env zx

import { getChangedPackages } from "./scripts/constants.mjs";

const branch = process.env.CI_ACTION_REF_NAME;

const flags = (await getChangedPackages()).map(name => `--filter=${name}`);

if (branch === "main" && flags?.length > 0) {
  // Build the packages first as there can be interdependencies
  await $`turbo build ${flags}`;

  await $`yarn changeset version`;

  await $`yarn changeset publish`;

  await $`
    git add .changeset apps packages
    git commit -m "changeset publish" -n
    git push origin HEAD:${ branch } --no-verify --follow-tags
  `;
}
