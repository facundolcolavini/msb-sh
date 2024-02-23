import he from 'he';
interface Props {
    name: string;
    buildingType: string;
    location: string;
    neighborhood:string;
    address: string;
    category: string;
    state: string;
    possessionAndDelivery: string;
    architect: string;
    enviroments: string;
}

const EntrepreneurshipDetailList = ({
    name,
    buildingType,
    location,
    neighborhood,
    address,
    category,
    state,
    possessionAndDelivery,
    architect,
    enviroments
}:Props) => {
  return (
    <ul className="grid sm:grid-cols-autofill md:grid-cols-2 lg:grid-cols-2 gap-4 mb-10 gap-y-3">
         {name !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Nombre: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(name)}</p>
        </li>) : null}
        {buildingType !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Tipo: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(buildingType)}</p>
        </li>) : null}
        {location !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Localidad: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(location)}</p>
        </li>) : null}
        {neighborhood !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Barrio: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(neighborhood)}</p>
        </li>) : null}
        {address !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Dirección: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(address)}</p>
        </li>) : null}
        {category !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Categoria: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(category)}</p>
        </li>) : null}
        {state !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Estado: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(state)}</p>
        </li>) : null}
        {possessionAndDelivery !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Posesión y entrega: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(possessionAndDelivery)}</p>
        </li>) : null}
        {architect !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Arquitecto: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(architect)}</p>
        </li>) : null}
        {enviroments !== "" ? (<li className="flex gap-2">
          <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Ambientes: </span>
          <p className="text-sm md:text-md lg:text-lg">{he.decode(enviroments)}</p>
        </li>) : null}
    </ul>
  )
}

export default EntrepreneurshipDetailList