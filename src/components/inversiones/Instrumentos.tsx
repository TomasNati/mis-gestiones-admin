import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutline";
import SettingsBackupRestoreOutlinedIcon from "@mui/icons-material/SettingsBackupRestoreOutlined";
import { DeleteConfirmationDialog } from "dialogs/DeleteConfirmationDialog";
import { FiltroActivas } from "components/FiltroActivas";
import { styles } from "../gestiones/styles";
import { type Density } from "utils/types";
import type { Instrumento } from "model/types";
import type { InstrumentoEdit } from "model/models";
import {
  useFetchInstrumentos,
  useCreateInstrumento,
  useDeleteInstrumento,
  useEditarInstrumento,
} from "hooks/useInstrumentosHooks";
import axios from "axios";
import { INSTRUMENTO_TIPO } from "utils/constants";
import type { CryptoQuoteResponse } from "model/types";
import { InstrumentoCreateEditDialog } from "dialogs/InstrumentoCreateEditDialog";

export const Instrumentos = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [createEditOpenDialog, setCreateEditOpenDialog] =
    useState<boolean>(false);
  const [instrumentoAEditar, setInstrumentoAEditar] = useState<
    Instrumento | undefined
  >(undefined);
  const [instrumentoToDelete, setInstrumentoToDelete] =
    useState<Instrumento | null>(null);
  const [soloActivas, setSoloActivas] = useState(true);
  const [density, setDensity] = useState<Density>("comfortable");
  const [precios, setPrecios] = useState<Record<string, number | string>>({});

  const columns = useMemo<MRT_ColumnDef<Instrumento>[]>(
    () => [
      { accessorKey: "nombre", header: "Nombre", size: 200 },
      { accessorKey: "codigo", header: "Código", size: 120 },
      { accessorKey: "tipo", header: "Tipo", size: 120 },
      { accessorKey: "clase_renta", header: "Clase Renta", size: 140 },
      { accessorKey: "moneda", header: "Moneda", size: 100 },
      {
        id: "precio",
        header: "Precio",
        size: 140,
        Cell: ({ row }) => {
          const ins = row.original as Instrumento;
          if (ins.tipo !== INSTRUMENTO_TIPO.CRIPTO) return null;
          const p = precios[ins.id];
          if (p == null || p === "") return "Loading...";
          if (typeof p === "number") {
            try {
              return new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              }).format(p as number);
            } catch {
              return String(p);
            }
          }
          return String(p);
        },
      },
    ],
    [precios],
  );

  const { isError, isLoading, data } = useFetchInstrumentos(soloActivas);
  const { mutateAsync: createInstrumento, isPending: isCreating } =
    useCreateInstrumento();
  const { mutateAsync: actualizarInstrumento, isPending: isUpdating } =
    useEditarInstrumento();
  const { mutateAsync: eliminarInstrumento, isPending: isDeleting } =
    useDeleteInstrumento();

  const openDeleteConfirmModal = (row: MRT_Row<Instrumento>) => {
    setInstrumentoToDelete(row.original);
    setDeleteDialogOpen(true);
  };
  const closeDeleteConfirmModal = () => {
    setInstrumentoToDelete(null);
    setDeleteDialogOpen(false);
  };

  const openCreateEditDialog = (instrumento?: Instrumento) => {
    setInstrumentoAEditar(instrumento);
    setCreateEditOpenDialog(true);
  };
  const closeCreateEditDialog = () => {
    setInstrumentoAEditar(undefined);
    setCreateEditOpenDialog(false);
  };

  const handleCreateEditInstrumento = async (instrumento: any) => {
    if (instrumentoAEditar) {
      await actualizarInstrumento(instrumento);
    } else {
      await createInstrumento(instrumento);
    }
    closeCreateEditDialog();
  };

  const onDeleteInstrumento = async () => {
    if (!instrumentoToDelete) return;
    await eliminarInstrumento(instrumentoToDelete.id);
    closeDeleteConfirmModal();
  };

  const handleSoloActivasChanged = (solo: boolean) => {
    setSoloActivas(solo);
  };

  const handleRestoreInstrumento = async (instrumento: Instrumento) => {
    const instrumentoEdit = {
      ...instrumento,
      active: true,
    } as unknown as InstrumentoEdit;
    await actualizarInstrumento(instrumentoEdit);
  };

  useEffect(() => {
    const fetchPrecios = async () => {
      if (!data || data.length === 0) return;
      const criptos = data.filter((i) => i.tipo === INSTRUMENTO_TIPO.CRIPTO);
      if (criptos.length === 0) return setPrecios({});

      const results = await Promise.allSettled(
        criptos.map(async (ins) => {
          try {
            const identifier = ins.codigo ?? ins.nombre;
            const url = `https://mis-gestiones-backend.vercel.app/api/cotizaciones/crypto/${encodeURIComponent(
              identifier,
            )}`;
            const resp = await axios.get(url);
            const raw = resp?.data as any;
            const mapped: CryptoQuoteResponse = {
              Id: raw.id ?? raw.Id ?? "",
              Nombre: raw.nombre ?? raw.Nombre ?? "",
              PrecioUsd:
                raw.precio_usd ?? raw.PrecioUsd ?? raw.precioUsd ?? null,
              PrecioArs:
                raw.precio_ars ?? raw.PrecioArs ?? raw.precioArs ?? null,
              FechaActualizacion:
                raw.fecha_actualizacion ?? raw.FechaActualizacion ?? "",
            };
            const precioVal = mapped.PrecioUsd ?? null;
            return { id: ins.id, precio: precioVal } as {
              id: string;
              precio: number | null;
            };
          } catch (e) {
            return { id: ins.id, precio: null };
          }
        }),
      );
      const map: Record<string, number | string> = {};
      results.forEach((r) => {
        if (r.status === "fulfilled") {
          map[r.value.id] = r.value.precio ?? "";
        }
      });
      setPrecios(map);
    };
    fetchPrecios();
  }, [data]);

  const table = useMaterialReactTable({
    columns,
    data,
    rowCount: data.length,
    onDensityChange: setDensity,
    muiTableBodyRowProps: ({ row }) => ({
      sx: styles.row({ active: row.original.active, density }),
    }),
    muiTableBodyCellProps: () => ({
      sx: styles.cell({ tipoGrilla: "categoria" }),
    }),
    muiTableHeadCellProps: () => ({
      sx: styles.cell({ tipoGrilla: "categoria" }),
    }),
    initialState: {
      sorting: [{ id: "nombre", desc: false }],
      pagination: { pageSize: 15, pageIndex: 0 },
    },
    state: {
      isLoading,
      isSaving: isCreating || isUpdating || isDeleting,
      showAlertBanner: isError,
      density,
    },
    muiToolbarAlertBannerProps: isError
      ? { color: "error", children: "Error loading instrumentos" }
      : undefined,
    renderTopToolbarCustomActions: () => (
      <Button
        startIcon={<AddCircleOutlineIcon />}
        variant="outlined"
        color="secondary"
        onClick={() => openCreateEditDialog()}
      >
        Crear Instrumento
      </Button>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <>
        <FiltroActivas
          soloActivas={soloActivas}
          onSoloActivasChanged={handleSoloActivasChanged}
        />
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </>
    ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {row.original.active ? (
          <>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                onClick={() => openCreateEditDialog(row.original)}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="primary"
                onClick={() => openDeleteConfirmModal(row)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Restore">
            <IconButton
              color="primary"
              onClick={() => handleRestoreInstrumento(row.original)}
            >
              <SettingsBackupRestoreOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
    enableEditing: true,
    getRowId: (row) => row.id,
  });

  return (
    <>
      <DeleteConfirmationDialog
        onClose={closeDeleteConfirmModal}
        open={deleteDialogOpen}
        onConfirm={onDeleteInstrumento}
        description={`Instrumento "${instrumentoToDelete?.nombre}"`}
      />
      <InstrumentoCreateEditDialog
        open={createEditOpenDialog}
        onClose={closeCreateEditDialog}
        onSubmit={handleCreateEditInstrumento}
        initialInstrumento={
          (instrumentoAEditar as Partial<InstrumentoEdit>) ?? {}
        }
      />
      <MaterialReactTable table={table} />
    </>
  );
};
