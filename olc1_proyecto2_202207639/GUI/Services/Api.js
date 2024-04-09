export function POST (path, content){
    console.log(content)
    return fetch( path, {
        method: 'POST',
        body: JSON.stringify({content}),
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        }
    )
    .then(response => response.json())
}