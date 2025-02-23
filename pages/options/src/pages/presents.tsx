import { Autocomplete, Button, Box, TextField } from '@mui/material';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { uuidv4 } from '../utils';
import { useMemo } from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';

const initialRows: GridRowsProp = [
  { id: uuidv4(), presentNames: 'Hello', rules: [] },
  { id: uuidv4(), presentNames: 'DataGridPro', rules: [] },
  { id: uuidv4(), presentNames: 'MUI', rules: [] },
];

export const Presents = () => {
  const [rules] = useChromeStorageLocal('rules', []);
  const [presents, setPresents] = useChromeStorageLocal('presents', initialRows);

  const mergedPresents = useMemo(() => {
    return presents?.map((present) => {

      const mergedRules = present.rules?.map((presentRule) => {
        const rule = rules.find((rule) => rule.id === presentRule.id);
        return rule;
      }).filter(Boolean);

      return { ...present, rules: mergedRules || [] };
    });
  }, [presents, rules]);

  const addRow = () => {
    const newRows = [...presents, { id: uuidv4(), fieldName: '', fieldExpr: '', fieldValue: '' }];
    setPresents(newRows);
  };

  const initialColumns: GridColDef[] = [
    { field: 'presentName', headerName: 'Present Name', editable: true, flex: 1 },
    {
      field: 'rules',
      headerName: 'Rules',
      editable: true,
      flex: 1,
      renderCell: params => {

        return (
          <div>
            <Autocomplete
              value={params.value}
              getOptionLabel={(option) => option.fieldName}
              onChange={(event, newValue) => {
                const rowIndex = presents.findIndex(row => row.id === params.id);


                if (rowIndex !== -1) {
                  const newRows = [...presents];
                  newRows[rowIndex].rules = newValue;
                  setPresents(newRows);
                  console.log({ newRows });
                }
              }}
              multiple
              id="tags-filled"
              options={rules}
              freeSolo
              renderInput={params => <TextField {...params} />}
            />
          </div>
        );
      },
    },
  ];

  const handleDeleteRow = (id: number) => {
    const rowIndex = mergedPresents.findIndex((row) => row.id === id);
    if (rowIndex !== -1) {
      const newRows = [...mergedPresents];
      newRows.splice(rowIndex, 1);
      setPresents(newRows);
    }
  };

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
        rows={mergedPresents}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) => {
          const updatedRows = presents.map(row => {
            if (row.id === updatedRow.id) {
              return updatedRow;
            }
            return row;
          });

          setPresents(updatedRows);
          return updatedRow;
        }}
      />
    </>
  );
};
