import {test, expect} from '@playwright/test'
import { couldStartTrivia, resolveModuleName } from 'typescript'
const baseURL = 'https://reqres.in/'
test.describe.parallel('ALL the APIS at regress.in',()=>{


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

test ( "  POST Create  ",async ({request}) => {
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
test( "  GET the created one above  ",async ({request}) => {
    const responce = await request.get(`${baseURL}api/user/100`)
    const responceBody = JSON.parse(await responce.text())
    // expect (await responce.status()).toBe(200)
    // expect (await responce.statusText()).toBe('OK')
    console.log(await responceBody)
    expect (await responce.body).toBeTruthy()
    
})
test(" GET Login Successfull(bug found)",async ({request}) => {
    const responce = await request.post('https://reqres.in/api/login',{
        data : {
            email : "eve.holt@reqres.in",
            password : "wronpasssswordhasbeengiven"
        }
    })
    const responceBody = JSON.parse(await responce.text())
    console.log(responceBody.token)
    expect(await responce.status()).toBe(200)
    expect(await responceBody).toStrictEqual({"token": "QpwL5tke4Pnpja7X4"})
    expect(await responceBody).toBeTruthy()
    if (responceBody !=null){
        console.log('user has logged in to the account even though the password is incorrect ')
        }else
    console.log(responceBody.error)
    console.log('when you give it wrong email it doesnt generate any tokenn, and if you give it the right email with random input in password , it does generate a token ')
})
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
                email: "eve.holt@reqres.in",
                // password : "shouldnt be giving it password "

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
test( ' POST  register unsuccessful ',async ({request}) => {
    const responce = request.post(`${baseURL}api/register`,{
        data : {
            "email": "walikhan@gmail.com",
            "password": "pistol"
        }
    })
    const responceBody =JSON.parse(await (await responce).text())
    // console.log(await (await responce).body())
    console.log(responceBody.email)
    console.log(await (await responce).status())
    expect(await (await responce).status()).toBe(400)
    // expect(await responceBody.email).toContain('w alikhan@gmail.com')
    console.log(await (await responce).statusText())
    console.log(await (await responce).text())
    expect(await (await responce).text()).toContain('{"error":"Note: Only defined users succeed registration"}')
})
test( ' POST  register successful ',async ({request}) => {
    const responce = request.post(`${baseURL}api/register`,{
        data : {
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            }
            
        })
        const responceBody =JSON.parse(await (await responce).text())
        expect (responceBody.id).toBe(4)
        expect((await responce).status()).toBe(200)
        expect(await (await responce).statusText()).toBe('OK')
        console.log(await (await responce).text())
})
test('PATCH update ',async ({request}) => {
    const responce = await request.patch(`${baseURL}api/users/3`,{
        data : {
                "name": "cmon bruh ",
                "job": "okay okay"
        } 
    })
    const responceBody = JSON.parse(await responce.text())
    expect (await responce.statusText()).toBe('OK')
    expect (await responce.status()).toBe(200)
    expect(await responceBody.job).toBe('okay okay')
    console.log(responceBody.name)
})

test.only('  GET  Delayed responce ',async ({request}) => {
    const responce  = await request.get(`${baseURL}api/users?delay=3`)
    const responceBody = JSON.stringify(await responce.text())
    console.log(await responce.status())
    expect (await responce.status()).toBe(200)
    console.log(await responce.statusText())
    expect (await responce.statusText()).toBe('OK')
})