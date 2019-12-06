import axios from 'axios'

export const actGetAllTodos = () => async dispatch => {
        const res =  await axios.get('/todos')
        return dispatch({
            type:'GET_ALL',
            data:res.data.data
        })
} 

export const addItemtoNode = (newItem) => async dispatch => {
       const res =  await axios.post('/todos',newItem)
       return dispatch({
           type:'ADD',
           data:res.data.data
       })
}

export const ItemDel = (id) => async dispatch => {
       const res =  await axios.delete('/todos/'+id)
       return dispatch({
           type:'DEL',
           data:id
       })
} 

export const editItemtoNode = (editItem) => async dispatch => {
        const res =  await axios.patch('/todos/'+editItem.id,editItem)
        return dispatch({
            type:'OK_EDIT',
            data:res.data.data
    })
}