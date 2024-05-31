import { DropdownOption } from '@types/components'
import { getValueAfterDelay } from '@utils/mock/service'
import countriesDB from '../../mock/db/countries.json'

const searchData = (records: any, predicate: any) => {
    const searchedValues = records.filter(predicate)
    return searchedValues
}

export const getCountries = async (searchedText: string) => {
    const searchedCountries = searchData(countriesDB, (country: DropdownOption) => {
        return country.label.toLowerCase().includes(searchedText)
    })
    throw Error()
    return await getValueAfterDelay(searchedCountries, 1500) as any
} 