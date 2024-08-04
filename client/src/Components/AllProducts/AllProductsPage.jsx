import React, { useEffect, useState } from "react";
import apiUrl from "../utils/baseUrl";

import Button from "@mui/material/Button";
import {
    InputAdornment,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useForm } from "react-hook-form";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
function AllProductsPage() {
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedMaterialId, setSelectedMaterialId] = useState("");
    const [allProducts, setAllProducts] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [searchQuery, setSeacrhQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [selectedProducts, setSelectedProducts] = useState([]);
    const { register, handleSubmit } = useForm();

    const fetchMaterials = async (id) => {
        try {
            const res = await apiUrl.get(`get-materials/${id}`, {
                withCredentials: true,
            });
            setMaterials(res.data.payload);
            console.log("res => ", res.data);
            setToggle((prevState) => !prevState);
        } catch (error) {
            console.log("err fetching materials => ", error.message);
        }
    };
    const fetchAllProducts = async () => {
        const res = await apiUrl.get("product/allProducts");
        setAllProducts(res.data.payload);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiUrl.get("all-products", { withCredentials: true });
                const response = res.data;
                setProducts(response.payload);
            } catch (error) {
                console.log("err fetching products => ", error.message);
            }
        };
        fetchProducts();
        fetchAllProducts();
    }, [toggle]);

    const handleClick = async () => {
        try {
            const res = await apiUrl.get(
                `product/get-products/${selectedProductId}/${selectedMaterialId}`,
                { withCredentials: true }
            );
            const response = res.data;
            console.log("all data =>", response);
            setAllProducts(response.payload);
        } catch (error) {
            console.log("err filtering data => ", error.message);
        }
    };
    const handleUpdation = async (data, id) => {
        try {
            const res = await apiUrl.put(`product/update-product/${id}`, data);
            console.log("Product updated => ", res.data);
            setEditRowId(null);
            setToggle((prevState) => !prevState);
        } catch (error) {
            console.log("err updating product => ", error.message);
        }
    };


    const filteredProducts = allProducts.filter((product) =>
        product.grade.some((grade) =>
            grade.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const paginatedProducts = filteredProducts.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <div className="mt-4 flex flex-col gap-6">
            <div className="flex flex-col  gap-4 self-start px-4">

                <TextField
                    label="Search Product"
                    value={searchQuery}
                    onChange={(e) => setSeacrhQuery(e.target.value)}
                    className="md:w-[20rem] w-[18rem]"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="flex flex-row items-center justify-start px-6 gap-10">
                <select
                    name="Products"
                    className="border border-zinc-500 p-1 rounded "
                    onChange={(e) => {
                        fetchMaterials(e.target.value);
                        setSelectedProductId(e.target.value);
                    }}
                >
                    <option value="">--Select Product--</option>
                    {products.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.productName}
                        </option>
                    ))}
                </select>
                <select
                    className="border border-zinc-500 p-1 rounded "
                    onChange={(e) => {
                        setSelectedMaterialId(e.target.value);
                    }}
                >
                    <option value="" disabled>
                        Select Material
                    </option>
                    {materials.map((item) => (
                        <option
                            key={item._id}
                            value={item._id}
                            onClick={() => {
                                fetchMaterials(item._id);
                            }}
                        >
                            {item.materialName}
                        </option>
                    ))}
                </select>
                <Button onClick={handleClick} variant="contained" color="secondary">
                    Filter
                </Button>
                <p className="font-semibold bg-zinc-800 text-white px-4 py-3 rounded-md ">
                    Products  : {paginatedProducts.length} / {allProducts.length}
                </p>
            </div>
            <div className=" px-4 py-6">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Sr.No</StyledTableCell>
                                <StyledTableCell align="left">Products</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                                <StyledTableCell align="left">Product Details</StyledTableCell>
                                <StyledTableCell align="left">Price </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedProducts.map((item, index) =>
                                item.grade.map((grade) => (
                                    <React.Fragment key={grade._id}>
                                        <StyledTableRow>
                                            <StyledTableCell component="th" scope="row" align="left">
                                                {page * rowsPerPage + index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row" align="left">
                                                {grade.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <div className="flex flex-row gap-1 cursor-pointer ">
                                                    <span onClick={() => setEditRowId(item._id)}>
                                                        Quick Edit
                                                    </span>
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">

                                                Material : {item.material.materialName} <br />
                                                Unit Length :{item.length} <br />
                                                Shape : {item.shape}...
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{item.price} / KG</StyledTableCell>
                                        </StyledTableRow>
                                        {editRowId === item._id && (
                                            <StyledTableRow>
                                                <StyledTableCell colSpan={8}>
                                                    <div className="grid grid-flow-row md:grid-cols-4 grid-cols-2 gap-5">
                                                        <TextField
                                                            label="Material Name"
                                                            name="shape"
                                                            defaultValue={item.material.materialName}
                                                        />
                                                        <TextField
                                                            label="Shape"
                                                            name="shape"
                                                            defaultValue={item.shape}
                                                            {...register("shape")}
                                                        />
                                                        <TextField
                                                            label="Length"
                                                            name="length"
                                                            defaultValue={item.length}
                                                            {...register("length")}
                                                        />
                                                        <TextField
                                                            label="Thickness"
                                                            name="thickness"
                                                            defaultValue={item.thickness}
                                                            {...register("thickness")}
                                                        />
                                                        <TextField
                                                            label="Surface Finish"
                                                            name="surafceFinish"
                                                            defaultValue={item.surfaceFinish}
                                                            {...register("surfceFinish")}
                                                        />
                                                        <TextField
                                                            label="Outside Diameter"
                                                            name="outsideDia"
                                                            defaultValue={item.outsideDia}
                                                            {...register("outsideDia")}
                                                        />
                                                        <TextField
                                                            label="Price"
                                                            name="price"
                                                            defaultValue={item.price}
                                                            {...register("price")}
                                                        />
                                                        <div className="flex flex-row gap-3 py-3">
                                                            <Button
                                                                variant="contained"
                                                                onClick={handleSubmit((formData) =>
                                                                    handleUpdation(formData, item._id)
                                                                )}
                                                            >
                                                                Update
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                onClick={() => setEditRowId(null)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </div>
        </div>
    );
}

export default AllProductsPage;

