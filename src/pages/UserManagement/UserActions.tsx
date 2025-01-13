import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Loader from '../../common/Loader';
import { FullWidthInput, HalfWidthInput } from '../../components/FormElements/InputField';
import { user } from '../../types/user';
import { getUserById, addUser, updateUser } from '../../api/UserApiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserActions: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const navigate = useNavigate()

    const { control, handleSubmit, reset, formState: { errors } } = useForm<user>();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setIsUpdate(true);
                try {
                    setLoading(true)
                    const userData = await getUserById(id);
                    reset(userData);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [id, reset]);

    const onSubmit = async (data: user) => {
        try {
            if (isUpdate) {
                const response = await updateUser(data.id, data)
                if (response) {
                    navigate("/user-management")
                    toast.success('User Updated Successfully')
                }
            } else {
                const response = await addUser(data)
                if (response) {
                    navigate("/user-management")
                    toast.success('User Added Successfully')
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <Breadcrumb
                items={[
                    { name: 'User Management', path: '/user-management' },
                    { name: isUpdate ? 'Update User' : 'Add User' }
                ]}
            />

            {loading ? (
                <Loader height={400} />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <Controller
                                name="id"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'ID is required' }}
                                render={({ field }) => (
                                    <FullWidthInput
                                        label="ID"
                                        placeholder="ID"
                                        type='number'
                                        disabled={isUpdate}
                                        error={errors.id?.message}
                                        {...field}
                                    />
                                )}
                            />

                            <div className="flex gap-5.5">
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'First Name is required' }}
                                    render={({ field }) => (
                                        <HalfWidthInput
                                            label="First Name"
                                            placeholder="First Name"
                                            type='text'
                                            error={errors.firstName?.message}
                                            {...field}
                                        />
                                    )}
                                />

                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Last Name is required' }}
                                    render={({ field }) => (
                                        <HalfWidthInput
                                            label="Last Name"
                                            placeholder="Last Name"
                                            type='text'
                                            error={errors.lastName?.message}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            <Controller
                                name="age"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Age is required', min: { value: 1, message: 'Age must be at least 1' } }}
                                render={({ field }) => (
                                    <FullWidthInput
                                        label="Age"
                                        placeholder="Age"
                                        type='number'
                                        error={errors.age?.message}
                                        {...field}
                                    />
                                )}
                            />

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-auto"
                                >
                                    {isUpdate ? "Update" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default UserActions;