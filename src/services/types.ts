export type SizeType = {
    id: number
    label: string
    number: number
}
export type ColorType = {
    id: number
    name: string
    images: string[]
    price: string
    description: string
    sizes: number[]
}
export type ProductType = {
    id: number
    name: string
    colors: ColorType[]
}
type ColorTypeForCart = {
    id: number
    name: string
    images: string[]
    price: string
    description: string
    size: SizeType
}
export type ProductTypeForCart = {
    count: number
    id: number
    name: string
    color: ColorTypeForCart
}
