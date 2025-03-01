import { Button } from '@mui/material';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { uuidv4 } from '../utils';
import { useChromeStorageLocal } from 'use-chrome-storage';
import { useEffect } from 'react';

const initialColumns: GridColDef[] = [
  { field: 'ruleName', headerName: 'Rule Name', editable: true, flex: 1 },
  { field: 'fieldExpr', headerName: 'Field Expression', editable: true, flex: 1 },
  { field: 'fieldValue', headerName: 'Field Value', editable: true, flex: 1 },
];

const initialRows: GridRowsProp = [
  { id: 'abd02067-bf90-4384-af4b-f01ad2964f23', ruleName: 'Hello', fieldExpr: 'World', fieldValue: 'Demo' },
  { id: 'c5c0aac9-ed83-4a7a-8ddd-9a48102166f7', ruleName: 'DataGridPro', fieldExpr: 'is Awesome' },
  { id: '17955fe1-106a-464f-aca6-8dc57d2b66d0', ruleName: 'MUI', fieldExpr: 'is Amazing' },
];

export const Rules = () => {
  const [rows, setRows] = useChromeStorageLocal('rules', undefined);

  useEffect(() => {
    if (!rows) {
      setRows(initialRows);
    }
  }, [rows])



  const handleDeleteRow = (id: number) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  const columns: GridColDef[] = [
    ...initialColumns,
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => <button onClick={() => handleDeleteRow(params.row.id)}>Delete</button>,
    },
  ];

  const addRow = () => {
    const newRows = [...rows, { id: uuidv4(), ruleName: '', fieldExpr: '', fieldValue: '' }];
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
