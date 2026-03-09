import { MockAPIInterpolation } from "#src/utils/factories/Interpolation.ts";
import { DataList } from "@radix-ui/themes";

export const MockPreview = ({
  details,
  name,
  dataOrientation,
}: {
  details: MockAPIInterpolation["details"];
  name: string;
  dataOrientation: "horizontal" | "vertical";
}) => {
  return (
    <DataList.Root orientation={dataOrientation} trim="end" size="1" m="1">
      <DataList.Item>
        <DataList.Label>Type:</DataList.Label>
        <DataList.Value>Mock</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Name:</DataList.Label>
        <DataList.Value>{name}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Matcher:</DataList.Label>
        <DataList.Value>{details?.matcher}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Body:</DataList.Label>
        <DataList.Value>{details?.body}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Status:</DataList.Label>
        <DataList.Value>{details?.httpCode}</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
};
