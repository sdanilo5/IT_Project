const dbConnection = require('./../common/db-config');

const login = async (loginData) => {
    const [results, metadata] = await dbConnection.query(
        `SELECT u.id, r.name AS roleName 
        FROM user u, user_role ur, role r
        WHERE u.email = ? AND u.password = ? AND u.id = ur.userId AND r.id = ur.roleId`,
        {
            replacements: [loginData.email, loginData.password]
        }
    );
    
    return results;
}

module.exports = {
    login,
}