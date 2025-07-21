const bcrypt = require('bcryptjs'); 
const { QueryTypes } = require('sequelize'); 
const eventDB = require('../config/db');
// const users = [];  -> array use panrom

exports.login = async(req,res) => { 
    console.log("[LOGIN] req.body:", req.body); 
     const { emailAddress, password } = req.body; 
    const user = await eventDB.query(`select email_address, password from     
users where email_address = :email`, 
{replacements: { email: emailAddress }, 
type: QueryTypes.SELECT}); 
console.log("[LOGIN] user from DB:", user);                                               
    if (user.length === 0) { 
        console.log("[LOGIN] Email not found:", emailAddress);
        return res.status(400).send('Email is not found'); 
    } 
 
    try { 
        console.log("[LOGIN] Comparing password:", password, "with hash:", user[0].password);
        const passwordMatch = await bcrypt.compare(password, user[0].password);
        console.log("[LOGIN] Password match:", passwordMatch);
        if (passwordMatch) { 
        // if (password === user[0].password) {  //index [0] endru meaning -> array la irukum data eduka "[index number]"" like wise we use dot" . "for get info of object            res.send('Login successful'); 
        
    } 

        else { 
            res.status(400).send('Invalid username or password'); 
        } 
    } catch (err) { 
        console.error('[LOGIN] Login error:', err);
        res.status(500).send('Error logging in'); 
    } 
} 

exports.register = async(req,res) => { 
    console.log("register request body", req.body); 
  
    try { 
//         const { emailAddress, password, fullName, dob, gender, 
// occupation,mobile,addressLine1, addressLine2, district, state, country 
//             } = req.body; 

const emailAddress = req.body.emailAddress;         
const password = req.body.password; 
      const fullName = req.body.fullName; 
      const dob = req.body.dob || ''; 
      const gender = req.body.gender || 1; 
      const occupation = req.body.occupation || 'student'; 
      const mobile = req.body.mobile || ''; 
      const addressLine1 = req.body.addressLine1 || ''; 
      const addressLine2 = req.body.addressLine2 || ''; 
      const district = req.body.district || ''; 
      const state = req.body.state || ''; 
      const country = req.body.country || ''; 

 console.log("level 1")
        const existingUser = await eventDB.query(`select email_address from 
users where email_address='${emailAddress}'`, 
{type: QueryTypes.SELECT}); 
 console.log("level 2",existingUser.length); //array kula enthana info iruku endru paka length() use
        if (existingUser.length > 0) { 
            return res.status(409).send('Email already exists'); 
        } 
        const status = 1; 
        const createdAt = new Date(); 
        const role ="user"

        const hashedPassword = await bcrypt.hash(password, 10);
 
        let insertQuery =`INSERT INTO users (email_address, password, full_name, 
date_of_birth, gender, mobile, occupation, address_line_1, 
 address_line_2, country, state, district, status, created_at,  role) 
                         VALUES (:emailAddress, :password, :fullName, :dob, 
 :gender, :mobile, :occupation, :addressLine1, :addressLine2, :country, :state, 
:district,:status, :createdAt , :role)`; 
 
        const addUser = await eventDB.query(insertQuery,{ 
            replacements:{emailAddress, password: hashedPassword, fullName, dob, 
                            gender, mobile, occupation, addressLine1, 
                            addressLine2, country, state, district, 
                            status, createdAt, role}, 
            type:QueryTypes.INSERT, 
        }); 
        console.log("level 3");
 
        res.status(201).send('User registered successfully'); 
    } catch (err) { 
        console.log("err in user reg",err);
        res.status(500).send('Error registering user'); 
    } 
} 

exports.updateUser = async(req,res) => { 
    console.log("update user request params", req.params); 
    console.log("update user request body", req.body); 
    const id = parseInt(req.params.primaryid); 
 
  try { 
 
    const existingUser = await eventDB.query(`select * from users where id = :id`, {replacements: { id: id }, type: QueryTypes.SELECT}); 
    
    if(existingUser.length === 0) 
    { 
        return res.status(404).send("ID is not found"); 
    } 
    
        const hashedPassword = await bcrypt.hash(existingUser[0].password, 10);
        const password = hashedPassword;
        const fullName = req.body.fullName || existingUser[0].full_name; 
        const dob = req.body.dob || existingUser[0].date_of_birth; 
        const gender = req.body.gender || existingUser[0].gender; 
        const occupation = req.body.occupation || existingUser[0].occupation; 
        const mobile = req.body.mobile || existingUser[0].mobile ; 
        const addressLine1 = req.body.addressLine1 || existingUser[0].address_line_1; 
        const addressLine2 = req.body.addressLine2 || existingUser[0].address_line_2; 
        const district = req.body.district || existingUser[0].district; 
        const state = req.body.state || existingUser[0].state; 
        const country = req.body.country || existingUser[0].country; 
        const role = req.body.role || existingUser[0].role;
        // const status = req.body.status || existingUser[0].status || 1; //user ku access kuduka kudathu, only admin can 
        // const createdAt = new Date(); 
 
 
            let updateQuery = `UPDATE users SET  
                password = :password, 
                full_name = :fullName, 
                date_of_birth = :dob, 
                gender = :gender, 
                mobile = :mobile, 
                occupation = :occupation, 
                address_line_1 = :addressLine1, 
                address_line_2 = :addressLine2, 
                country = :country, 
                state = :state, 
                district = :district,
                role = :role
                
            WHERE id = :id`; 
 
        const updateUser = await eventDB.query(updateQuery,{ 
            replacements:{password, fullName, dob, 
                            gender, mobile, occupation, addressLine1, 
                            addressLine2, country, state, district, role, id}, 
            types:QueryTypes.UPDATE, 
        }); 
        console.log("updateuser", updateUser); 
 
        res.status(201).send(`User info updated successfully for id: ${id}`); //for dynmaic we use `${id}`
    } catch(err) { 
        console.log("err",err) 
res.status(500).send('Error while updating user'); 
} 
} 




