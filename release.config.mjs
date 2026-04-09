/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main", "next"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/git",
      {
        assets: ["release/*.zip"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n",
      },
    ],
  ],
};
