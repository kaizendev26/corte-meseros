const meseros = [
  { id: 1, nombre: "ADRIAN" },
  { id: 2, nombre: "IRMA" },
  { id: 3, nombre: "JOSAFAT" },
  { id: 4, nombre: "BRAYAN" },
  { id: 5, nombre: "ABEL" },
  { id: 6, nombre: "DELIA" },
  { id: 7, nombre: "FELIPE" },
  { id: 8, nombre: "YOSELIN" },
];

const obtenerTarjetasPorMesero = () => {
  let tarjetasPorMesero = [];
  for (const mesero of meseros) {
    const inputs = document.querySelectorAll(`[data-id="${mesero.id}"]`);
    let tarjetas = [];
    inputs.forEach((input) => {
      let tarjeta = input.value != "" ? input.value : "";
      tarjetas.push(tarjeta);
    });
    tarjetasPorMesero.push({
      id: mesero.id,
      mesero: mesero.nombre,
      tarjetas,
    });
  }

  localStorage.setItem("tarjetas", JSON.stringify(tarjetasPorMesero));

  // console.log(tarjetasPorMesero);
};

const viewTarjetas = (filas = 5) => {
  let filasHtml = "";
  for (let i = 1; i <= filas; i++) {
    filasHtml += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    ${meseros
                      .map((mesero) => {
                        return `<td class="px-5 py-3 min-w-24">
                                     <input data-id="${mesero.id}" onclick="this.select()" type="text" id="small-input"
                                    class=" input-tarjeta block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs 
                                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </td>`;
                      })
                      .join("")}
                </tr>`;
  }

  return `
        <div class="relative overflow-x-auto">
        <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    ${meseros
                      .map((mesero) => {
                        return `<th scope="col" class="px-5 py-3 ">
                                    ${mesero.nombre}
                                </th>`;
                      })
                      .join("")}
                </tr>
            </thead>
            <tbody>
                ${filasHtml}
            </tbody>
        </table>
        </div>`;
};

export { viewTarjetas, obtenerTarjetasPorMesero, meseros };
