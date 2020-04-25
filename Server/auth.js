const OktaJwtVerifier = require('@okta/jwt-verifier')

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.ISSUER,
    clientId: process.env.CLIENT_ID
})

module.exports = async (req, res, next) => {
    try{
        const { authorization } = req.headers
        console.log(authorization)
        if (!authorization) throw new Error('You must send an Authorization header')

        const [authType, token] = authorization.trim().split(' ')
        if (authType !== 'Bearer') throw new Error('Expected a Bearer token')

        const { claims } = await OktaJwtVerifier.verifyAccessToken(token)
        if (!claims.scp.includes(process.env.SCOPE)){
            throw new Error('Could not verify the proper scope')
        }
    } catch (error) {
        next(error.message)
    }
}