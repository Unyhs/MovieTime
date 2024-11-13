const path=require('path')
const fs=require('fs')
const dotenv=require('dotenv')
dotenv.config()
const {mailjet_key,mailjet_key_private}=process.env
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(mailjet_key,mailjet_key_private);

function replaceContent(content,creds){
    const allKeysArr=Object.keys(creds)
    allKeysArr.forEach(key=>{
        content=content.replace(`#{${key}}`,creds[key])
    })
    return content
}

const sendEmail=async(recepientEmail,subject,template_name,creds)=>{
    try{
        const templatePath=path.join(__dirname,"email_templates",template_name)
        const text=await fs.promises.readFile(templatePath,'utf-8')
        const request=mailjet.post('send', { version: 'v3.1' }).request({
        Messages:[{
            From:{Email:'Shynu.sethi035@gmail.com',Name:'Shynu BMS Application'},
            To:[{Email:recepientEmail,Name:creds.name}],
            Subject:subject,
            TextPart:'This email is for otp',
            HtmlPart:replaceContent(text,creds),
        }]
    })
        return request.then(result=>result.body).catch(err=>err.message)
    }catch(err){
        console.log(err.message)
    }
}

module.exports={sendEmail}