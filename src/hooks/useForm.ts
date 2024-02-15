import { useEffect, useMemo, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import type { FormValidations, formCheckedValues } from 'src/models/validations/forms.validations';



interface inputF {
    name: string,
    value: string
}

export const useForm = <T>(initialValues: T, formValidations: FormValidations = <FormValidations>{}) => {

    const [formState, setFormState] = useState<typeof initialValues>(initialValues);//{email: '', password: '', displayName: '',} RegisterUser = T
    const [formValidation, setValidations] = useState({} as formCheckedValues);

    useEffect(() => {
        createValidators()
    }, [formState])

    useEffect(() => {
        if (initialValues !== formState) setFormState(initialValues)
    }, [initialValues])

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue as keyof formCheckedValues] !== null) return false
        }
        return true
    }, [formValidation])



    //Inputs Handlers
    const onInputChange = ({ target }: Event): void => {
        const { name, value }: inputF = target as HTMLInputElement
        setFormState(
            (prev: typeof initialValues) => ({
                ...prev, // Campos anteriores
                [name]: value // Valor del input o de campos {email: , password: , displayName:}
            })
        )
    }

    const onResetForm = (): void => {
        setFormState(initialValues)
    }

    // Toma el objeto formValidations y crea un nuevo estado donde se va a saber si los inputs son validos o no
    const createValidators = () => {
        const formCheckedValues = {} as formCheckedValues // {emailValid: null | 'Error Mensaje']}
        // Recorro mi objeto formValidations 
        for (let formField in formValidations) { // email , password , displayName
            const [fn, errorMessage] = formValidations[formField]; // Obtengo el Array de esa Key [fn,error]

            formCheckedValues[`${formField}Valid` as keyof formCheckedValues] = fn(formState[formField as keyof typeof initialValues]) ? null : errorMessage;
            setValidations(formCheckedValues)
        }
    }

    return {
        initialValues,
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}