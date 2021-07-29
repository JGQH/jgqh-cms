import { Dictionary } from "@Types";
import { useReducer } from "react";

interface State {
    keys: string[]
    values: string[]
}

type Action = {
    type: 'push'
} | {
    type: 'delete'
    index: number
} | {
    type: 'key'
    index: number
    key: string
} | {
    type: 'value'
    index: number
    value: string
}

function reducer(state:State, action:Action) {
    const keys = [...state.keys]
    const values = [...state.values]

    switch(action.type) {
      case 'push':
        keys.push('')
        values.push('')
        break
      case 'delete':
        keys.splice(action.index, 1)
        values.splice(action.index, 1)
        break
      case 'key':
        keys[action.index] = action.key
        break
      case 'value':
        values[action.index] = action.value
        break
    }

    return { keys, values }
}

export default function useJson(json:Dictionary) {
    const [value, dispatch] = useReducer(reducer, {
        keys: Object.keys(json),
        values: Object.keys(json).map(key => json[key])
    })
    
    function map(func:(key:string, value:string, index:number) => JSX.Element) {
        return value.keys.map((key, i) => {
            const val = value.values[i]
            return func(key, val, i)
        })
    }

    function appendRow() {
        dispatch({ type: 'push' })
    }

    function deleteRow(index:number) {
        dispatch({ type: 'delete', index })
    }

    function modifyKey(index:number, key:string) {
        dispatch({ type: 'key', index, key })
    }

    function modifyValue(index:number, value:string) {
        dispatch({ type: 'value', index, value })
    }
    
    function getJson() {
        const newJson:Dictionary = {}

        value.keys.forEach((key, i) => {
            const val = value.values[i]

            newJson[key] = val
        })

        return newJson
    }

    return {
        map,
        appendRow,
        deleteRow,
        modifyKey,
        modifyValue,
        getJson
    }
}