// refactored formatNumber to check if argument is a number. if not, just return it

const formatNumber = (number) => {
  if (typeof number === 'number') {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 1,
      notation: 'compact',
    }).format(number);
  }
  return number;
};

export default formatNumber;
