export const formatClass = (text) => {
  // 1. Define your special custom mappings here
  if (!text) {
    return;
  }
  const specialMappings = {
    hsc_1: "hsc 1st year",
    hsc_2: "hsc 2nd year",
  };

  // 2. Return the mapped value if it exists, otherwise replace underscores with spaces
  return specialMappings[text] || text.replace(/_/g, " ");
};

export const formatWith_ = (sub) => {
  if (!sub) {
    return;
  } else {
    return sub.replaceAll("_", " ");
  }
};
