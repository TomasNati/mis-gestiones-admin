import type { Categoria } from "model/types";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

const fakeCategorias: Categoria[] = [
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d6a",
    nombre: "Educación",
    comentarios: null,
    subcategorias: [
      {
        id: "41b3e23f-1e9b-4c6f-94f2-a3d3821bb24f",
        nombre: "Cursos",
        comentarios: null,
      },
      {
        id: "550703ab-3245-4c66-a6e2-edeb80053cbd",
        nombre: "Otros",
        comentarios: null,
      },
      {
        id: "482a3d6d-b067-4181-99bf-9201f6ae2732",
        nombre: "Materiales escuela",
        comentarios: null,
      },
      {
        id: "a5618f61-d2f2-4c54-be97-77521e0e905f",
        nombre: "Colegio",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d6b",
    nombre: "Hijos",
    comentarios: null,
    subcategorias: [
      {
        id: "284fc189-3879-4876-b7ca-7e7ffddff12b",
        nombre: "Deportes y juegos",
        comentarios: null,
      },
      {
        id: "ce16188d-8926-4115-9678-f899ab692337",
        nombre: "Otros",
        comentarios: null,
      },
      {
        id: "0ca9dfa2-7850-4459-b833-6ceb0ff36ac8",
        nombre: "Medicamentos",
        comentarios: null,
      },
      {
        id: "84edcca4-f102-4a99-83e0-8a8cad82b6fd",
        nombre: "Actividades",
        comentarios: null,
      },
      {
        id: "9c90e9f1-7262-4f0a-a0ba-e88876b731be",
        nombre: "Higiene",
        comentarios: null,
      },
      {
        id: "fc49d0cb-51ee-4628-a019-40240edadbde",
        nombre: "Ropa",
        comentarios: null,
      },
      {
        id: "aed07cba-f0e0-4953-9087-f1b7390e5535",
        nombre: "Colegio-Extras",
        comentarios: null,
      },
      {
        id: "9b5875af-913d-4138-b02c-a15c20614a19",
        nombre: "Juguetes",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d6c",
    nombre: "Entretenimiento",
    comentarios: null,
    subcategorias: [
      {
        id: "76689e72-971b-4755-8e3c-a2eab25a64f2",
        nombre: "TIC",
        comentarios: null,
      },
      {
        id: "ba13ec69-b60a-4a19-ad03-867cda161f90",
        nombre: "Otros",
        comentarios: null,
      },
      {
        id: "6f5f4346-fc38-489e-a4ff-59d0a0c9804b",
        nombre: "Lawn Tennis",
        comentarios: null,
      },
      {
        id: "cd31d1d9-7b6b-485e-b967-583c955927da",
        nombre: "Spotify",
        comentarios: null,
      },
      {
        id: "3d5cd77d-653c-491d-a944-3b6a33770c90",
        nombre: "Readers & Digest",
        comentarios: null,
      },
      {
        id: "e96cdf6c-1d0b-4fcf-92bd-e7e23df359fa",
        nombre: "HBO Max",
        comentarios: null,
      },
      {
        id: "54254233-02c4-42c1-a467-e275a4143b9a",
        nombre: "Disney+",
        comentarios: null,
      },
      {
        id: "cf5595ac-9079-4345-90de-ccbb5b3b49b3",
        nombre: "Libros",
        comentarios: null,
      },
      {
        id: "1ed7e69b-aa38-405d-b4fd-cb87dcfdbde9",
        nombre: "Deporte",
        comentarios: null,
      },
      {
        id: "317a66ed-af0e-4b84-a77e-efbb31c33948",
        nombre: "Teatro",
        comentarios: null,
      },
      {
        id: "66911a27-4e5f-445e-b124-c981817265e0",
        nombre: "Netflix",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d6d",
    nombre: "Diario",
    comentarios: null,
    subcategorias: [
      {
        id: "ede87023-cf7a-4375-bad0-1739e31bf470",
        nombre: "Supermercado",
        comentarios: null,
      },
      {
        id: "a544c67b-969b-486c-a859-6e1087da9858",
        nombre: "Peluqueria/Belleza",
        comentarios: null,
      },
      {
        id: "40427b72-ded3-44a5-b166-11f03617f7f9",
        nombre: "Otras",
        comentarios: null,
      },
      {
        id: "c4fb8b43-6697-4bc3-84c1-ee0fa34ae3af",
        nombre: "Alcohol",
        comentarios: null,
      },
      {
        id: "3990f166-fbd5-4227-9480-40064c290689",
        nombre: "Comida",
        comentarios: null,
      },
      {
        id: "668eeba2-9d52-4ed3-a46d-337d539e94f3",
        nombre: "Restaurants",
        comentarios: null,
      },
      {
        id: "75eab0ce-6248-402d-96e9-2356e3bbcc96",
        nombre: "Productos personales",
        comentarios: null,
      },
      {
        id: "3f69985d-ac48-407d-b36d-0c05022697ed",
        nombre: "Ropa",
        comentarios: null,
      },
      {
        id: "c7682c23-aacb-4cd1-8169-ac63248c1233",
        nombre: "Cig",
        comentarios: null,
      },
      {
        id: "b2031fc3-be75-4a91-b584-f22436e70a14",
        nombre: "Gaseosas",
        comentarios: null,
      },
    ],
  },
  {
    id: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
    nombre: "Regalos",
    comentarios: null,
    subcategorias: [
      {
        id: "87c5632c-9b3e-43a9-a60c-f401c4443d58",
        nombre: "Donaciones",
        comentarios: null,
      },
      {
        id: "f8a0cfb0-17ef-4194-9b92-f41918fbb2b0",
        nombre: "Otras",
        comentarios: null,
      },
      {
        id: "9ca0e67d-db40-4435-85b0-46cf5d607b6a",
        nombre: "Regalos",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d6e",
    nombre: "Salud",
    comentarios: null,
    subcategorias: [
      {
        id: "f2f450ed-4695-4f3c-aab5-4c9c11de45f7",
        nombre: "Otro",
        comentarios: null,
      },
      {
        id: "2dd77fcd-8478-44d7-9c46-bb53f3e3425c",
        nombre: "Maestra de apoyo",
        comentarios: null,
      },
      {
        id: "daafa406-1687-4c56-9d2c-3fe7cd5b8269",
        nombre: "Doctores",
        comentarios: null,
      },
      {
        id: "612c7227-3a3e-43e8-ad67-f45fda448582",
        nombre: "Farmacia",
        comentarios: null,
      },
      {
        id: "b6e5694b-f329-4464-8b80-e60306f0fb86",
        nombre: "Psicologos",
        comentarios: null,
      },
      {
        id: "4996faa8-daa5-460c-9377-0e5e92de3bfa",
        nombre: "Lentes - Óptica",
        comentarios: null,
      },
      {
        id: "e2079bb3-6264-4e72-a77f-02751847930d",
        nombre: "Acompañante terapéutico",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d6f",
    nombre: "Hogar",
    comentarios: null,
    subcategorias: [
      {
        id: "a69b9d11-1812-4354-96e6-e72708f19363",
        nombre: "Mudanza",
        comentarios: null,
      },
      {
        id: "e4fe4945-4e89-445b-bac0-eb907cdc3245",
        nombre: "Otras",
        comentarios: null,
      },
      {
        id: "e8362bf6-66f8-469e-a203-218fd52c9fb6",
        nombre: "Extras Claudia",
        comentarios: null,
      },
      {
        id: "b690f34a-169c-4d90-8ea0-51ad89272ae1",
        nombre: "Muebles",
        comentarios: null,
      },
      {
        id: "dc548e98-3516-4a6f-a536-4a9a6443fbcb",
        nombre: "Jardin",
        comentarios: null,
      },
      {
        id: "314ee9b4-3488-44be-a681-21dfa859a61c",
        nombre: "Cosas para la casa",
        comentarios: null,
      },
      {
        id: "7263dbb5-b54a-4e18-93f4-96ae29396fda",
        nombre: "Mantenimiento",
        comentarios: null,
      },
      {
        id: "8a962fce-890e-4cc8-8065-6eeb0b7db638",
        nombre: "Mejora",
        comentarios: null,
      },
      {
        id: "4ff1671a-6bfc-4dff-82c0-3e7b88359d3a",
        nombre: "Aportes Claudia",
        comentarios: null,
      },
      {
        id: "666a77ac-2035-41bf-a830-f7fd10513d5c",
        nombre: "Sueldo Claudia",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d60",
    nombre: "Seguros",
    comentarios: null,
    subcategorias: [
      {
        id: "e43cc246-50ff-49b5-8f08-58b35e4ebeff",
        nombre: "Salud",
        comentarios: null,
      },
      {
        id: "125eed24-e8c8-44c6-ab9c-a83adf4f06ce",
        nombre: "Hogar",
        comentarios: null,
      },
      {
        id: "f01ea181-28c7-495b-a7f1-5dc6ea9f8723",
        nombre: "Vida",
        comentarios: null,
      },
      {
        id: "ec334493-a4ac-415f-9132-9c127d29fbb2",
        nombre: "Otro",
        comentarios: null,
      },
      {
        id: "495b62c6-921b-4c3f-9ab3-3fde8f9b88e2",
        nombre: "Auto",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d61",
    nombre: "Tecnologia",
    comentarios: null,
    subcategorias: [
      {
        id: "4f2a831f-f22d-4199-8715-b54de7765d38",
        nombre: "Otros",
        comentarios: null,
      },
      {
        id: "50e1ce59-a52e-4185-a487-acf84a584717",
        nombre: "Hardware",
        comentarios: null,
      },
      {
        id: "d55541b0-3398-47fe-8a22-75621960099d",
        nombre: "Software",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d62",
    nombre: "Transporte",
    comentarios: null,
    subcategorias: [
      {
        id: "df112432-ff89-4bf0-8b9a-dda0983b4429",
        nombre: "Transporte Publico",
        comentarios: null,
      },
      {
        id: "7fa07d7f-c0ad-4376-9c4a-fec6a906c878",
        nombre: "VTV",
        comentarios: null,
      },
      {
        id: "68b2a8e9-4da3-4b2e-9628-0d0eeb629792",
        nombre: "Cosas para el auto",
        comentarios: null,
      },
      {
        id: "2f98436d-4f72-4bdd-adf9-6c89507e4439",
        nombre: "Taxi",
        comentarios: null,
      },
      {
        id: "84d3ca73-d9fa-430b-b309-908e268af033",
        nombre: "Taller",
        comentarios: null,
      },
      {
        id: "0a931bf6-9b13-4855-a586-a57dae0705c7",
        nombre: "Nafta",
        comentarios: null,
      },
      {
        id: "fee680c3-a6c9-4f38-932d-33de0781a04c",
        nombre: "Patente auto",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d63",
    nombre: "Viajes",
    comentarios: null,
    subcategorias: [
      {
        id: "79a56cbf-78e7-4300-9519-26769b1ef66a",
        nombre: "Transporte",
        comentarios: null,
      },
      {
        id: "bbd9280e-b1bf-4899-8145-58a7d7c561ed",
        nombre: "Otros",
        comentarios: null,
      },
      {
        id: "03e1f603-5e2d-43d5-83ba-08030f8df5ab",
        nombre: "Comida",
        comentarios: null,
      },
      {
        id: "80827210-6ab0-4325-9979-73ffd73f703f",
        nombre: "Hoteles",
        comentarios: null,
      },
      {
        id: "9ce40e92-3a81-4373-b2db-9f7a74556917",
        nombre: "Avion",
        comentarios: null,
      },
      {
        id: "c4ac890e-5ba0-4c11-967e-1b2ecf68e0d4",
        nombre: "Entretenimiento",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d64",
    nombre: "Servicios",
    comentarios: null,
    subcategorias: [
      {
        id: "6b7c85d7-3335-43ba-aaab-e70b902ecaaf",
        nombre: "Other",
        comentarios: null,
      },
      {
        id: "8d18954a-a5de-40be-8515-5bcca231bb9c",
        nombre: "Patente",
        comentarios: null,
      },
      {
        id: "671e440e-5c4a-4a15-806d-441f38f9b24c",
        nombre: "Dto. Tuc-Cór - Gasnor",
        comentarios: null,
      },
      {
        id: "2a16dabd-0600-4767-a713-d1bb6ba627fb",
        nombre: "Personal",
        comentarios: null,
      },
      {
        id: "44d7d98e-8ce8-4a93-868a-2d7bd51f8cdf",
        nombre: "Edese",
        comentarios: null,
      },
      {
        id: "77d6eb72-e3a8-4417-9ce8-ba59123c69f3",
        nombre: "Gasnor",
        comentarios: null,
      },
      {
        id: "752ae6bf-b486-4033-b92f-ffef9e4a271c",
        nombre: "Santiago - Inmobiliario municipal",
        comentarios: null,
      },
      {
        id: "8b326350-cbe9-4633-9bfd-f67ed9a8c638",
        nombre: "Aguas de Santiago",
        comentarios: null,
      },
      {
        id: "2df913d3-c627-4ac6-b6fb-210afa9aa8ea",
        nombre: "Cablevision",
        comentarios: null,
      },
      {
        id: "3351b34b-b8e0-45ce-bea8-acec4fa8e49b",
        nombre: "Contadora",
        comentarios: null,
      },
      {
        id: "b7c53d13-1af1-4de4-8315-61f47bee318f",
        nombre: "Santiago - Rentas provincial",
        comentarios: null,
      },
      {
        id: "cf9994c2-5a8d-4f30-8797-e6ff9fa2654c",
        nombre: "Dto. Tuc-Cór - SAT",
        comentarios: null,
      },
      {
        id: "b66eb6bc-4bc9-49db-bdaa-9d2b79c2e2e0",
        nombre: "Dto. Tuc-Cór - Edet",
        comentarios: null,
      },
      {
        id: "d9a99882-cc0e-414a-a89f-a83be92a9559",
        nombre: "Dto. Tuc-Cór - DGR",
        comentarios: null,
      },
      {
        id: "dbf160e0-cd11-4dfa-ab1b-dc4d3b59ed61",
        nombre: "Dto. Tuc-Cór - CISI",
        comentarios: null,
      },
      {
        id: "41c4e23d-55f6-4e9b-ae53-046e5ad1096c",
        nombre: "Dto. Tuc-Mar - DGR",
        comentarios: null,
      },
      {
        id: "4092d83a-5170-4616-bb47-f00ae27da710",
        nombre: "Bahía - ABSA",
        comentarios: null,
      },
      {
        id: "15be16e1-fb76-4a13-bdda-2bb589ee8b10",
        nombre: "Bahía - Municipal",
        comentarios: null,
      },
      {
        id: "886b95de-5739-4a7f-ab37-4365a751224a",
        nombre: "Bahía - ARBA",
        comentarios: null,
      },
      {
        id: "46916604-b612-43fd-bf9c-61d83e178a34",
        nombre: "Monotributo Nati",
        comentarios: null,
      },
    ],
  },
  {
    id: "b734c8e2-6d78-4a8f-9c36-ad2f0f1e9d65",
    nombre: "Other",
    comentarios: null,
    subcategorias: [
      {
        id: "976cdbe2-71ba-4a3e-b66b-52d191f15b15",
        nombre: "Cripto",
        comentarios: null,
      },
      {
        id: "bb814ac0-ae30-481c-9164-71868798d737",
        nombre: "Emilio",
        comentarios: null,
      },
      {
        id: "5be3d25e-4f79-4416-bd9b-f7f0b485d9c3",
        nombre: "Otros",
        comentarios: null,
      },
    ],
  },
];

interface CategoriaProps {
  categorias: Categoria[];
}
export const Categorias = ({ categorias }: CategoriaProps) => {
  const columns = useMemo<MRT_ColumnDef<Categoria>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre",
      },
      {
        accessorFn: (categoria: Categoria) => categoria.subcategorias?.length,
        id: "cantidadSubcategorias",
        header: "Cantidad de Subcategorias",
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: fakeCategorias,
  });

  return <MaterialReactTable table={table} />;
};
