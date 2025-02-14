import { Button } from '@mui/material';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { uuidv4 } from '../utils';
import useLocalStorageState from 'use-local-storage-state';

const initialColumns: GridColDef[] = [
  { field: 'fieldName', headerName: 'Rule Name', editable: true, flex: 1 },
  { field: 'fieldExpr', headerName: 'Field Expression', editable: true, flex: 1 },
  { field: 'fieldValue', headerName: 'Field Value', editable: true, flex: 1 },
];

const initialRows: GridRowsProp = [
  { id: uuidv4(), fieldName: 'Hello', fieldExpr: 'World', fieldValue: 'Demo' },
  { id: uuidv4(), fieldName: 'DataGridPro', fieldExpr: 'is Awesome' },
  { id: uuidv4(), fieldName: 'MUI', fieldExpr: 'is Amazing' },
];

export const Rules = () => {
  const [rows, setRows] = useLocalStorageState('rules', {
    defaultValue: initialRows,
  });

  const handleDeleteRow = (id: number) => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
  };

  const columns: GridColDef[] = [
    ...initialColumns,
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: params => <button onClick={() => handleDeleteRow(params.row.id)}>Delete</button>,
    // },
  ];

  const addRow = () => {
    const newRows = [...rows, { id: uuidv4(), fieldName: '', fieldExpr: '', fieldValue: '' }];
    setRows(newRows);
  };

  return (
    <>
      <Button sx={{ mb: 3, ml: 'auto' }} onClick={addRow}>
        Add rules
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) => {
          const updatedRows = rows.map(row => {
            if (row.id === updatedRow.id) {
              return updatedRow;
            }
            return row;
          });

          setRows(updatedRows);
          return updatedRow;
        }}
      />
    </>
  );
};
