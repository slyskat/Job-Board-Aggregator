export function formatSalary(minSalary, maxSalary) {
  // console.log(typeof minSalary, maxSalary);
  // console.log("minSalary:", minSalary, "-type:", typeof minSalary);
  // console.log("maxSalary:", maxSalary, "-type:", typeof maxSalary);
  const isInvalid = (value) => {
    return (
      value === null ||
      value === undefined ||
      value === 0 ||
      typeof value !== "number" ||
      Number.isNaN(value)
    );
  };

  if (isInvalid(minSalary) && isInvalid(maxSalary)) {
    return null;
  }

  if (!isInvalid(minSalary) && !isInvalid(maxSalary)) {
    return `$${minSalary.toLocaleString()} - $${maxSalary.toLocaleString()}`;
  }

  if (!isInvalid(minSalary) && isInvalid(maxSalary)) {
    return `$${minSalary.toLocaleString()}+`;
  }

  if (isInvalid(minSalary) && !isInvalid(maxSalary)) {
    return `Up to $${maxSalary.toLocaleString()}`;
  }

  return null;
}

// console.log(formatSalary(6000, 8000));

// console.log(Number.isNaN(6000));
// console.log(Number.isNaN(8000));
// console.log(testFunction(60));
