import { Cow } from "./columns";

const DetailView = ({ cow }: { cow: Cow }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md space-y-4">
      <div className="text-lg font-semibold">Cow Details</div>

      <p><strong>Cow ID:</strong> {cow.cowId}</p>
      <p><strong>Name:</strong> {cow.name}</p>
      <p><strong>Date of Birth:</strong> {new Date(cow.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Sex:</strong> {cow.sex}</p>
      <p><strong>Category:</strong> {cow.category}</p>

      {cow.sire && <p><strong>Sire:</strong> {cow.sire}</p>}
      {cow.dam && <p><strong>Dam:</strong> {cow.dam}</p>}
      {cow.currentPregnancyStatus !== undefined && (
        <p><strong>Pregnancy Status:</strong> {cow.currentPregnancyStatus ? "Pregnant" : "Not Pregnant"}</p>
      )}

      {cow.vaccinations && cow.vaccinations.length > 0 && (
        <div>
          <h3 className="mt-4 mb-2 font-semibold">Vaccination History</h3>
          <ul className="space-y-2">
            {cow.vaccinations.map((vaccine, index) => (
              <li key={index} className="p-3 border rounded-md">
                <p><strong>Vaccine Name:</strong> {vaccine.vaccineId.name}</p>
                <p><strong>Info:</strong> {vaccine.vaccineId.info}</p>
                <p><strong>Interval (days):</strong> {vaccine.vaccineId.interval}</p>
                <p><strong>Vaccinated Date:</strong> {new Date(vaccine.vaccinatedDate).toLocaleDateString()}</p>
                <p><strong>Next Vaccination Date:</strong> {new Date(vaccine.nextVaccinationDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailView;
