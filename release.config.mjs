/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main", "next"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/github",
      {
        assets: [{ path: "dist" }],
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["dist/**/*", "package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n",
      },
    ],
  ],
};
