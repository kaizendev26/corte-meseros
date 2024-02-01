import mxn from "../utils/formatoMoneda";

const viewCortes = (cortes) => {
  let comisionesMXNTotales = 0;
  let tarjetasTotales = 0;
  let tarjetas5PorcientoTotales = 0;
  let pagarACocinaTotales = 0;

  for (const corte of cortes) {
    comisionesMXNTotales += corte.comisionesMXN;
    tarjetasTotales += corte.tarjetas;
    tarjetas5PorcientoTotales += corte.tarjetas5Porciento;
    pagarACocinaTotales += corte.pagarACocina;
  }

  console.log(cortes);
  return `<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
          <th scope="col" class="p-4">
              <div class="flex items-center">
                  <input id="checkbox-all-search" type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
          </th>
          <th scope="col" class="px-6 py-3">
          Mesero
          </th>
          <th scope="col" class="px-6 py-3">
            Venta Marisco
          </th>
          <th scope="col" class="px-6 py-3">
            Venta Cena
          </th>
          <th scope="col" class="px-6 py-3">
            Comisiones
          </th>
          <th scope="col" class="px-6 py-3">
            Comisiones en Pesos
          </th>
          <th scope="col" class="px-6 py-3">
            Tarjetas
          </th>
          <th scope="col" class="px-6 py-3">
            Tarjetas - 5%
          </th>
          <th scope="col" class="px-6 py-3">
            Pagar a Cocina
          </th>
          <th scope="col" class="px-6 py-3">
            Resultado
          </th>
      </tr>
  </thead>
  <tbody>
  ${cortes
    .map((corte) => {
      return `<tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input type="checkbox"
                            class="checkboxMesero w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${corte.mesero}
                </th>
                <td class="px-6 py-4">
                ${mxn(corte.ventaMarisco)}
                </td>
                <td class="px-6 py-4">
                  ${mxn(corte.ventaFinal)}
                </td>
                <td class="px-6 py-4">
                  ${corte.comisiones}
                </td>
                <td class="px-6 py-4">
                  ${mxn(corte.comisionesMXN)}
                </td>
                <td class="px-6 py-4">
                ${mxn(corte.tarjetas)}
                </td>
                <td class="px-6 py-4">
                ${mxn(corte.tarjetas5Porciento)}
                </td>
                <td class="px-6 py-4">
                  ${mxn(corte.pagarACocina)}
                </td>
                <td class="px-6 py-4 font-semibold text-black">
                  ${corte.resultado}
                </td>
            </tr>`;
    })
    .join("")}
  </tbody>
    <tfoot>
      <tr class="font-semibold text-gray-900 dark:text-white">
          <th scope="row" class="px-6 py-3 text-base">Total</th>
          <td class="px-6 py-3"></td>
          <td class="px-6 py-3"></td>
          <td class="px-6 py-3"></td>
          <td class="px-6 py-3"></td>
          <td class="px-6 py-3">${mxn(Math.round(comisionesMXNTotales))}</td>
          <td class="px-6 py-3">${mxn(tarjetasTotales)}</td>
          <td class="px-6 py-3">${mxn(tarjetas5PorcientoTotales)}</td>
          <td class="px-6 py-3">${mxn(Math.round(pagarACocinaTotales))}</td>
      </tr>
    </tfoot>
</table>
</div>`;
};

export default viewCortes;
