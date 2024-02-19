import he from 'he';
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="property-details__item">
          <span className="property-details__item__label">Operación: </span>
          <span className="property-details__item__value">{he.decode(operation)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Ubicación: </span>
          <span className="property-details__item__value">{he.decode(locationLoc)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Barrio: </span>
          <span className="property-details__item__value">{he.decode(neighborhood)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Dirección: </span>
          <span className="property-details__item__value">{he.decode(address)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Ambientes: </span>
          <span className="property-details__item__value">{he.decode(environments)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Antigüedad:</span>
          <span className="property-details__item__value">{he.decode(antiquity)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Expensas:</span>
          <span className="property-details__item__value">{he.decode(expenses)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Tipo de casa:</span>
          <span className="property-details__item__value">{he.decode(houseType)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Dependencia:</span>
          <span className="property-details__item__value">{he.decode(dependence)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Pisos:</span>
          <span className="property-details__item__value">{he.decode(floors)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Agua caliente:</span>
          <span className="property-details__item__value">{he.decode(hotWater)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Gas:</span>
          <span className="property-details__item__value">{he.decode(gas)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Calefacción:</span>
          <span className="property-details__item__value">{he.decode(heating)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Baños:</span>
          <span className="property-details__item__value">{he.decode(bathrooms)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Estado:</span>
          <span className="property-details__item__value">{he.decode(state)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Cochera:</span>
          <span className="property-details__item__value">{he.decode(garage_parking)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Garage:</span>
          <span className="property-details__item__value">{he.decode(garage)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Estacionamiento:</span>
          <span className="property-details__item__value">{he.decode(parking)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Pavimento:</span>
          <span className="property-details__item__value">{he.decode(pavement)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Cloacas:</span>
          <span className="property-details__item__value">{he.decode(sewer)}</span>
        </div>
        <div className="property-details__item">
          <span className="property-details__item__label">Línea telefónica:</span>
          <span className="property-details__item__value">{he.decode(telephoneLine)}</span>
        </div>
      </div>
    </>
    
  )
}

export default DetailsList