const { defaults } = require("autoprefixer");

const productos = [
  {
    clave: "5",
    producto: "CUERVO TRADICIONAL",
    comision: "1",
  },
  {
    clave: "6",
    producto: "HERRADURA REPOSADO",
    comision: "1",
  },
  {
    clave: "76",
    producto: "1800",
    comision: "1",
  },
  {
    clave: "77",
    producto: "CUERVO ESPECIAL",
    comision: "1",
  },
  {
    clave: "78",
    producto: "COMPADRE",
    comision: "1",
  },
  {
    clave: "81",
    producto: "HERRADURA BLANCO",
    comision: "1",
  },
  {
    clave: "344",
    producto: "DON JULIO 70",
    comision: "1",
  },
  {
    clave: "367",
    producto: "1800 CRI5T.",
    comision: "1",
  },
  {
    clave: "463",
    producto: "BOT. DON JULIO 70",
    comision: "0",
  },
  {
    clave: "466",
    producto: "MEZCAL",
    comision: "1",
  },
  {
    clave: "523",
    producto: "1800 CRISTALINO",
    comision: "1",
  },
  {
    clave: "11",
    producto: "BACARDI BLANCO SOLERA",
    comision: "1",
  },
  {
    clave: "13",
    producto: "FLOR DE CANA 7 A",
    comision: "1",
  },
  {
    clave: "17",
    producto: "TORRES 10",
    comision: "1",
  },
  {
    clave: "473",
    producto: "TORRES 15",
    comision: "1",
  },
  {
    clave: "688",
    producto: "BOTELLA TORRES 5",
    comision: "0",
  },
  {
    clave: "19",
    producto: "ABSOLUT AZUL",
    comision: "0",
  },
  {
    clave: "91",
    producto: "OSO NEGRO",
    comision: "1",
  },
  {
    clave: "22",
    producto: "BUCHANA S 12",
    comision: "1",
  },
  {
    clave: "23",
    producto: "CHIVAS",
    comision: "0",
  },
  {
    clave: "24",
    producto: "ETIQUETA NEGRA",
    comision: "1",
  },
  {
    clave: "25",
    producto: "BUCHANAS 18",
    comision: "1",
  },
  {
    clave: "93",
    producto: "ETIQUETA ROJA",
    comision: "1",
  },
  {
    clave: "224",
    producto: "LAMBRUSCO 750",
    comision: "0",
  },
  {
    clave: "266",
    producto: "COPA DE VINO",
    comision: "0",
  },
  {
    clave: "491",
    producto: "CUATRO SOLES",
    comision: "0",
  },
  {
    clave: "520",
    producto: "RESERVADO CONCHA",
    comision: "0",
  },
  {
    clave: "34",
    producto: "BAYLES",
    comision: "0",
  },
  {
    clave: "35",
    producto: "CHICHON DULCE",
    comision: "0",
  },
  {
    clave: "36",
    producto: "CHICHON SECO",
    comision: "0",
  },
  {
    clave: "37",
    producto: "SAMBUCA VACCARI",
    comision: "0",
  },
  {
    clave: "351",
    producto: "CAMPECHANO",
    comision: "0",
  },
  {
    clave: "38",
    producto: "AMARETO DI SARONO",
    comision: "0",
  },
  {
    clave: "39",
    producto: "KHALUA",
    comision: "0",
  },
  {
    clave: "40",
    producto: "LICOR 43",
    comision: "0",
  },
  {
    clave: "98",
    producto: "CONTROY",
    comision: "0",
  },
  {
    clave: "127",
    producto: "ZAMBUCA NGO.",
    comision: "0",
  },
  {
    clave: "143",
    producto: "FRAN YAELICO",
    comision: "0",
  },
  {
    clave: "152",
    producto: "ZAMUCA VCO.",
    comision: "0",
  },
  {
    clave: "362",
    producto: "STREGA",
    comision: "0",
  },
  {
    clave: "57",
    producto: "JARRA DE CLERIOCOT",
    comision: "5",
  },
  {
    clave: "58",
    producto: "JARRA DE CAIPIRINHA",
    comision: "5",
  },
  {
    clave: "59",
    producto: "JARRA DE CAIPIFRUTA",
    comision: "4",
  },
  {
    clave: "100",
    producto: "CAIPIFRUTAS",
    comision: "1",
  },
  {
    clave: "133",
    producto: "RUSA",
    comision: "0",
  },
  {
    clave: "137",
    producto: "1/2 JARRA D CAIPIRINNA",
    comision: "2",
  },
  {
    clave: "163",
    producto: "JARRA DE CONGA",
    comision: "4",
  },
  {
    clave: "203",
    producto: "JARRA DE BULL",
    comision: "5",
  },
  {
    clave: "267",
    producto: "1/2 JARRA DE CONGA",
    comision: "2",
  },
  {
    clave: "297",
    producto: "1/2 J. CAIPIFRUTAS",
    comision: "2",
  },
  {
    clave: "299",
    producto: "1/2 J.CLERICOT",
    comision: "2",
  },
  {
    clave: "411",
    producto: "1/2 JARRA BULL",
    comision: "2",
  },
  {
    clave: "489",
    producto: "PINADA",
    comision: "0",
  },
  {
    clave: "541",
    producto: "JARRA DE JAMAICA",
    comision: "4",
  },
  {
    clave: "629",
    producto: "CONGA",
    comision: "1",
  },
  {
    clave: "689",
    producto: "JARRA DE HORCHATA",
    comision: "4",
  },
  {
    clave: "690",
    producto: "1/2 JARRA JAMAICA",
    comision: "2",
  },
  {
    clave: "691",
    producto: "1/2 JARRA HORCHATA",
    comision: "2",
  },
  {
    clave: "692",
    producto: "COPA JAMAICA",
    comision: "1",
  },
  {
    clave: "693",
    producto: "COPA HORCHATA",
    comision: "1",
  },
  {
    clave: "61",
    producto: "BULL",
    comision: "1",
  },
  {
    clave: "62",
    producto: "CLAMATO",
    comision: "0",
  },
  {
    clave: "63",
    producto: "COPA CLRERICOT",
    comision: "0",
  },
  {
    clave: "64",
    producto: "MARGARITA",
    comision: "1",
  },
  {
    clave: "65",
    producto: "MEDIAS DE SEDA",
    comision: "1",
  },
  {
    clave: "69",
    producto: "VAMPIRO",
    comision: "1",
  },
  {
    clave: "70",
    producto: "CAIPIRINHA",
    comision: "1",
  },
  {
    clave: "164",
    producto: "PREPARADO DE CLERICOT",
    comision: "0",
  },
  {
    clave: "193",
    producto: "BEERMATO CORONA",
    comision: "0",
  },
  {
    clave: "195",
    producto: "CHELADA CORONA",
    comision: "0",
  },
  {
    clave: "337",
    producto: "JARRA 7 MARES",
    comision: "5",
  },
  {
    clave: "382",
    producto: "JARRA LAGUNA AZUL",
    comision: "5",
  },
  {
    clave: "384",
    producto: "JARRA LIM ELECTRICA",
    comision: "5",
  },
  {
    clave: "481",
    producto: "PINA COLADA CON BAYLES",
    comision: "1",
  },
  {
    clave: "483",
    producto: "CARAJILLO",
    comision: "2",
  },
  {
    clave: "494",
    producto: "MICHELADA",
    comision: "0",
  },
  {
    clave: "524",
    producto: "PALOMA",
    comision: "1",
  },
  {
    clave: "525",
    producto: "MANGOCHELA/ULTRA",
    comision: "0",
  },
  {
    clave: "544",
    producto: "MICHELADA VICTORIA",
    comision: "0",
  },
  {
    clave: "545",
    producto: "MICHELADA ULTRA",
    comision: "0",
  },
  {
    clave: "546",
    producto: "MICHELADA MOD. ESPECIAL",
    comision: "0",
  },
  {
    clave: "547",
    producto: "BEERMATO VICTORIA",
    comision: "0",
  },
  {
    clave: "548",
    producto: "BEERMATO ULTRA",
    comision: "0",
  },
  {
    clave: "549",
    producto: "BEERMATO MOD. ESPECIAL",
    comision: "0",
  },
  {
    clave: "550",
    producto: "CHELADA VICTORIA",
    comision: "0",
  },
  {
    clave: "551",
    producto: "CHELADA ULTRA",
    comision: "0",
  },
  {
    clave: "552",
    producto: "CHELADA MOD. ESPECIAL",
    comision: "0",
  },
  {
    clave: "556",
    producto: "BERMATO NEGRA MODELO",
    comision: "0",
  },
  {
    clave: "557",
    producto: "MICHELADA NEGRA MODELO",
    comision: "0",
  },
  {
    clave: "558",
    producto: "PINA",
    comision: "0",
  },
  {
    clave: "568",
    producto: "JARRA PINA COLADA C/RON",
    comision: "0",
  },
  {
    clave: "571",
    producto: "PERLAS NEGRAS",
    comision: "0",
  },
  {
    clave: "572",
    producto: "CLAMATOO",
    comision: "0",
  },
  {
    clave: "573",
    producto: "BERMATO",
    comision: "0",
  },
  {
    clave: "574",
    producto: "SEXO PLAYA",
    comision: "0",
  },
  {
    clave: "578",
    producto: "1/2 LIM. ELECTRICA",
    comision: "2",
  },
  {
    clave: "590",
    producto: "MICHELADA/STELLA",
    comision: "0",
  },
  {
    clave: "592",
    producto: "BEERMATO BUD L.",
    comision: "0",
  },
  {
    clave: "594",
    producto: "MICHELADA BUD LIGHT",
    comision: "0",
  },
  {
    clave: "604",
    producto: "SERVICIO (AGUA MINERAL)",
    comision: "0",
  },
  {
    clave: "621",
    producto: "MANGO CHELA/CORONA",
    comision: "0",
  },
  {
    clave: "680",
    producto: "1/2 JARRA VAMPIRO",
    comision: "2",
  },
  {
    clave: "118",
    producto: "CAFE CAPUCHINO",
    comision: "1",
  },
  {
    clave: "119",
    producto: "CAFE AMERICANO",
    comision: "1",
  },
  {
    clave: "197",
    producto: "CAFE EXPRESO",
    comision: "1",
  },
  {
    clave: "485",
    producto: "CHEESECAKE ZARZAMORA",
    comision: "1",
  },
  {
    clave: "486",
    producto: "CHEESECAKE LIMON",
    comision: "1",
  },
  {
    clave: "487",
    producto: "CHEESCAKE DE FRUTAS",
    comision: "1",
  },
  {
    clave: "488",
    producto: "CHOCOFLAN",
    comision: "1",
  },
  {
    clave: "497",
    producto: "CHEESECAKE TORTUGA",
    comision: "1",
  },
  {
    clave: "501",
    producto: "PAY DE QUESO",
    comision: "1",
  },
  {
    clave: "505",
    producto: "CHEESECAKE FRESA",
    comision: "1",
  },
  {
    clave: "506",
    producto: "FLAN",
    comision: "1",
  },
  {
    clave: "509",
    producto: "PASTEL CHOCOLATE",
    comision: "1",
  },
  {
    clave: "511",
    producto: "FRUTOS ROJOS",
    comision: "1",
  },
  {
    clave: "514",
    producto: "CHOCOMILK",
    comision: "0",
  },
  {
    clave: "515",
    producto: "FRAPPE",
    comision: "0",
  },
  {
    clave: "561",
    producto: "PASTEL 3 LECHES",
    comision: "1",
  },
  {
    clave: "587",
    producto: "CHEESECAKE TURIN",
    comision: "1",
  },
  {
    clave: "605",
    producto: "PAY CASEROS",
    comision: "1",
  },
  {
    clave: "649",
    producto: "CAFE MANANERO",
    comision: "1",
  },
  {
    clave: "652",
    producto: "CHOCOFLAN CAJETA",
    comision: "1",
  },
  {
    clave: "686",
    producto: "PASTEL 1",
    comision: "1",
  },
];

export default productos;
