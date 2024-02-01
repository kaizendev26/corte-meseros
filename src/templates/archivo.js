const cargado = (cantidad) => {
  return ` <a href="javascript:;" 
            class=" text-sm max-w-60 mt-2 flex items-center p-3  font-semibold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            <span class="flex-1 ms-3 whitespace-nowrap">💾 archivos
                cargados(${cantidad})</span>
            <span id="btnRemoverMariscos"
            class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-black dark:text-black">✖️</span>
        </a>`;
};

export default cargado;
