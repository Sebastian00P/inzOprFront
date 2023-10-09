import { useCallback } from "react";

export interface IInput {
    label: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    type: InputType
}

export enum InputType {
    TEXT, PASSWORD
}

const Input: React.FC<IInput> = ({
    label,
    value,
    onChange,
    type,
}: IInput) => {
    const mapTypeToLegacy = useCallback((t: InputType) => {
        switch(t) {
            case InputType.TEXT : return "text"
            case InputType.PASSWORD : return "password"
        }
    }, [type])

    return (
        <>
            <label className="block">{label}</label>

            <input
                type={mapTypeToLegacy(type)}
                value={value}
                onChange={onChange}
                placeholder={label}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-300"
            />
        </>
    )
}

export default Input;