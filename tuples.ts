function employeePunchTimeSheetsT(
  initial: string
): [() => string, (v: string) => void] {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}

interface IEmployees {
  name: string;
  clockIn: string;
  clockOut: string;
}

const employees: IEmployees[] = [
  {
    name: "James Watford",
    clockIn: "9:00 AM",
    clockOut: "3:30 PM",
  },
  {
    name: "Wale Joba",
    clockIn: "2:00 PM",
    clockOut: "8:00 PM",
  },
];

for (const employee of employees) {
  const [time, clockOut] = employeePunchTimeSheetsT(employee.clockIn);
  console.log({ employee: employee.name, clockIn: time() });
  clockOut(employee.clockOut);
  console.log({ employee: employee.name, clockOut: time() });
}
