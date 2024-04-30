import type { ResultEntrePreneurShipUnit } from "@/interfaces/entrepreneurship.interfaces";
import CodeIcon from "../Icons/CodeIcon";
import DoorOpen from "../Icons/DoorOpen";
import ExchangeIcon from '../Icons/ExchangeIcon';
import PaidIcon from "../Icons/PaidIcon";
import PropertyBuildIcon from "../Icons/PropertyBuildIcon";
import RuleIcon from "../Icons/RuleIcon";
import VisibilityIcon from "../Icons/VisibilityIcon";

interface Props {
    unitAvailable: ResultEntrePreneurShipUnit
}
const UnitAvailableTable = ({ unitAvailable }: Props) => {
    return (
<div className="w-full h-[700px]  overflow-x-auto overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded" style={{
    scrollbarColor: '#939B41 #f6f4f1',
    scrollbarWidth: 'thin',
    scrollbarBorder: '100%'
}}>
        <table className="w-full h-fit text-center">
            <tbody>
                {
                    unitAvailable.unidadesDisponibles.map((unit, index) => {
                        return (
                            <tr className="shadow-lg h-[109px]" key={index}>
                                <td className="p-2 whitespace-nowrap">
                                <a className="grid w-full grid-cols-9 grid-flow-col items-center  align-middle" style={{minWidth: '1000px'}} href={`/emprendimientos/unidad-disponible/${unit?.operacion}/${unit.ed_loc}/${unit.in_esa}/${unit.in_suc}-${unit.in_num}`}>
                      
                                <img className={'w-fit h-[109px] object-cover aspect-square'} src={unit?.img_princ} alt={unit?.ed_nom} />
                                <div className={'w-fit'}>
                                    <ExchangeIcon addStyles='text-center mx-auto' />
                                    <div className={'flex flex-col font-bold mx-auto'}>Operación<span className="font-medium text-secondary-text-msb">{unit.operacion ?? "-"}</span></div>
                                </div>
                                <div>
                                    <PropertyBuildIcon w="28" h="24" addStyles='text-center mx-auto' /><div className={'grid grid-col'}>Tipo<span  className="font-medium text-secondary-text-msb">{unit.tipologia ?? "-"}</span>
                                    </div>
                                </div>
                                <div>
                                    <DoorOpen w="28" h="24" addStyles='text-center mx-auto' /><div className={'grid grid-col'}>Ambientes<span  className="font-medium text-secondary-text-msb">{unit?.ti_tip?.split('A')[0] === "1"  ? "Monoambiente" :  unit?.ti_tip?.split('A')[0] === "0" ?  "-": unit?.ti_tip?.split('A')[0] }</span>
                                    </div>
                                </div>
                                <div>
                                    <RuleIcon w="28" h="24" addStyles='text-center mx-auto' />
                                    <div className={'flex flex-col'}>
                                        Superficie
                                        <span  className="font-medium text-secondary-text-msb">{unit?.in_sto}mt2</span>
                                    </div>
                                </div>
                                <div>
                                    <PaidIcon w="28" h="24" addStyles='text-center mx-auto' /><div className={'flex flex-col'}>Valor<span  className="font-medium text-secondary-text-msb">{unit?.precio !== '' && unit?.precio !== 'Consultar' && (
                                        unit?.moneda === 'U$S' ? `U$S ${unit?.precio.replace('U$S', '')}` :
                                            unit?.moneda === '$' ? `$ ${unit?.precio.replace('$', '')}` :
                                                unit?.moneda === 'Consultar' ? 'Consultar' :
                                                    '-'
                                    )}</span>
                                    </div>
                                </div>
                                <div>
                                    <VisibilityIcon w="28" h="24" addStyles='text-center mx-auto' />
                                    <div className={'flex flex-col'}>
                                        Estado
                                        <span  className="font-medium text-secondary-text-msb capitalize">{unit?.in_esa === "" ? "-" : unit?.in_esa}</span>
                                    </div>
                                </div>
                                <div>
                                    <RuleIcon w="28" h="24" addStyles='text-center mx-auto' />
                                    <div className={'flex flex-col'}>
                                        Depto
                                        <span  className="font-medium text-secondary-text-msb">{!unit?.in_pis ? "-" : unit?.in_pis}</span>
                                    </div>
                                </div>
                                <div className={'mx-auto flex flex-col items-center'}>
                                    <CodeIcon w="24" h="24" addStyles=' mx-auto' />
                                    <div className={'flex flex-col'}>
                                        Código
                                        <span className={"font-medium text-secondary-text-msb uppercase"}>{!unit?.in_pis ? "-" : `${unit?.codsuc}${unit.in_num}`}</span>
                                    </div>
                                </div>
                            </a>
                        </td>
                    </tr>
                    )
                })

            }
        </tbody>
        </table>
    </div>
    )
}

export default UnitAvailableTable