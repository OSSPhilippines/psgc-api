import ProvinceRequest from "../models/provinceRequest";
import CityRequest from "../models/cityRequest";
import MunicipalityRequest from "../models/municipalityRequest";
import handleAsync from "../utils/handleAsync";

/**
 * !PATH: /province
 */
export const getAllProvinces = handleAsync(async (_, res, _next) => {
    const data = await ProvinceRequest.find();
    res.json(data);
});

/**
 * !PATH: /province/:code
 */
export const getAProvince = handleAsync(async (req, res, _next) => {
    const { code } = req.params;
    const [data] = await ProvinceRequest.find({ "province.code": code });
    if (!data) throw new Error("No Results Found");

    const totalNumOfProvinces = parseInt(data.total);

    for (let i = 0; i < totalNumOfProvinces; i++) {
        let db_code = data.province[i]["code"];
        let db_obj = data.province[i];
        if (code == db_code) {
            res.json(db_obj);
            break;
        }
    }
});

/**
 * !PATH: /province/:code/city
 */
export const getAllCitiesOfAProvince = handleAsync(async (req, res, _next) => {
    const { code } = req.params;
    const [data] = await CityRequest.find();
    if (!data) throw new Error("No Results Found");

    const codeArray = code.split("");
    const totalNumOfCities = parseInt(data.total);
    const results = [];

    let new_split_code = 0;
    let split_code =
        codeArray.length < 9
            ? parseInt(codeArray[0] + codeArray[1] + codeArray[2])
            : parseInt(
                  codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3]
              );

    for (let i = 0; i < totalNumOfCities; i++) {
        const db_code = data.city[i]["code"];

        db_code.split("").length < 9
            ? (new_split_code = parseInt(db_code[0] + db_code[1] + db_code[2]))
            : (new_split_code = parseInt(
                  db_code[0] + db_code[1] + db_code[2] + db_code[3]
              ));

        split_code === new_split_code ? results.push(data.city[i]) : null;
    }

    res.json(results);
});

/**
 * !PATH: /province/:code/municipality
 */
export const getAllMunicipalitiesOfAProvince = handleAsync(
    async (req, res, _next) => {
        const { code } = req.params;
        const [data] = await MunicipalityRequest.find();
        if (!data) throw new Error("No Results Found");

        const codeArray = code.split("");
        const totalNumOfMunicipalities = parseInt(data.total);
        const results = [];

        let new_split_code = 0;
        let split_code =
            codeArray.length < 9
                ? parseInt(codeArray[0] + codeArray[1] + codeArray[2])
                : parseInt(
                      codeArray[0] + codeArray[1] + codeArray[2] + codeArray[3]
                  );

        for (let i = 0; i < totalNumOfMunicipalities; i++) {
            const db_code = data.municipality[i]["code"];

            db_code.split("").length < 9
                ? (new_split_code = parseInt(
                      db_code[0] + db_code[1] + db_code[2]
                  ))
                : (new_split_code = parseInt(
                      db_code[0] + db_code[1] + db_code[2] + db_code[3]
                  ));

            split_code === new_split_code
                ? results.push(data.municipality[i])
                : null;
        }

        res.json(results);
    }
);
