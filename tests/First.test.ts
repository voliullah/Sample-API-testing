import {test, expect} from '@playwright/test'
const baseURL = 'https://reqres.in/'
test.describe.parallel('ALL the APIS at regress.in',()=>{

//here we go again
test ( " GET list users ",async ({request}) => {
    const responce = await request.get(`${baseURL}api/users?page=2`)
    const responceBody = JSON.parse(await responce.text())
    expect (await responceBody.page).toBe(2)
    expect (await responceBody.data[0].id).toBe(7)
    expect (await responceBody.data[0].email).toBe('michael.lawson@reqres.in')
    expect (await responce.statusText()).toBe('OK')
    expect (await responce.status()).toBe(200)
})
test ( " GET Single User",async ({request}) => {
    const responce = await request.get(`${baseURL}api/users/2`)
    const responceBody = JSON.parse(await responce.text())
    expect (await responce.status()).toBe(200)
    expect (await responceBody.data.id).toBe(2)
    expect (await responceBody.support.url).toBe('https://reqres.in/#support-heading')
    console.log(await responceBody.support.text)
    expect (await responceBody.support.text).toBe('To keep ReqRes free, contributions towards server costs are appreciated!')
})
test ( "  GET Single User Not Found",async ({request}) => {
    const responce = await request.get(`${baseURL}api/users/23`)
    const responceBody = JSON.parse(await responce.text())
    expect (await responce.status()).toBe(404)
    expect( responceBody).toStrictEqual({})
})
test ( "  GET List <RESOURCE>",async ({request}) => {
    const responce = await request.get(`${baseURL}api/unknown`)
    const responceBody = JSON.parse(await responce.text())
    expect (await responce.status()).toBe(200)
    expect( responceBody.data[0].color).toBe('#98B2D1')
    expect( responceBody.data[3].id).toBe(4)
})
test ( "  GET Single <RESOURCE>",async ({request}) => {
    const responce = await request.get(`${baseURL}api/unknown/2`)
    const responceBody = JSON.parse(await responce.text())
    expect (await responce.status()).toBe(200)
    expect (await responce.statusText()).toBe('OK')
    expect( responceBody.data.name).toBe('fuchsia rose')
    expect( responceBody.data.id).toBe(2)
})
test ( "  GET Single <RESOURCE> not found ",async ({request}) => {
    const responce = await request.get(`${baseURL}api/unknown/23`)
    const responceBody = JSON.parse(await responce.text())
    expect (await responce.status()).toBe(404)
    expect (await responce.statusText()).toBe('Not Found')
})

test ( "  POST create  ",async ({request}) => {
    const responce = await request.post(`${baseURL}api/users`,{
        data : {
            name  : "makawa00",
            id : 100
        }
    })
    const responceBody = JSON.parse(await responce.text())
    expect (await responce.status()).toBe(201)
    expect(responceBody.id).toBe(100)
    expect (responceBody.name).toBe("makawa00")
    console.log(await responceBody)
    expect(responceBody.createdAt).toBeTruthy()
    expect (await responce.statusText()).toBe('Created')
})
test( "  GET the created one above   ",async ({request}) => {
    const responce = await request.get(`${baseURL}api/user/100`)
    const responceBody = JSON.parse(await responce.text())
    // expect (await responce.status()).toBe(200)
    // expect (await responce.statusText()).toBe('OK')
    console.log(await responceBody)
    expect (await responce.body).toBeTruthy()
    
})
test(" GET Login successfull",async ({request}) => {
    const responce = await request.post('https://reqres.in/api/login',{
        data : {
            email : "eve.holt@reqres.in",
            password : "cityslicka"
        }
    })
    const responceBody = JSON.parse(await responce.text())
    console.log(responceBody)
    

})
//hereeee
test("POST SUCCESSFUL",async ({request}) => {
    const responce = await request.post('https://reqres.in/api/login',{
        data : 
            {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
    })
 const responceBody = JSON.parse (await responce.text())
 expect (await responce.status()).toBe(200)
 expect (responceBody.token).toBeTruthy()
 console.log(responceBody.token)

})
test("  POST login unseccessfull",async ({request}) => {
    const responce = await request.post('https://reqres.in/api/login',{
        data : 
            {
                "email": "eve.holt@reqres.in",
            }
    })
 const responceBody = JSON.parse (await responce.text())
 expect (responceBody.token).toBeFalsy()
 console.log(responceBody.token)
 console.log(responceBody.error)
 console.log(responceBody)
 expect(responceBody.error).toBe('Missing password')
expect (await responce.status()).toBe(400)
 
})
//im hereee 
test( " DELETE ",async ({request}) => {
    const responce = await request.delete('https://reqres.in/api/users/2',{

    })
    const responceBody = JSON.stringify(await responce.text())
    console.log(await responce.statusText())
    console.log(await responce.status())

    expect (await responce.status()).toBe(204)
    
})
test ( "PUT update ",async ({request}) => {
    const responce = await request.put(`${baseURL}api/users/2`,{
        data :{
                "name": "morpheus",
                "job": "makawa kha"
            }
    })
    const responceBody = JSON.parse(await responce.text())
    expect (responceBody.name).toBe('morpheus')
    expect (responceBody.job).toBe('makawa kha')
    console.log(responceBody.name)
    console.log(await  responce.statusText())
    expect (await responce.statusText()).toBe('OK')
    expect (await responce.status()).toBe(200)

})
})