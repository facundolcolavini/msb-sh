
interface Props {
    characteristics: string[];
}
const ServiceList = ({ characteristics }: Props) => {
    // Eliminar del array el elemento con valor B y Servicios 
    characteristics = characteristics.filter(item => item !== 'B' && item !== 'Servicios')
    return (

        <ul className={'grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-20 gap-y-3'}>
            {characteristics.map((item, index) => (
                <li className={'flex gap-2 break-keep line-clamp-1'} key={index}>
                    <span className={'text-sm md:text-md lg:text-lg font-base'}>-  {item}</span>
                </li>
            ))}
        </ul>

    )
}

export default ServiceList