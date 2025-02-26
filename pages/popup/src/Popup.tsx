import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import Button from '@mui/material/Button';
import { useChromeStorageLocal } from 'use-chrome-storage';
import { useState } from 'react'
import { InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

const Popup = () => {
  const [presents] = useChromeStorageLocal('presents', []);
  const [selectedPresent, setSelectedPresent] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPresent(event.target.value as string);
  };

  return (
    <div className='flex flex-col p-5'>
      <InputLabel id="demo-simple-select-label">Present</InputLabel>
      <Select label="Present" value={selectedPresent} onChange={handleChange} className='mb-5'>
        {presents.map((present) => (
          <MenuItem key={present.id} value={present.id}>
            {present.presentName}
          </MenuItem>
        ))}
      </Select>
      <Button
      >
        Fill form
      </Button>
    </div>
  );
};


export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
