function employeePunchTimeSheets<Type>(
  initial: Type
): [() => Type, (v: Type) => void] {
  let value: Type = initial;
  return [
    () => value,
    (v: Type) => {
      value = v;
    },
  ];
}

const staff = [
  {
    name: "James Watford",
    clockIn: 9,
    clockOut: 1530,
  },
  {
    name: "Wale Joba",
    clockIn: "2:00 PM",
    clockOut: "8:00 PM",
  },
];

for (const employee of staff) {
  const [log, record] = employeePunchTimeSheets(employee.clockIn);
  console.log({ employee: employee.name, clockIn: log() });
  record(employee.clockOut);
  console.log({ employee: employee.name, clockOut: log() });
}
