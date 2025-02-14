import { Autocomplete, Button, Chip, TextField } from '@mui/material';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { DataGrid, sanitizeFilterItemValue } from '@mui/x-data-grid';
import { uuidv4 } from '../utils';
import { useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

const initialRows: GridRowsProp = [
  { id: uuidv4(), presentNames: 'Hello', rules: [] },
  { id: uuidv4(), presentNames: 'DataGridPro', rules: [] },
  { id: uuidv4(), presentNames: 'MUI', rules: [] },
];

export const Presents = () => {
  const [rows, setRows] = useLocalStorageState('rules', {
    defaultValue: initialRows,
  });

  const addRow = () => {
    const newRows = [...rows, { id: uuidv4(), fieldName: '', fieldExpr: '', fieldValue: '' }];
    setRows(newRows);
  };

  const handleDeleteRow = (id: number) => {
    setRows(prevRows => prevRows.filter(row => row.id !== id));
  };

  const initialColumns: GridColDef[] = [
    { field: 'presentName', headerName: 'Present Name', editable: true, flex: 1 },
    {
      field: 'rules',
      headerName: 'Rules',
      editable: true,
      flex: 1,
      renderCell: params => {
        console.log({ params });

        return (
          <div>
            <Autocomplete
              value={params.value}
              onChange={(event, newValue) => {
                const rowIndex = rows.findIndex(row => row.id === params.id);

                if (rowIndex !== -1) {
                  const newRows = [...rows];
                  newRows[rowIndex].rules = newValue;
                  setRows(newRows);
                  console.log({ newRows });
                }
              }}
              multiple
              id="tags-filled"
              options={['a', 'b', 'c']}
              freeSolo
              renderInput={params => <TextField {...params} />}
            />
          </div>
        );
      },
    },
  ];

  const columns: GridColDef[] = [
    ...initialColumns,
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => <button onClick={() => handleDeleteRow(params.row.id)}>Delete</button>,
    },
  ];

  return (
    <>
      <Button sx={{ mb: 3, ml: 'auto' }} onClick={addRow}>
        Add presents
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
