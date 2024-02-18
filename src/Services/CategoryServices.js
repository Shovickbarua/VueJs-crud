import axios from "axios";

const CategoryServices = () => {};

CategoryServices.index = async () => {
    const url = "http://127.0.0.1:8000/api/category/";
    const res = await axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

CategoryServices.save = async (data) => {
    let url = "http://127.0.0.1:8000/api/category/";
    if (data.id) url = "http://127.0.0.1:8000/api/category/" + data.id + "?_method=PUT";
    const res = await axios
        .post(url, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

CategoryServices.show = async (id) => {
    const url = "http://127.0.0.1:8000/api/category/" + id;
    const res = await axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

CategoryServices.delete = async (id) => {
    const url = "http://127.0.0.1:8000/api/category/" + id;
    const res = await axios
        .delete(url)
        .then((response) => {
            console.log("res", response);
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    return res;
};

export default CategoryServices;
