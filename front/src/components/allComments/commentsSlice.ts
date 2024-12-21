import { createSlice } from '@reduxjs/toolkit';

interface ICommentsSlice{
  comments: Comment[];
  isFetchingComments:boolean,
  isDeletingComments:boolean
}

const initialState:ICommentsSlice = {
  comments:[],
  isFetchingComments:false,
  isDeletingComments:false,
}


export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{

  },
  selectors:{
    selectAllComments:(state => state.comments),
    selectIsFetchingCom:(state =>state.isFetchingComments),
    selectIsDeletingCom:(state=>state.isDeletingComments)
  }
});


export const commentsReducer = commentsSlice.reducer;
export const {} = commentsSlice.reducer
export const {selectAllComments, selectIsFetchingCom, selectIsDeletingCom} = commentsSlice.selectors