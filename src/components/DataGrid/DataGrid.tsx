import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataGridProps {
    userData: any[];
    columns: GridColDef[];
}

const DataGridComponent: React.FC<DataGridProps> = ({ userData, columns }) => {
    return (
        <DataGrid
            rows={userData}
            columns={columns}
            initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 50, 100]}
            sx={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#5755FE',
                    color: '#fff',
                    fontWeight: 'bold',
                    height: 48,
                    fontSize: '1rem',
                    '& .MuiDataGrid-columnHeaderTitle': {
                        display: 'inline-block',
                    },
                },
                '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                    outline: 'none',
                },
                '& .MuiDataGrid-row': {
                    backgroundColor: '#f2f4f8',
                    '&:hover': {
                        backgroundColor: '#e0e7f2',
                    },
                },
                '& .MuiDataGrid-sortIcon': {
                    color: '#fff',
                },
                '& .MuiDataGrid-menuIconButton': {
                    color: '#fff',
                    visibility: 'visible', 
                },
            }}
        />

    );
};

export default DataGridComponent;
