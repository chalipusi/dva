import axios from 'axios';

function getCarList() {
    return axios.get('/v2-car-getMasterBrandList.html');
}

function getCarRight(id: number) {
    return axios.get(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
}

function getCarDetails(id: number) {
    return axios.get(`/v2-car-getInfoAndListById.html?SerialID=${id}`);
}

function getCarPhoto(id: number) {
    return axios.get(`/v2-car-getImageList.html?SerialID=${id}`);
}

function getCarCity() {
    return axios.get(`/v1-city-alllist.html`);
}

function getCarCityAuto() {
    return axios.get(`/location-client.html`);
}

function getCarCityRight(id: number) {
    return axios.get(`/v1-city-alllist.html?provinceid=${id}`);
}

function getCarCityLookFor(carId: number, cityId: number) {
    return axios.get(`/v2-dealer-alllist.html?carId=${carId}&cityId=${cityId}`);
}

function getAutoCity() {
    return axios.get(`/location-client.html`);
}

function getCarZui(name: string, mobile: any, carid: any, location: any, dealerids: any) {
    return axios.get(
        `https://baojia.chelun.com/h2-submit-lowprice.html?name=${name}&mobile=${mobile}&carid=${carid}&location=${location}&dealerids=${dealerids}`
    );
}

export {
    getCarList,
    getCarRight,
    getCarDetails,
    getCarPhoto,
    getCarCity,
    getCarCityAuto,
    getCarCityRight,
    getCarCityLookFor,
    getAutoCity,
    getCarZui,
};
