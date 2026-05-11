import { Text } from "@radix-ui/themes";

export const FieldError = ({ errors }: { errors?: string[] | undefined[] }) => {
  return !errors
    ? null
    : errors.map((error) => (
        <Text align="left" size="1" key={error} color="red">
          {error}
        </Text>
      ));
};
