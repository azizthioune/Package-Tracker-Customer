import http from "../../http-common";
import { IPackageData } from "../types/Package";

const findByID = (id: string) => {
  return http.get<IPackageData>(`/packages/${id}`);
};

const PackageService = {
  findByID,
};

export default PackageService;
