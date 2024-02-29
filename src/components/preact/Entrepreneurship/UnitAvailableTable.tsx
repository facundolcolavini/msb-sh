import he from 'he';
import type { ResultEntrePreneurShipUnit } from "@interfaces/entrepreneurship.interfaces"

interface Props {
    unitAvailable: ResultEntrePreneurShipUnit
}
const UnitAvailableTable = ({unitAvailable}:Props) => {
  return (
    <ul>
        {
            unitAvailable.unidadesDisponibles.map((unit, index) => {
                return (
                    <li key={index}>
                        <a  href={`/resultados-de-busqueda/emprendimiento/${unit?.operacion}/${unit.in_suc}-${unit.in_num}`}>
                            {unit?.ed_nom} - {unit?.ed_loc} - {unit?.codsuc}-{unit?.ed_idl}
                        </a>
                    </li>
                )
            })
        }
    </ul>
  )
}

export default UnitAvailableTable