import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {AppDispatch, RootState} from '..'

/**
 * 防止每次再使用时指定泛型， 提前使用类型封装
 */
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
