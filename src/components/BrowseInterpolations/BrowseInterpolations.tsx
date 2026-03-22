import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

export const BrowseInterpolations = () => {
  return (
    <Button
      size="2"
      radius="full"
      onClick={() => {
        chrome.tabs?.create({
          url: "https://github.com/thomasgrz/interpolate-extension/tree/main/interpolations",
        });
      }}
    >
      <MagnifyingGlassIcon />
      Browse interpolations{" "}
    </Button>
  );
};
