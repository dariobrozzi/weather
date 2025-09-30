// Decimal Degrees (DD) to Degrees, Minutes, Seconds (DMS)
export const formatDDToDMS = (value: number) => {
  let d = Math.floor(value);
  const minfloat = (value - d) * 60;

  let m = Math.floor(minfloat);
  const secfloat = (minfloat - m) * 60;

  let s = Math.round(secfloat);

  if (s == 60) {
    m++;
    s = 0;
  }

  if (m == 60) {
    d++;
    m = 0;
  }

  return `${d}° ${m}′ ${s}″`;
};

export const formatWindDirection = (windDirection: number): string => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];

  const index = Math.round(windDirection / 22.5) % 16;
  return `${directions[index]} (${windDirection.toFixed(0)}°)`;
};
