import { DropdownOption } from "../../types/components"
import { getValueAfterDelay } from "../../utils/mock/service"
import countriesDB from "../../mock/db/countries.json"

const searchData = (records: any, predicate: any) => {
  const searchedValues = records.filter(predicate)
  return searchedValues
}

export const getCountries = async (
  searchedText: string,
  offset?: number,
  itemsCount?: number
) => {
  const searchedCountries = searchData(
    countriesDB,
    (country: DropdownOption) => {
      return country.label.toLowerCase().includes(searchedText)
    }
  )
  let countries
  if (offset && itemsCount) {
    countries = searchedCountries.slice(offset, itemsCount - 1)
  } else {
    countries = searchedCountries
  }
  // throw Error()
  return (await getValueAfterDelay(countries, 1500)) as any
}
