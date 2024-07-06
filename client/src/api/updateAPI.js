export const updateAPI =(data_object, path)=>{
    return fetch('http://localhost:8080/api/put'+ path,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        //IMPORTANT!!!
        credentials: 'include',
        body: JSON.stringify(data_object),
    }).then((response)=>{
        return response.json();
    });
}