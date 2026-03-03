export const sum = (a: number, b: number): number => {
  return a + b;
};

export const dobleDe = (n: number) => {
  return n * 2;
};

export function ejemploDesestructuracion() {
  const usuario = { 
    nombre: "Amanda",
    edad: 2
  };
  const { nombre, edad } = usuario; //Desestructuracion de objeto
  return `${nombre} tiene ${edad} años`;
};
