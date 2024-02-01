const formatoMoneda = (locales, divisa) => {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency: divisa,
  });
};

const mxn = (cantidad) => {
  return formatoMoneda("es-MX", "MXN").format(cantidad);
};

export default mxn;
