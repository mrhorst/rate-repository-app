const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(number);
};

export default formatNumber;
