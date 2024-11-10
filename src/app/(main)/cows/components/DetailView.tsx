import ICow from "@/types";

const DetailView = ({ cow }: { cow: ICow }) => {
  return (
    <div className="bg-white rounded-md p-6 space-y-6">
      {/* Cow Basic Info */}
      <div className="space-y-4">
        <p className="flex items-center">
          <strong className="w-32 text-gray-700">Cow ID:</strong>
          <span className="text-gray-600">{cow.cowId ?? "No Data"}</span>
        </p>
        <p className="flex items-center">
          <strong className="w-32 text-gray-700">Name:</strong>
          <span className="text-gray-600">{cow.name ?? "No Data"}</span>
        </p>
        <p className="flex items-center">
          <strong className="w-32 text-gray-700">Date of Birth:</strong>
          <span className="text-gray-600">{cow.dateOfBirth ? new Date(cow.dateOfBirth).toLocaleDateString() : "No Data"}</span>
        </p>
        <p className="flex items-center">
          <strong className="w-32 text-gray-700">Sex:</strong>
          <span className="text-gray-600">{cow.sex ?? "No Data"}</span>
        </p>
        <p className="flex items-center">
          <strong className="w-32 text-gray-700">Category:</strong>
          <span className="text-gray-600">{cow.categoryId?.name ?? "No Data"}</span>
        </p>

        {cow.sire && (
          <p className="flex items-center">
            <strong className="w-32 text-gray-700">Sire:</strong>
            <span className="text-gray-600">{cow.sire.name} - {cow.sire.cowId}</span>
          </p>
        )}

        {cow.dam && (
          <p className="flex items-center">
            <strong className="w-32 text-gray-700">Dam:</strong>
            <span className="text-gray-600">{cow.dam.name} - {cow.dam.cowId}</span>
          </p>
        )}

        {cow.currentPregnancyStatus !== undefined && (
          <p className="flex items-center">
            <strong className="w-32 text-gray-700">Pregnancy Status:</strong>
            <span className="text-gray-600">{cow.currentPregnancyStatus ? "Pregnant" : "Not Pregnant"}</span>
          </p>
        )}
      </div>

      {/* Lactations (Only show if data exists) */}
      {cow.lactations && cow.lactations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Lactation History</h3>
          <ul className="flex gap-2 flex-wrap">
            {cow.lactations.slice(-3).map((lactation, index) => (
              <li key={index} className="p-4 bg-gray-50 border rounded-md flex-1 min-w-[300px]">
                <p>
                  <strong>Lactation Number:</strong> {lactation.lactationNumber}
                </p>
                <p>
                  <strong>Lactation Date:</strong> {new Date(lactation.lactationDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Milk Yield:</strong> {lactation.milkYield} liters
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Vaccinations (Only show if data exists) */}
      {cow.vaccinations && cow.vaccinations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Vaccination History</h3>
          <ul className="flex gap-2 flex-wrap">
            {cow.vaccinations.slice(-3).map((vaccine, index) => (
              <li key={index} className="p-4 bg-gray-50 border rounded-md flex-1 min-w-[300px]">
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailView;
