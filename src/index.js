import "./styles/main.css";
import "flowbite";
import Swal from "sweetalert2";
import productos from "./productos";
import viewCortes from "./templates/cortes";
import { viewTarjetas, obtenerTarjetasPorMesero } from "./templates/tarjetas";
import mxn from "./utils/formatoMoneda";
import cargado from "./templates/archivo";
import * as XLSX from "xlsx";

// localStorage.setItem("mariscos", {});

let $ = (id) => document.getElementById(id);

const mariscoFiles = $("fileUploadMarisco");
const cenaFiles = $("fileUploadCena");
const VALOR_COMISION = 5;
const PORCENTAJE_MARISCO = 0.05;
const PORCENTAJE_CENA = 0.04;

function leerArchivoExcel(archivo) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      resolve(workbook);
    };

    reader.readAsBinaryString(archivo);
  });
}

async function procesarArchivos(archivos) {
  let corteMeseros = [];
  for (const archivo of archivos) {
    try {
      const workbook = await leerArchivoExcel(archivo);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const corte = obtenerClavesProducto(sheet);
      corteMeseros.push(corte);
    } catch (error) {
      console.error(`Error al leer el archivo ${archivo.name}:`, error);
    }
  }

  return corteMeseros;

  //procesarCortesMeseros(corteMeseros);
}

const obtenerClavesProducto = (sheet) => {
  const columnaClaves = "A";

  const celdasClaves = Object.keys(sheet)
    .filter((key) => key.startsWith(columnaClaves))
    .sort();

  const celdasClavesSinTitulo = celdasClaves.filter((celda) => {
    const rowIndex = Number(celda.substring(1));
    return rowIndex > 8;
  });

  const dataCeldas = [];

  celdasClavesSinTitulo.forEach((celdaClave) => {
    let columnaClave = sheet["E8"]?.v != undefined ? "E" : "F";
    let celdaCantidad = celdaClave.replace("A", columnaClave);
    let celdaVenta = celdaClave.replace("A", "G");
    dataCeldas.push([celdaClave, celdaCantidad, celdaVenta]);
  });

  const dataValues = dataCeldas.map((celda) => [
    sheet[celda[0]].v,
    sheet[celda[1]].v,
    sheet[celda[2]].v,
  ]);

  let corte = [];
  dataValues.forEach((value) => {
    const obj = {
      clave: value[0],
      cantidad: value[1],
      venta: value[2],
    };
    corte.push(obj);
  });

  return {
    mesero: sheet["E6"]?.v != undefined ? sheet["E6"]?.v : sheet["D6"]?.v,
    venta: corte.reduce((total, item) => total + item.venta, 0),
    corte: corte,
  };
};

// const procesarCortesMeseros = (cortes) => {
//   let corteMeserosFormateado = [];
//   for (const corte of cortes) {
//     let comision = obtenerComisionesPorMesero(corte);
//     let comisionesMXN = comision * VALOR_COMISION;
//     let porcentajeCocina = Math.round(corte.venta * 0.05);
//     let resultado = Math.round(porcentajeCocina - (comisionesMXN + 1000));

//     resultado =
//       resultado < 0
//         ? `Te pago ${Math.abs(mxn(resultado))}`
//         : resultado > 0
//         ? `Me pagas ${resultado}`
//         : "No pagas";

//     const corteFormateado = {
//       mesero: corte.mesero,
//       comisiones: comisionesMXN,
//       venta: corte.venta,
//       pagaracocina: porcentajeCocina,
//       resultado: resultado,
//     };
//     corteMeserosFormateado.push(corteFormateado);
//   }

//   const htmlCortes = viewCortes(corteMeserosFormateado);
//   const content = $("resumen");
//   content.innerHTML = htmlCortes;

//   console.log(corteMeserosFormateado);
// };

const obtenerComisionesPorMesero = (corte) => {
  let comisiones = [];
  corte.corte.forEach((val) => {
    let producto = productos.find((producto) => {
      return producto.clave == val.clave;
    });

    if (producto !== undefined) {
      comisiones.push(val.cantidad * parseInt(producto.comision));
    }
  });

  return comisiones.reduce((total, item) => total + item, 0);
};

const procesarCortes = (corteCena) => {
  let cortesMarisco = JSON.parse(localStorage.getItem("marisco"));
  let corteFormateado = juntarCortes(cortesMarisco, corteCena);

  const htmlCortes = viewCortes(corteFormateado);
  const content = $("resumen");
  content.innerHTML = htmlCortes;
};

function juntarCortes(corteMarisco, corteCena) {
  let corteFinal = [];

  for (const corte of corteMarisco) {
    let mesero = corte.mesero;
    let corteCenaEncontrado = corteCena.find((corte) => corte.mesero == mesero);
    let porcentajeMarisco = corte.venta * PORCENTAJE_MARISCO;
    let porcentajeCena =
      (corteCenaEncontrado.venta - corte.venta) * PORCENTAJE_CENA;
    let comisiones = obtenerComisionesPorMesero(corteCenaEncontrado);
    let comisionesMXN = comisiones * VALOR_COMISION;
    let pagarACocina = Math.round(porcentajeMarisco + porcentajeCena);

    let tarjetas = 0;
    let items = JSON.parse(localStorage.getItem("tarjetas"));
    if (items != null) {
      let tarjetasMesero = items.find((item) => item.mesero == mesero);
      tarjetas = tarjetasMesero.tarjetas.reduce(
        (total, item) => total + parseFloat(item == "" ? 0 : item),
        0
      );
    }

    let tarjetas5Porciento = tarjetas - tarjetas * 0.05;

    let resultado = Math.round(
      pagarACocina - (comisionesMXN + tarjetas5Porciento)
    );

    resultado =
      resultado < 0
        ? `Te pago ${mxn(Math.abs(resultado))}`
        : resultado > 0
        ? `Me pagas ${mxn(resultado)}`
        : "No pagas";

    corteFinal.push({
      mesero,
      ventaMarisco: corte.venta,
      ventaFinal: corteCenaEncontrado.venta,
      porcentajeMarisco,
      porcentajeCena,
      comisiones,
      comisionesMXN,
      tarjetas,
      tarjetas5Porciento,
      pagarACocina,
      resultado,
    });
  }

  return corteFinal;

  // console.log(corteFinal);
}

function obtenerNombreCarpeta(archivo) {
  const rutaRelativa = archivo.webkitRelativePath || "";
  const partesRuta = rutaRelativa.split("/");
  return partesRuta.length > 1 ? partesRuta[0] : "";
}

function validarCortes() {
  let cortesMarisco = localStorage.getItem("marisco");
  let cortesCena = cenaFiles.files.length;

  mensajeTexto("mensajeFileUpload", {
    html: "",
    css: "",
  });

  if (cortesMarisco == null && cortesCena == 0) {
    mensajeTexto("mensajeFileUpload", {
      html: "Carga las carpetas de marisco y cena",
      css: "text-red-500",
    });
  } else if (cortesMarisco == null) {
    mensajeTexto("mensajeFileUpload", {
      html: "Carga la carpeta de los cortes de marisco",
      css: "text-red-500",
    });
  } else if (cortesCena == 0) {
    mensajeTexto("mensajeFileUpload", {
      html: "Carga la carpeta de los cortes de cena",
      css: "text-red-500",
    });
  } else return true;

  return false;
}

function mensajeTexto(id, { html, css }) {
  $(id).className = "";

  $(id).innerHTML = html;
  css !== "" ? $(id).classList.add(css) : "";
}

function archivosMariscoCargados(cortes) {
  $("fileUploadMarisco").classList.add("hidden");
  $("contenedorCargado").classList.remove("hidden");
  $("contenedorCargado").classList.add("flex");
  $("textoCargado").innerHTML = `💾 Archivos cargados(${cortes.length})`;
}

function verificarTarjetasAnotadas() {
  // verifica que existe tarjetas anotadas
  let meserotarjeta = JSON.parse(localStorage.getItem("tarjetas"));
  if (meserotarjeta != null) {
    for (const tarjeta of meserotarjeta) {
      const inputs = document.querySelectorAll(`[data-id="${tarjeta.id}"]`);
      inputs.forEach((input, index) => {
        let value =
          tarjeta.tarjetas[index] != undefined ? tarjeta.tarjetas[index] : "";
        input.value = value;
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let cortesMarisco = JSON.parse(localStorage.getItem("marisco"));
  if (cortesMarisco !== null) archivosMariscoCargados(cortesMarisco);

  $("contenedorTarjetas").innerHTML = viewTarjetas(6);

  verificarTarjetasAnotadas();

  const inputs = document.querySelectorAll(".input-tarjeta");
  // console.log(inputs);
  inputs.forEach((input, index) => {
    input.addEventListener("keydown", function (event) {
      switch (event.key) {
        case "ArrowUp":
          if (index - 8 >= 0) {
            inputs[index - 8].focus();
          }
          break;
        case "ArrowDown":
          if (index + 8 <= inputs.length - 1) inputs[index + 8].focus();
          break;
        case "ArrowLeft":
          if (index - 1 >= 0) inputs[index - 1].focus();
          break;
        case "ArrowRight":
          if (index + 1 <= inputs.length - 1) inputs[index + 1].focus();
          break;
      }
    });

    input.addEventListener("input", function () {
      obtenerTarjetasPorMesero();
      verificarTarjetasAnotadas();
      console.log("se agrego un valor nuevo");
    });
  });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox, index) => {
    // checkbox.addEventListener("click", function (event) {
    //   let fila = event.closest("tr");
    //   console.log(fila);
    // });
    checkbox.addEventListener("click", function () {
      // Acceder al evento del checkbox
      console.log("Clic en el checkbox con ID:", this.id);
      // Realizar acciones adicionales según sea necesario
    });
  });
});

mariscoFiles.addEventListener("change", async function (e) {
  const archivos = e.target.files;

  if (archivos.length == 0) return;

  let carpeta = obtenerNombreCarpeta(archivos[0]);
  if (carpeta !== "marisco") {
    mensajeTexto("mensajeFileUpload", {
      html: "⚠️ Selecciona la carpeta llamada <strong>marisco</strong>",
      css: "text-amber-500",
    });
    return;
  }

  let cortes = [];
  cortes = await procesarArchivos(archivos);
  localStorage.setItem("marisco", JSON.stringify(cortes));

  archivosMariscoCargados(cortes);

  // console.log(cortes);
});

$("btnProcesar").addEventListener("click", async (e) => {
  e.preventDefault();
  const archivos = cenaFiles.files;
  if (validarCortes()) {
    let carpeta = obtenerNombreCarpeta(archivos[0]);
    if (carpeta !== "cena") {
      mensajeTexto("mensajeFileUpload", {
        html: "⚠️ Selecciona la carpeta llamada <strong>cena</strong>",
        css: "text-amber-500",
      });
      return;
    }

    let corteCena = await procesarArchivos(archivos);
    procesarCortes(corteCena);
  }
});

$("btnRemoverMariscos").addEventListener("click", (e) => {
  e.preventDefault();
  $("fileUploadMarisco").classList.remove("hidden");
  $("contenedorCargado").classList.add("hidden");
  localStorage.removeItem("marisco");
  console.log("archivo removido");
});

$("reiniciarEstado").addEventListener("click", (e) => {
  e.preventDefault();

  Swal.fire({
    title: "Estas seguro?",
    text: "Todas las tarjetas ingresadas y archivos cargados se borraran",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("marisco");
      localStorage.removeItem("tarjetas");
      location.reload();

      // Swal.fire({
      //   title: "Registros removidos",
      //   text: "Las tarjetas y los archivos han sido removidos",
      //   icon: "success",
      // });
    }
  });
});
