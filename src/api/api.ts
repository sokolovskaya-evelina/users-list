import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/users'

export const usersApi = {
    getUsersData() {
        return axios.get<Array<UserDataType>>(url)
    }
}

export type UserDataType = {
    address:
        {
            city: string
            geo: {
                lat: string
                lng: string
            }
            street: string
            suite: string
            zipcode:string
        }
    company: {
        bs: string
        catchPhrase:string
        name: string
    }
    email: string
    id: number
    name: string
    phone: string
    username: string
    website: string
}
