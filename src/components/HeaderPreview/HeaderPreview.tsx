import { HeaderInterpolation } from "@/utils/factories/Interpolation";
import { Badge, DataList } from "@radix-ui/themes";

export const HeaderRulePreview = ({
  details,
  name,
}: {
  details: HeaderInterpolation["details"];
  name: string;
}) => {
  return (
    <DataList.Root trim="end" size="1" m="1">
      <DataList.Item>
        <DataList.Label>Type:</DataList.Label>
        <DataList.Value>
          <Badge
            variant="soft"
            color="green"
            size="1"
            data-testid={`header-preview-${details?.action?.requestHeaders?.[0]?.header}`}
          >
            Header
          </Badge>
        </DataList.Value>
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
