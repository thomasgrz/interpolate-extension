export const openInterpolationOptionsModal = async (arg: {
  page: any;
  extensionId: string;
}) => {
  const { page, extensionId } = arg;
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  await page.getByText("Create interpolation").click();
};
