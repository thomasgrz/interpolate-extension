export const validateStringLength = ({
  value,
  min = 1,
  error,
}: {
  value?: string;
  min?: number;
  error: string;
}) => {
  return !value || value?.length < min ? error : null;
};
