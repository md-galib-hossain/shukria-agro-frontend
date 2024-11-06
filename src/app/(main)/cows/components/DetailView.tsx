import ICow from "@/types";

const DetailView = ({ cow }: { cow: ICow }) => {
  return (
    <div className="bg-white rounded-md space-y-4 flex gap-6">
      {/* Cow */}
      <div>
        <p className="flex items-center">
          <strong className="w-32">Cow ID:</strong> 
          <span>{cow.cowId ?? "No Data"}</span>
        </p>
        <p className="flex items-center">
          <strong className="w-32">Name:</strong> 
          <span>{cow.name ?? "No Data"}</span>
        </p>
        <p className="flex items-center">
          <strong className="w-32">Date of Birth:</strong>
          <span>{cow.dateOfBirth ? new Date(cow.dateOfBirth).toLocaleDateString() : "No Data"}</span>
        </p>
        <p className="flex items-center">
          <strong className="w-32">Sex:</strong> 
          <span>{cow.sex ?? "No Data"}</span>
        </p>
        <p className="flex items-center">
          <strong className="w-32">Category:</strong> 
          <span>{cow.categoryId?.name ?? "No Data"}</span>
        </p>
        {cow.sire ? (
          <p className="flex items-center">
            <strong className="w-32">Sire:</strong> 
            <span>
              {cow.sire.name} - {cow.sire.cowId}
            </span>
          </p>
        ) : (
          <p className="flex items-center">
            <strong className="w-32">Sire:</strong> 
            <span>No Data</span>
          </p>
        )}
        {cow.dam ? (
          <p className="flex items-center">
            <strong className="w-32">Dam:</strong> 
            <span>
              {cow.dam.name} - {cow.dam.cowId}
            </span>
          </p>
        ) : (
          <p className="flex items-center">
            <strong className="w-32">Dam:</strong> 
            <span>No Data</span>
          </p>
        )}
        {cow.currentPregnancyStatus !== undefined ? (
          <p className="flex items-center">
            <strong className="w-32">Pregnancy Status:</strong>
            <span>{cow.currentPregnancyStatus ? "Pregnant" : "Not Pregnant"}</span>
          </p>
        ) : (
          <p className="flex items-center">
            <strong className="w-32">Pregnancy Status:</strong>
            <span>No Data</span>
          </p>
        )}
      </div>

      {cow.vaccinations && cow.vaccinations.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Vaccination History</h3>
          <ul className="space-y-4">
            {cow.vaccinations.map((vaccine, index) => (
              <li key={index} className="p-4 bg-gray-50 border rounded-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  <p>
                    <strong>Vaccine Name:</strong> {vaccine?.vaccineId?.name ?? "No Data"}
                  </p>
                  <p>
                    <strong>Interval (days):</strong> {vaccine?.vaccineId?.interval ?? "No Data"}
                  </p>
                  <p>
                    <strong>Vaccinated Date:</strong> {vaccine?.vaccinatedDate ? new Date(vaccine.vaccinatedDate).toLocaleDateString() : "No Data"}
                  </p>
                  <p>
                    <strong>Next Vaccination Date:</strong> {vaccine?.nextVaccinationDate ? new Date(vaccine.nextVaccinationDate).toLocaleDateString() : "No Data"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Vaccination History</h3>
          <p>No Data</p>
        </div>
      )}
    </div>
  );
};

export default DetailView;
