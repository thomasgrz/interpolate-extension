import { RedirectInterpolation } from "@/utils/factories/Interpolation";
import { Badge, DataList } from "@radix-ui/themes";

export const RedirectRulePreview = (props: {
  rule: RedirectInterpolation;
  name: string;
}) => {
  const { rule, name } = props;

  return (
    <DataList.Root
      data-test={`redirect-preview-${rule.details.id}`}
      trim="end"
      size="1"
      m="1"
    >
      <DataList.Item align="center">
        <DataList.Label>Name:</DataList.Label>
        <DataList.Value>{name}</DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Type:</DataList.Label>
        <DataList.Value>
          <Badge color="cyan">Redirect</Badge>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Redirect:</DataList.Label>
        <DataList.Value>{rule?.details?.action?.redirect?.url}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>RegEx:</DataList.Label>
        <DataList.Value>
          <strong>{rule?.details?.condition?.regexFilter}</strong>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
};
