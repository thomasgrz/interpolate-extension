export const getCaptureGroupsFromString = ({
  source,
  regex,
}: {
  source?: string;
  regex?: string;
}) => {
  if (!regex || !source) return [];
  const result = [] as Array<[string, string]>;
  const matches = new RegExp(regex).exec(source!);
  const capturedGroups = matches?.slice?.(1) ?? [];
  capturedGroups.forEach((content, indexOfCaptureGroupName) => {
    result.push([`$${indexOfCaptureGroupName + 1}`, content]);
  });

  return result;
};
