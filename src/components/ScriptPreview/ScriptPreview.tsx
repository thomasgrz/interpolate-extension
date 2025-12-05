import { ScriptInterpolation } from "@/utils/factories/Interpolation";
import { Code, DataList } from "@radix-ui/themes";

export const ScriptPreview = (props: {
  rule: ScriptInterpolation;
  name: string;
}) => {
  const { rule, name } = props;

  return (
    <DataList.Root trim="end" size="1" m="1">
      <DataList.Item align="center">
        <DataList.Label>Name:</DataList.Label>
        <DataList.Value>{name}</DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Type:</DataList.Label>
        <DataList.Value>Script</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Snippet:</DataList.Label>
        <DataList.Value>
          <Code>{rule?.details?.js?.[0]?.code}</Code>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Matches:</DataList.Label>
        <DataList.Value>
          <strong>{rule?.details?.matches}</strong>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
};
