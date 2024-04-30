export type Reviews = {
    id: string;
    userFullName: string;
    review: string;
}


export const reviewsMock: Reviews[] = [
        {
            id: "1",
            userFullName: "Juan Perez",
            review: "“Muy buena atención y gran apoyo post venta.”"
        },
        {
            id: "2",
            userFullName: "Maria Rodriguez",
            review: "“Una inmobiliaria todo servicio, profesionales siempre dispuestos a hacer posible la operación.”"
        },
        {
            id: "3",
            userFullName: "Pedro Gomez",
            review: "“Un gran trabajo, muy contentos por toda la atención, gracias.”"
        },
        {
            id: "4",
            userFullName: "Ana Martinez",
            review: "“Muchas gracias a la sucursal Castelar por ayudaros a cumplir un sueño.”"
        },
        {
            id: "5",
            userFullName: "Carlos Sanchez",
            review: "“Excelente atención, quiero destacar a Daniela Badía, la mejor. Gracias por todo! Totalmente recomendable.”"
        },
        {
            id: "6",
            userFullName: "Laura Fernandez",
            review: "“Excelente atención personalizada. Muy buena Gente. Sin dudas marcan la Diferencia los recomiendo 100%.”"
        }
    ]