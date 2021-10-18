import React, { useState } from 'react'
import {useQuery,gql,useLazyQuery,useMutation} from '@apollo/client'

const QueryAllUser = gql`
query Query {
    users {
    id
    name
    userNmae
    age
    nationality
    like
    friends {
      age
      userNmae
      name
    }
    feavorateMovies {
      isInTheaters
      publicationYear
      title
    }
  }
}
`
const QueryAllMovies = gql`
query Query {
  movies {
    id
    title
    publicationYear
    isInTheaters
  }
}
`
const queryOneUser = gql`
    query Query($oneUserId: ID!) {
    oneUser(id: $oneUserId) {
        name
        userNmae
        age
    }
    }

`
const CreateOneUser = gql`
    mutation($input:CreateUser!) {
    createUser(input: $input) {
        name
        userNmae
        age
    }
    }

`

const DisplayData = () => {
    const [userId,setUserId] =useState(1)
    const [user,setUser] = useState({
        name:"Kazi3456",
        userNmae:"kazi567",
        age:30,
        nationality:"Bangladash"
    })

    const oneUser = ()=>{
        fatchOneUser({
            variables:{
                "oneUserId": userId
              }
        })
    }

    const createOneUser = ()=>{
        createUser({
            variables:{
                "input": user
              }
        })
        refetch()
    }

    const [createUser,{data:createUserData,error}] = useMutation(CreateOneUser)
    const [fatchOneUser,{data:oneUserData}] = useLazyQuery(queryOneUser)
    const {data,loading,refetch} = useQuery(QueryAllUser)
    const {data:movieData,loading:movieLoading,} = useQuery(QueryAllMovies)

    console.log("user",oneUserData);
    
    if (loading && movieLoading) {
        return(
            <p>Loading...</p>
        )
        
    }
    if (error) {
        console.log(error);
        return <p>Error</p>
    }
    return (
        <div>
            <button onClick={oneUser}>FatchOneUser</button>
            <button onClick={createOneUser}>CreateOneUser</button>
            {data.users.length  ? data.users.map((user,index)=>{
                return (<h3 key={index}>{user.name}</h3>)
            }):null}
            {movieData?.movies?.length  ? movieData.movies.map((user,index)=>{
                return (<h3 key={index}>{user.title}</h3>)
            }):null}
        </div>
    )
}

export default DisplayData
