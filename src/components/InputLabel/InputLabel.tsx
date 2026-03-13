import { Text } from "@radix-ui/themes";
import { Label } from "radix-ui";

export default function FieldLabel({ children }: { children: string }) {
  return (
    <Label.Root>
      <Text highContrast weight="medium" size="2">
        {children}
      </Text>
    </Label.Root>
  );
}
