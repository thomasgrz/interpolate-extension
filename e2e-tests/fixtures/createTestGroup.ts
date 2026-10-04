import { CreateGroupPlaceholder } from "#src/components/CreateGroupView/CreateGroupView.constants.ts";

export const createTestGroup = async ({
  page,
  groupName = "Test group name",
  interpolations,
}: {
  page: any;
  groupName?: string;
  interpolations?: {
    checkboxTestId: string;
  }[];
}) => {
  await page.getByTestId("groups-button").click();
  await page.getByText("Create group").click();
  await page.getByPlaceholder(CreateGroupPlaceholder.NAME).fill(groupName);
  if (interpolations) {
    await Promise.all(
      interpolations.map((interp) =>
        page.getByTestId(interp.checkboxTestId).click(),
      ),
    );
  }
  await page.getByRole("button").getByText("Create group").click();
  await page.getByText(groupName).isVisible();
};
