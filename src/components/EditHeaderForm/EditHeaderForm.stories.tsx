import preview from "#.storybook/preview";

const meta = preview.meta({
  component: 
  ,
});

export default meta;

export const Default = meta.story({
  // @ts-expect-error TODO: fix types
  arg: {
    defaultValues: {
      name: "test header",
      headerKey: "key",
      headerValue: "value",
      id: 23424,
    },
  },
});
