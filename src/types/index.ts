
export interface ICategory {
    _id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IVaccine {
    _id: string;
    name: string;
    interval: number; 
    info: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IVaccination {
    vaccineId: IVaccine | string; 
    vaccinatedDate: Date;
    nextVaccinationDate?: Date;
    isDeleted: boolean;
  }
  
  export default interface ICow {
    _id: string;
    cowId: string;
    name: string;
    dateOfBirth: string;
    sex: 'male' | 'female';
    categoryId: ICategory ; 
    dam?: string | ICow; 
    vaccinations: IVaccination[]; 
    currentPregnancyStatus: boolean;
    lactations: string[]; 
    pregnancyRecords: string[]; 
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  