function getDateTime() {
  const now = new Date();

  const argentinaTimezoneOffset = -3 * 60; // UTC-3

  // Ajustar la fecha y hora para Argentina
  const argentinaDate = new Date(now.getTime() + (argentinaTimezoneOffset * 60 * 1000));

  const unixTimestamp = Math.floor(argentinaDate.getTime() / 1000);
  const iso8601 = argentinaDate.toISOString();

  return {
      unixTimestamp: unixTimestamp,
      iso8601: iso8601
  };
}

function addTimeToUnixTimestamp({unixTimestamp, amount = 2, unit = 'hours'}) {
  const millisecondsInASecond = 1000;
  let millisecondsToAdd;

  switch (unit) {
      case 'seconds':
          millisecondsToAdd = amount * millisecondsInASecond;
          break;
      case 'minutes':
          millisecondsToAdd = amount * millisecondsInASecond * 60;
          break;
      case 'hours':
          millisecondsToAdd = amount * millisecondsInASecond * 60 * 60;
          break;
      case 'days':
          millisecondsToAdd = amount * millisecondsInASecond * 60 * 60 * 24;
          break;
      default:
          throw new Error('Unsupported time unit');
  }

  const newUnixTimestamp = unixTimestamp + (millisecondsToAdd / millisecondsInASecond);
  return newUnixTimestamp;
}

export { getDateTime, addTimeToUnixTimestamp };
