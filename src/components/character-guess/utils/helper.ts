export const isThereAnImage = (value: string) => {
  if (
    value ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
    value === "http://i.annihil.us/u/prod/marvel/i/mg/b/60/image_not_available"
  ) {
    return false;
  }

  return true;
};
