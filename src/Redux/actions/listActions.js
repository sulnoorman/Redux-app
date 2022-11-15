import { CREATE_LIST, CREATE_PHOTO, GET_ALL_LIST, GET_LIST, LIST_ERROR, UPDATE_LIST, DELETE_LIST } from "./types";
import axios from "axios";

export const getAllList = () => {
    return (dispatch) => {
        const appid = "636c7d5ebc64651ccd512be6";
        const url = `https://io.etter.cloud/v4/select_all/token/632411e20581750298f3078c/project/redux_app/collection/employee_info/appid/${appid}/employee_info`
        const payload = {
            token: "632411e20581750298f3078c",
            project: "redux_app",
            collection: "employee_info",
            appid: appid
        }

        axios.get(url, payload)
            .then(res => {
                dispatch({
                    type: GET_ALL_LIST,
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch({
                    type: LIST_ERROR,
                    payload: error.status
                })
            })
    }
}

export const getById = (params) => {
    return (dispatch) => {
        const id = params;
        const appid = "636c7d5ebc64651ccd512be6";
        const url = `https://io.etter.cloud/v4/select_id/token/632411e20581750298f3078c/project/redux_app/collection/employee_info/appid/${appid}/id/${id}/employee_info`
        const payload = {
            token: "632411e20581750298f3078c",
            project: "redux_app",
            collection: "employee_info",
            appid: appid,
            id: id
        }

        axios.get(url, payload)
            .then(res => {
                dispatch({
                    type: GET_LIST,
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch({
                    type: LIST_ERROR,
                    payload: error
                })
            })
    }
}

export const getByNama = (params) => {
    return (dispatch) => {
        const appid = "636c7d5ebc64651ccd512be6";
        const value = params;
        const url = `https://io.etter.cloud/v4/select_where_like/token/632411e20581750298f3078c/project/redux_app/collection/employee_info/appid/${appid}/wlike_field/name/wlike_value/${value}/employee_info`
        const payload = {
            wlike_field: "name",
            wlike_value: value,
            token: "632411e20581750298f3078c",
            project: "redux_app",
            collection: "employee_info",
            appid: appid
        }

        axios.get(url, payload)
            .then(res => {
                dispatch({
                    type: GET_ALL_LIST,
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch({
                    type: LIST_ERROR,
                    payload: error
                })
            })
    }
}

export const AddList = (params) => {
    return (dispatch) => {
        const appid = "636c7d5ebc64651ccd512be6";
        const url = "https://io.etter.cloud/v4/insert/employee_info"
        const payload = {
            name: params.name,
            phone: params.phone,
            email: params.email,
            address: params.address,
            gender: params.gender,
            birthday: params.birthday,
            token: "632411e20581750298f3078c",
            project: "redux_app",
            collection: "employee_info",
            appid: appid
        }

        axios.post(url, payload)
            .then(res => {
                dispatch({
                    type: CREATE_LIST,
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch({
                    type: LIST_ERROR,
                    payload: error
                })
            })
    }
}

export const uploadPhoto = (data) => async (dispatch) => {
    var formdata = new FormData();
    formdata.append("token", "632411e20581750298f3078c");
    formdata.append("project", "redux_app");
    if (data.photo) {
        formdata.append("file", data.photo);
    }
    try {
        const response = await fetch("https://io.etter.cloud/v4/upload", {
            method: "POST",
            body: formdata,
        });

        const result = await response.json();
        dispatch({
            type: CREATE_PHOTO,
            payload: result
        })
    }
    catch (error) {
        console.log(error);
        dispatch({
            type: LIST_ERROR,
            payload: error
        })
    }
    //     var formData = new FormData();
    //     formData.append("token", "632411e20581750298f3078c");
    //     formData.append("project", "redux_app");
    //     if (data.photo) {
    //         formData.append("file", data.photo)
    //     }
    //    const url = "https://io.etter.cloud/v4/upload"
    //    const payload = {
    //     formData
    //    }

    //     axios.post(url, payload)
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
};

export const updateList = (params) => {
    return (dispatch) => {
        const id = params.id;
        const appid = "636c7d5ebc64651ccd512be6";
        const url = `https://io.etter.cloud/v4/update_id/employee_info`
        const payload = {
            update_field: "name~phone~email~address~gender~birthday",
            update_value: params.name + "~" + params.phone + "~" + params.email + "~" + params.address + "~" + params.gender + "~" + params.birthday,
            token: "632411e20581750298f3078c",
            project: "redux_app",
            collection: "employee_info",
            appid: appid,
            id: id
        }

        axios.post(url, payload)
            .then(res => {
                dispatch({
                    type: UPDATE_LIST,
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch({
                    type: LIST_ERROR,
                    payload: error
                })
            })
    }
}

export const deleteList = (params) => {
    return (dispatch) => {
        const id = params;
        const appid = "636c7d5ebc64651ccd512be6";
        const url = `https://io.etter.cloud/v4/remove_id/token/632411e20581750298f3078c/project/redux_app/collection/employee_info/appid/${appid}/id/${id}/employee_info`
        const payload = {
            token: "632411e20581750298f3078c",
            project: "redux_app",
            collection: "employee_info",
            appid: appid,
            id: id
        }

        axios.delete(url, payload)
            .then(res => {
                dispatch({
                    type: DELETE_LIST,
                    payload: res.data
                })
            })
            .catch(error => {
                dispatch({
                    type: LIST_ERROR,
                    payload: error
                })
            })
    }
}