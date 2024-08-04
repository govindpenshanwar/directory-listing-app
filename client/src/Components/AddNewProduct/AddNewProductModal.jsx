import React, { useState, useEffect } from "react";
import { Modal, Box, Divider, Button } from "@mui/material";
import apiUrl from "../utils/baseUrl";
import toast from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const AddNewProductModal = ({ open, handleClose, handleToggle }) => {
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [grades, setGrades] = useState([]);
    const [productId, setproductId] = useState("");
    const [materialId, setmaterialId] = useState("");
    const [gradeId, setgradeId] = useState("");
    const [loading, setLoading] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedMaterialId, setSelectedMaterialId] = useState("");
    const [selectedGradeIds, setSelectedGradeIds] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiUrl.get("all-products");
                setProducts(res.data.payload);
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }
        };
        fetchProducts();
    }, [toggle]);

    const fetchMaterials = async (productId) => {
        try {
            const res = await apiUrl.get(`get-materials/${productId}`, {
                withCredentials: true,
            });
            setMaterials(res.data.payload);
        } catch (error) {
            console.error("Error fetching materials:", error.message);
        }
    };

    const fetchGrades = async (materialId) => {
        try {
            const res = await apiUrl.get(`grade/get-grades/${materialId}`, {
                withCredentials: true,
            });
            setGrades(res.data.payload);
        } catch (error) {
            console.error("Error fetching grades:", error.message);
        }
    };
    const handleGradeChange = (e) => {
        const value = e.target.value;
        setgradeId((prevGradeIds) =>
            prevGradeIds.includes(value)
                ? prevGradeIds.filter((id) => id !== value)
                : [...prevGradeIds, value]
        );
        setSelectedGradeIds((prevSelectedGradeIds) =>
            prevSelectedGradeIds.includes(value)
                ? prevSelectedGradeIds.filter((id) => id !== value)
                : [...prevSelectedGradeIds, value]
        );
    };
    if (loading) {
        return <div className=" text-lg font-semibold text-zinc-800">Loading...</div>
    }
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const res = await apiUrl.post(`product/add-new-product`, {
                product: productId,
                material: materialId,
                grade: gradeId,
            });
            if (res.data.statusCode === 201) {
                console.log("response after submitting => ", res.data);
                toast.success(res.data.message);
                setToggle(prevState => !prevState)
                setproductId("")
                setmaterialId("")
                setgradeId("")
                setSelectedProductId("");
                setSelectedMaterialId("");
                setSelectedGradeIds([]);
                // handleClose();
                handleToggle();
                setLoading(false)
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            setLoading(false)
            console.log("err submitting data => ", error.message);
        }
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="h-2/3 overflow-y-scroll">
                <div className="flex flex-row items-center justify-between cursor-pointer">
                    <p className="font-bold text-xl text-zinc-800   ">Add Products</p>
                    <p onClick={handleClose}><CloseIcon /></p>
                </div>

                <Divider className="py-1" />
                <div className="grid grid-cols-3 gap-4 py-4 ">
                    <ul className="flex flex-col gap-2 w-full border rounded-md p-2 shadow">
                        <p className="text-lg font-bold text-zinc-800">
                            Products
                        </p>
                        <Divider className="py-1" />
                        {products.map((item) => (
                            <li
                                onClick={() => {
                                    fetchMaterials(item._id);
                                    setproductId(item._id);
                                    setSelectedProductId(item._id);
                                }}
                                key={item._id}
                                className={`cursor-pointer font-semibold text-left p-2 rounded  text-sm mb-2  ${selectedProductId === item._id ? "bg-slate-300" : ""
                                    } `}
                            >
                                <div className="flex flex-row justify-between">
                                    <span>   {item.productName}</span>
                                    {selectedProductId === item._id ? ` (${selectedGradeIds.length + (selectedMaterialId ? 1 : 0)})` : null}
                                </div>

                            </li>
                        ))}
                    </ul>
                    <ul className="flex flex-col gap-2  w-full  border rounded-md p-2 shadow">
                        <p className="text-lg font-bold text-zinc-800">Materials </p>
                        <Divider className="py-1" />
                        {materials.map((item) => (
                            <li
                                className={`cursor-pointer p-2 rounded  font-semibold text-left text-sm mb-2 ${selectedMaterialId === item._id ? "bg-slate-300" : ""
                                    }`}
                                onClick={() => {
                                    fetchGrades(item._id);
                                    setmaterialId(item._id);
                                    setSelectedMaterialId(item._id);
                                }}
                                key={item._id}
                            >
                                <div className="flex justify-between">
                                    <span>{item.materialName}</span>
                                    {selectedMaterialId === item._id ? `(${selectedGradeIds.length})` : null}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <ul className="flex flex-col gap-2 w-full border rounded-md p-2 shadow   ">
                        <p className="text-lg font-bold text-zinc-800">Grades </p>
                        <Divider className="py-1" />
                        {grades.map((item) => (
                            <li
                                //  className='cursor-pointer font-semibold text-left'
                                className={`cursor-pointer font-semibold p-2 rounded text-left ${selectedGradeIds.includes(item._id) ? "bg-gray-300" : ""
                                    }`}
                                key={item._id}
                            >
                                <div className="flex flex-row items-center justify-between gap-2 p-1">
                                    <span className="text-sm">{item.name}</span>
                                    <input
                                        type="checkbox"
                                        className="cursor-pointer"
                                        value={item._id}
                                        onChange={handleGradeChange}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center justify-center ">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddNewProductModal;
