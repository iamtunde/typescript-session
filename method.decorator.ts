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

export class IceCream {
  @AddToppings()
  Flavor(flavor: string): string {
    return flavor;
  }
}

const iceCream = new IceCream();

const getFlavor = iceCream.Flavor("vanilla");

console.log(getFlavor);
