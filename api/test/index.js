module.exports = async function (context, req) {
    context.log('Test function called');
    
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: { message: 'Test function is working!' }
    };
};
