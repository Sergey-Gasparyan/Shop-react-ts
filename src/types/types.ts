export interface IProduct {
  name : string
  id : number
  brand: string
  price : number
  rating : number
  img :string
  category : string
  quantity : number
  description : string
}

export interface ISearchParamsProps {
  handleChangeFilters: (a: string, b: string) => void;
  searchParams: URLSearchParams;
}

export interface IUser {
  id? :string
  name : string
  login : string
  phone : string
  password : string
}
