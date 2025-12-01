import { HeaderInterpolation } from "@/utils/factories/Interpolation";
import { Badge, DataList } from "@radix-ui/themes";

export const HeaderRulePreview = ({ details }: HeaderInterpolation) => {
  return (
    <DataList.Root trim="end" size="1" m="1">
      <DataList.Item>
        <Badge
          variant="surface"
          highContrast
          color="green"
          size="1"
          data-testid={`header-preview-${details?.action?.requestHeaders?.[0]?.header}`}
        >
          Header Interpolation
        </Badge>
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
