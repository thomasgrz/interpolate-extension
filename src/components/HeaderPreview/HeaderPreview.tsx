import { HeaderInterpolation } from "@/utils/factories/Interpolation";
import { DataList } from "@radix-ui/themes";

export const HeaderRulePreview = ({
  details,
  name,
  dataOrientation,
}: {
  details: HeaderInterpolation["details"];
  name: string;
  dataOrientation: "horizontal" | "vertical";
}) => {
  return (
    <DataList.Root orientation={dataOrientation} trim="end" size="1" m="1">
      <DataList.Item>
        <DataList.Label>Type:</DataList.Label>
        <DataList.Value>Header</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Name:</DataList.Label>
        <DataList.Value>{name}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Key:</DataList.Label>
        <DataList.Value>
          {details?.action?.requestHeaders?.[0]?.header}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Value:</DataList.Label>
        <DataList.Value>
          {details?.action?.requestHeaders?.[0]?.value}
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
};
