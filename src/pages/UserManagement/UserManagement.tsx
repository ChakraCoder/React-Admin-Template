import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Loader from '../../common/Loader';
import { GridColDef } from '@mui/x-data-grid';
import { user } from '../../types/user';
import { deleteUser, getAllUser } from '../../api/UserApiService';
import DataGridComponent from '../../components/DataGrid/DataGrid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import DeleteConfirmationDialog from '../../components/FormElements/DeleteConfirmationDialog';


const UserManagement: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<user[]>([]);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 148 },
    { field: 'firstName', headerName: 'First name', width: 300 },
    { field: 'lastName', headerName: 'Last name', width: 300 },
    { field: 'age', headerName: 'Age', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 216,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={() => handleUpdate(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllUser();
        setUserData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchData();
  }, []);

  const handleUpdate = (id: string) => {
    navigate(`/user-management/update-user/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteUserId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteUserId) {
      await deleteUser(deleteUserId);
      setDeleteUserId(null);
      setOpenDeleteDialog(false);
      toast.success("User Deleted Successfully")

      // Reload user data after deletion
      const response = await getAllUser();
      setUserData(response);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteUserId(null);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Breadcrumb items={[{ name: 'User Management', path: '/user-management' }, { name: 'User Management' }]} />

      <div className="flex justify-end">
        <Link to={'/user-management/add-user'}>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add User
          </button>
        </Link>
      </div>

      <div>
        {loading ? (
          <Loader height={400} />
        ) : (
          <DataGridComponent userData={userData} columns={columns} />
        )}
      </div>

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default UserManagement;