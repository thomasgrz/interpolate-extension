import { HeaderInterpolation } from "@/utils/factories/Interpolation";
import { Badge, DataList } from "@radix-ui/themes";

export const HeaderRulePreview = ({ details }: HeaderInterpolation) => {
  console.log(details);
  return (
    <DataList.Root trim="end" size="1" m="1">
      <DataList.Item>
        <DataList.Label>Type:</DataList.Label>
        <DataList.Value>
          <Badge color="yellow">Header</Badge>
        </DataList.Value>
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
