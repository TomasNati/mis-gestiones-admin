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
  useUpdateInstrumentoPrecios,
} from "hooks/useInstrumentosHooks";
import { InstrumentoCreateEditDialog } from "dialogs/InstrumentoCreateEditDialog";
import { PRECIO_FETCHERS, type PrecioFetcher } from "./utils";

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
  const updatePreciosInstrumentos = useUpdateInstrumentoPrecios();

  const columns = useMemo<MRT_ColumnDef<Instrumento>[]>(
    () => [
      { accessorKey: "nombre", header: "Nombre", size: 200 },
      { accessorKey: "codigo", header: "Código", size: 120 },
      { accessorKey: "tipo", header: "Tipo", size: 120 },
      { accessorKey: "clase_renta", header: "Clase Renta", size: 140 },
      { accessorKey: "moneda", header: "Moneda", size: 100 },
      {
        accessorKey: "precios",
        id: "precio",
        header: "Precio",
        size: 140,
        Cell: ({ row }) => {
          const p = row.original.precios;
          if (p == null) return null;
          try {
            return new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }).format(p);
          } catch {
            return String(p);
          }
        },
      },
    ],
    [],
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

  const instrumentosConFetcher = useMemo(() => {
    const pairs: { ins: Instrumento; fetcher: PrecioFetcher }[] = [];
    for (const fetcher of PRECIO_FETCHERS) {
      for (const ins of data) {
        if (ins.tipo && fetcher.tipos.includes(ins.tipo)) {
          pairs.push({ ins, fetcher });
        }
      }
    }
    return pairs;
  }, [data]);

  const instrumentosConFetcherKey = instrumentosConFetcher
    .map((p) => p.ins.id)
    .sort()
    .join(",");

  useEffect(() => {
    if (instrumentosConFetcher.length === 0) return;

    let cancelled = false;
    instrumentosConFetcher.forEach(({ ins, fetcher }) => {
      fetcher
        .fetchPrecio(ins)
        .then((precio) => {
          if (cancelled) return;
          updatePreciosInstrumentos(new Map([[ins.id, precio]]));
        })
        .catch(() => {
          // ignore — instrumento keeps its previous precio
        });
    });

    return () => {
      cancelled = true;
    };
  }, [
    instrumentosConFetcherKey,
    updatePreciosInstrumentos,
    instrumentosConFetcher,
  ]);

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
      pagination: { pageSize: 30, pageIndex: 0 },
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
