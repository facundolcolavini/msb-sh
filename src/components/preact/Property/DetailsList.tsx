import he from 'he';
import { capitalize } from '../../../utils/formats';
interface Props {
  operation: string;
  locationLoc: string;
  locationUbi: string;
  neighborhood: string;
  address: string;
  environments: string;
  antiquity: string;
  year: string;
  expenses: string;
  houseType: string;
  dependence: string;
  floors: string;
  hotWater: string;
  gas: string;
  heating: string;
  bathrooms: string;
  state: string;
  garage_parking: string;
  garage: string;
  parking: string;
  pavement: string;
  sewer: string;
  telephoneLine: string;
}
const DetailsList = ({
  operation,
  locationLoc,
  locationUbi,
  neighborhood,
  address,
  environments,
  antiquity,
  year,
  expenses,
  houseType,
  dependence,
  floors,
  hotWater,
  gas,
  heating,
  bathrooms,
  state,
  garage_parking,
  garage,
  parking,
  pavement,
  sewer,
  telephoneLine
}: Props) => {

  return (
    <>
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-10 gap-y-3">

        {operation !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Operación: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(operation)}</p>
        </li>) : null}
        {locationLoc !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Localidad: </span>
          <span className="text-sm md:text-md lg:text-lg">{he.decode(locationLoc)}</span>
        </li>) : null}
        {locationLoc !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Barrio: </span>
          <span className="text-sm md:text-md lg:text-lg">{he.decode(neighborhood)}</span>
        </li>) : null}
        {address !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Dirección: </span>
          <span className="text-sm md:text-md lg:text-lg text-balance">{capitalize(he.decode(address))}</span>
        </li>) : null}
        {environments !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Ambientes: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(environments))}</span>
        </li>) : null}
        {(antiquity !== "" && antiquity !== "0") ? (
          <li className="flex gap-2">
            <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Antigüedad: </span>
            <span className="text-sm md:text-md lg:text-lg">{he.decode(antiquity)} años</span>
          </li>) : null}
        {(year !== "" && year !== "0") ? (
          <li className="flex gap-2">
            <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Antigüedad: </span>
            <span className="text-sm md:text-md lg:text-lg">{he.decode(year)}</span>
          </li>) : null}
        {(expenses !== "") ? (
          <li className="flex gap-2">
            <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Expensas: </span>
            <span className="text-sm md:text-md lg:text-lg">{he.decode(expenses).includes('P') ?
              // REEMPLAZAR POR $ PRECIO 
              he.decode(expenses).replace('P', '$') : he.decode(expenses).replace('P', 'U$S')
            }</span>
          </li>
        ) : null}
        {(locationUbi !== "") ? (
          <li className="flex gap-2">
            <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Ubicación: </span>
            <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(locationUbi))}</span>
          </li>
        ) : null}
        {houseType !== "" ? (
          <li className="flex gap-2">
            <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Tipo de casa: </span>
            <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(houseType))}</span>
          </li>) : null}

        {dependence !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Dependencia: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(dependence)) === "S" ? "Si" : "No"}</span>
        </li>) : null}
        {floors !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Pisos: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(floors))}</span>
        </li>) : null}
        {hotWater !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Agua caliente: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(hotWater))}</span>
        </li>) : null}
        {gas !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Gas: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(gas))}</span>
        </li>) : null}
        {heating !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Calefacción: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(heating))}</span>
        </li>) : null}
        {bathrooms !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Baños: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(bathrooms))}</span>
        </li>) : null}
        {state !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Estado: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(state))}</span>
        </li>) : null}
        {garage_parking !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Cochera: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(garage_parking))}</span>
        </li>) : null}
        {(garage !== "" && garage !== "0") ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Garage: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(garage))}</span>
        </li>) : null}
        {parking !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Estacionamiento: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(parking))}</span>
        </li>) : null}
        {pavement !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Pavimento: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(pavement)) === "S" ? "Si" : "No"}</span>
        </li>) : null}
        {sewer !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Cloacas: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(sewer)) === "S" ? "Si" : "No"}</span>
        </li>) : null}
        {telephoneLine !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Línea telefónica: </span>
          <span className="text-sm md:text-md lg:text-lg">{capitalize(he.decode(telephoneLine)) === "S" ? "Si" : "No"} </span>
        </li>) : null}

      </ul>
    </>

  )
}

export default DetailsList