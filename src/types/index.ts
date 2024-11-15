
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
    vaccineId: IVaccine ; 
    vaccinatedDate: Date;
    nextVaccinationDate: Date;
    isDeleted: boolean;
  }

  export interface IPregnancy {
    _id: string;
    cowId: string; 
    aiState: boolean; 
    checkStatus: 'Pending' | 'Confirmed' | 'Failed';
    checkedDate: Date; 
    semenInfo: string; 
    deliveryStatus?: 'Not Due' | 'Due Soon' | 'Delivered';
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean
  }

 export interface ILactation {
    _id: string; 
    cowOID: string; 
    lactationNumber: number; 
    lactationStartDate: Date; 
    lactationEndDate: Date; 
    milkYield: number; 
    createdAt: Date; 
    updatedAt: Date;
    isDeleted: boolean 
  }

  
  export interface ICow {
    _id: string;
    cowId: string;
    name: string;
    dateOfBirth: Date;
    sex: 'Male' | 'Female';
    categoryId: ICategory ; 
    sire: ICow;
    dam:  ICow; 
    vaccinations: IVaccination[]; 
    currentPregnancyStatus: boolean;
    lactations: ILactation[]; 
    pregnancyRecords: IPregnancy[]; 
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  