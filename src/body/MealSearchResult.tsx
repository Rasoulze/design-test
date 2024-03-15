import axios from "axios";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import Spinner from "../spinner/Spinner";

const MealSearchResult = memo(() => {
    const [searchMealValue, setSearchMealValue] = useState<string>("");
    const [mealList, setMealList] = useState<any[]>([]);
    const [mealListLoading, setMealListLoading] = useState<boolean>(false);
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    useLayoutEffect(() => {
        window.addEventListener("click", () => {
            setShowDropDown(false);
        })
    }, [])
    const onTypeSearch = async () => {
        try {
            setShowDropDown(true);
            setMealListLoading(true);
            const result =
                await axios({
                    baseURL: "https://www.themealdb.com/api/json/v1/1/search.php?",
                    method: "get",
                    params: { s: searchMealValue },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            setMealListLoading(false);
            if (result.status === 200) {
                setMealList(result?.data?.meals ?? []);
            }
        } catch (error) {
            setMealListLoading(false);
            alert(error?.response?.data ?? error?.message ?? "")
        }
    }
    return (
        <div className='position-relative' onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
            <input className='w-100 ps-4'
                placeholder='search...'
                onFocus={() => { mealList.length && setShowDropDown(true) }}
                onBlur={() => { setShowDropDown(false) }}
                onChange={(e: React.FormEvent<HTMLInputElement>) => { setSearchMealValue(e.currentTarget.value) }}
                value={searchMealValue}
            />
            <button className='btn position-absolute end-0 text-light bg-dark' disabled={mealListLoading} onClick={(e) => onTypeSearch()}>
                Search
            </button>
            <DropDownResult mealList={mealList} mealListLoading={mealListLoading} setSearchMealValue={setSearchMealValue} showDropDown={showDropDown} setShowDropDown={setShowDropDown} />
        </div>
    )
})
///////////////////////////////////////////////////////////////////////////////////////////////////
const DropDownResult = memo(({ mealList, mealListLoading, setSearchMealValue, showDropDown, setShowDropDown }
    : { mealList: any[], mealListLoading: boolean, setSearchMealValue: (value: string) => void, showDropDown: boolean, setShowDropDown: (value: boolean) => void }) => {
    return (
        showDropDown
            ?
            <div className="position-absolute rounded-3 p-2 w-100 shadow-lg drop-down-result">
                <div className="d-flex justify-content-center align-items-center w-100 h-100 ">
                    {mealListLoading ?
                        <Spinner />
                        :
                        mealList.length ?
                            <div className="h-100 w-100 meal-list ">
                                {
                                    mealList.map((value, index) => (
                                        <div key={index} className="d-flex justify-content-between w-100 p-2 meal-item" onMouseDown={() => { setSearchMealValue(value.strMeal); setShowDropDown(false) }}>
                                            <span>
                                                {value.strMeal}
                                            </span>
                                            <span className="fw-bold meal-item-catogory">
                                                {value.strCategory}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <h5 className="text-warning">No Result Found</h5>
                    }
                </div>
            </div>
            :
            <></>
    )
})
//===============================================================================================
export default MealSearchResult;