import { performance } from "perf_hooks";

interface indivitualTimeSummary {
  method: string;
  time: number;
}

export function MeasureServiceTime() {
  return function (target: any) {
    const methods = Object.getOwnPropertyNames(target.prototype);
    const summary: indivitualTimeSummary[] = [];

    for (const method of methods) {
      const original = target.prototype[method];

      if (typeof original === "function" && method !== "constructor") {
        target.prototype[method] = async function (...args: any[]) {
          const start = performance.now();
          await original.apply(this, args);
          const end = performance.now();

          summary.push({
            method: String(method),
            time: end - start,
          });
        };
      }
    }

    process.on("exit", () => {
      let totalTime = 0;
      summary.forEach((data) => {
        totalTime += data.time;
      });
      console.log("Summary:", summary);
      console.log("Total Execution Time:", totalTime, "ms");
    });
  };
}

export function AddToppings() {
  return function (target: any, key: any, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const flavor = original.apply(this, args);
      const toppings = "🍦";
      return `${toppings} ${flavor}`;
    };

    return descriptor;
  };
}

async function delay(time: number = 1000, data: any) {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );
}

@MeasureServiceTime()
export class IceCream {
  async Order(flavor: string) {
    return await delay(1000, flavor);
  }

  @AddToppings()
  async Customize(flavor: string) {
    return await delay(1000, flavor);
  }
}

export const buy = async (flavor: string) => {
  const iceCreamShop = new IceCream();

  const order = await Promise.all([
    iceCreamShop.Order(flavor),
    iceCreamShop.Customize(flavor),
  ]);

  console.log(order);
};

buy("vanilla");
