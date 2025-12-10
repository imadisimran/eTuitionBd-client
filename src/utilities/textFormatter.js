export const formatClass = (text) => {
  // Pattern: ([a-zA-Z]+) captures the WHOLE word part
  //          (\d+)       captures the WHOLE number part
  return text.replace(/([a-zA-Z]+)(\d+)/g, function (match, prefix, number) {
    // Normalize to lowercase to handle HSC1, hsc1, Hsc1, etc.
    const lowerPrefix = prefix.toLowerCase();

    // Special Case: HSC 1
    if (lowerPrefix === "hsc" && number === "1") {
      return prefix + " 1st year";
    }

    // Special Case: HSC 2
    if (lowerPrefix === "hsc" && number === "2") {
      return prefix + " 2nd year";
    }

    // Default: Just add a space (e.g., class1 -> class 1)
    return prefix + " " + number;
  });
};

export const formatWith_ = (sub) => {
  if (!sub) {
    return;
  } else {
    return sub.replaceAll("_", " ");
  }
};
