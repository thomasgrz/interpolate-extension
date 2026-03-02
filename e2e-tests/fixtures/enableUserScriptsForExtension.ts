export const enableUserScriptsForExtension = async (arg: { page: any }) => {
  const { page } = arg;
  await page.goto("chrome://extensions");
  await page.getByText("Details").click();
  const allowScriptsBox = await page.locator("[id='allow-user-scripts']");
  await allowScriptsBox.getByRole("button").click();
};
